import { useAppSelector } from '@utils/useAppSelector';

import backgroundDark from '../../assets/images/backgrounds/background-dark.jpg';
import backgroundLight from '../../assets/images/backgrounds/background-light.jpg';
import { Theme } from '../../constants';

export const Background = () => {
  const colorScheme = useAppSelector((state) => state.theme.colorScheme);

  return (
    <img
      alt="бэкграунд"
      className="fixed z-0 top-0 left-0 w-screen h-screen object-cover"
      src={colorScheme === Theme.LIGHT ? backgroundLight : backgroundDark}
    />
  );
};
