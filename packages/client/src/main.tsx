import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '@components/ErrorBoundary';

import { App } from './App';
import './index.css';
import { store } from './store';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js');
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
