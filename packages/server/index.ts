import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import fs from 'node:fs';
import path from 'node:path';
import { ViteDevServer, createServer as createViteServer } from 'vite';

import { createClientAndConnect } from './db';
import { UserRepository } from './repositories/UserRepository';
import { errorsHandler } from './src/middlewares/errorsMiddleWare';
import router from './src/routes/router';
import { initForums } from './src/utils/initForums';

interface ISsrModule {
  render: (
    uri: string,
    repository: { userRepo: UserRepository }
  ) => Promise<[string, Record<string, unknown>]>;
}

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV !== 'development';

/**
 * require.resolve берет имя пакета и возвращает полный путь к файлу из пакета `client`.
 * Если сделать просто require.resolve("client"), то вернется путь к файлу,
 * указанного в качестве main в package.json пакета client.
 */
const clientPackageDirPath = path.dirname(require.resolve('client/package.json'));
const spaBundleDistPath = path.resolve(clientPackageDirPath, 'dist');

const startServer = async () => {
  const client = await createClientAndConnect();
  if (client === null) {
    throw new Error('Database connection failed. Cannot start server.');
  }

  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: { '*': '' },
      target: 'https://ya-praktikum.tech',
    })
  );
  app.use(express.json());

  let viteDevServer: ViteDevServer | undefined = undefined;

  if (isDev) {
    viteDevServer = await createViteServer({
      appType: 'custom',
      root: clientPackageDirPath,
      resolve: {
        alias: {
          '@api': path.resolve(clientPackageDirPath, 'src', 'api'),
          '@assets': path.resolve(clientPackageDirPath, 'src', 'assets'),
          '@components': path.resolve(clientPackageDirPath, 'src', 'components'),
          '@constants': path.resolve(clientPackageDirPath, 'src', 'constants'),
          '@pages': path.resolve(clientPackageDirPath, 'src', 'pages'),
          '@store': path.resolve(clientPackageDirPath, 'src', 'store'),
          '@app-types': path.resolve(clientPackageDirPath, 'src', 'app-types'),
          '@utils': path.resolve(clientPackageDirPath, 'src', 'utils'),
          '@src': path.resolve(clientPackageDirPath, 'src'),
        },
      },
      server: { middlewareMode: true },
    });

    app.use(viteDevServer.middlewares);
  }

  if (isProd) {
    app.use(express.static(spaBundleDistPath));
  }

  await initForums();

  app.use(router);

  app.get('*', async (request, response, next) => {
    try {
      let template = '';
      if (isDev) {
        template = fs.readFileSync(path.resolve(clientPackageDirPath, 'index.html'), 'utf-8');
        const _viteServer = viteDevServer as ViteDevServer;
        template = await _viteServer.transformIndexHtml(request.originalUrl, template);
      }
      if (isProd) {
        template = fs.readFileSync(path.resolve(spaBundleDistPath, 'index.html'), 'utf-8');
      }

      let module: ISsrModule;
      if (isDev) {
        const _viteServer = viteDevServer as ViteDevServer;
        module = (await _viteServer.ssrLoadModule(
          path.resolve(clientPackageDirPath, 'ssr.tsx')
        )) as ISsrModule;
      } else {
        module = await import(path.resolve(clientPackageDirPath, 'dist-ssr/client.js'));
      }

      const { render } = module;

      const [appHtml, store] = await render(request.url, {
        userRepo: new UserRepository(request.headers['cookie']),
      });
      const initialState = JSON.stringify(store).replace(/</g, '\\u003c');

      const html = template
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('<!--store-data-->', `window.initialState = ${initialState}`);

      response.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      if (isDev) {
        const _viteServer = viteDevServer as ViteDevServer;
        _viteServer.ssrFixStacktrace(error as Error);
      }
      next(error);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });

  app.use(errorsHandler);
};

startServer();
