import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { rootReducer } from '@store/store';

import { Modal } from '../Modal';

const onClose = jest.fn();

const store = configureStore({
  reducer: rootReducer,
});

describe('Modal snapshots', () => {
  test('should render modal', () => {
    const tree = render(
      <Provider store={store}>
        <Modal isOpen={true} onClose={onClose}>
          <h1>Modal children</h1>
        </Modal>
      </Provider>
    );

    expect(tree).toMatchSnapshot();
  });

  test('should not render modal', () => {
    const tree = render(
      <Provider store={store}>
        <Modal isOpen={false} onClose={onClose}>
          <h1>Modal children</h1>
        </Modal>
      </Provider>
    );

    expect(tree).toMatchSnapshot();
  });
});

describe('Modal behavior', () => {
  test('should render title', () => {
    render(
      <Provider store={store}>
        <Modal isOpen={true} onClose={onClose} title="Modal title">
          <h1>Modal children</h1>
        </Modal>
      </Provider>
    );

    const title = screen.getByText('Modal title');

    expect(title).toBeInTheDocument();
  });

  test('should click on close button', () => {
    render(
      <Provider store={store}>
        <Modal isOpen={true} onClose={onClose}>
          <h1>Modal children</h1>
        </Modal>
      </Provider>
    );

    const closeButton = screen.getByRole('button');

    fireEvent.click(closeButton);

    expect(onClose).toBeCalledTimes(1);
  });
});
