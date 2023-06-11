import { FC } from 'react';
import { ModalProps } from './types';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';

const Modal: FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed flex flex-col inset-0 bg-white p-4">
      <div className="flex justify-end">
        {title && <header className="mr-auto">{title}</header>}
        <button onClick={onClose}>
          <FiX className="w-8 h-8" />
        </button>
      </div>
      <div className="flex items-center justify-center grow">{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
