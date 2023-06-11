import { FC, useState } from 'react';
import { RANDOM_AVATAR_PATH } from '../../utils/global';
import { Navbar } from '../Navbar';
import { Modal } from '../Modal';
import { FiAlignCenter } from 'react-icons/fi';

const Header: FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);

  const onNavbarToggle = () => setIsNavbarOpen(!isNavbarOpen);

  return (
    <>
      <header className="page-container flex flex-nowrap gap-4 py-4 justify-between items-center">
        <img src={RANDOM_AVATAR_PATH} alt="аватар" width={48} height={48} />
        <Navbar />
        <button
          className="btn-primary block sm:hidden p-2"
          onClick={onNavbarToggle}>
          <FiAlignCenter className="w-8 h-8" />
        </button>
      </header>
      <Modal isOpen={isNavbarOpen} onClose={onNavbarToggle}>
        <Navbar isVertical />
      </Modal>
    </>
  );
};

export default Header;
