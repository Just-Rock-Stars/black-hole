import { useEffect } from 'react';

import { themeActions } from '@store/slices/theme/themeSlice';

import { useAppDispatch } from '@utils/useAppDispatch';
import { useAppSelector } from '@utils/useAppSelector';

import { Theme } from '@constants';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const colorScheme = useAppSelector((state) => state.theme.colorScheme);

  useEffect(() => {
    const theme = localStorage.getItem('theme') as Theme | null;

    if (theme) {
      dispatch(themeActions.toggleTheme(theme));
    }
  }, [dispatch]);

  useEffect(() => {
    if (colorScheme === Theme.DARK) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [colorScheme]);
};
