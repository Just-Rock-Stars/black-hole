import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from '@store/store';

import { UserService } from '@api/Services/UserService/UserService';

import { ErrorBoundary } from '@components/ErrorBoundary';

import { App } from './App';
import './index.css';
import { UserRepository } from './repository/UserRepository/UserRepository';

const rootNode = document.querySelector('#root');

if (rootNode === null) {
  throw new Error();
}

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/serviceworker.js');
// }
const initialState = window.initialState;
const store = createStore({ userService: new UserService(new UserRepository()) }, initialState);
delete window.initialState;

hydrateRoot(
  rootNode,
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
