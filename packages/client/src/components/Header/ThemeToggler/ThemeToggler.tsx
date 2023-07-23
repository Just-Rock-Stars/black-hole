import clsx from 'clsx';
import { FC } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

import { themeActions } from '@store/slices/theme/themeSlice';

import { useAppDispatch } from '@utils/useAppDispatch';
import { useAppSelector } from '@utils/useAppSelector';

import { Theme } from '@constants';

export const ThemeToggler: FC = () => {
  const dispatch = useAppDispatch();
  const colorScheme = useAppSelector((state) => state.theme.colorScheme);

  const toggleLightTheme = () => dispatch(themeActions.toggleTheme(Theme.LIGHT));
  const toggleDarkTheme = () => dispatch(themeActions.toggleTheme(Theme.DARK));

  return (
    <div className="flex gap-4 sm:gap-2">
      <button
        className={clsx('btn btn-primary shrink-0', {
          'bg-zinc-500 hover:bg-zinc-500': colorScheme === Theme.LIGHT,
        })}
        disabled={colorScheme === Theme.LIGHT}
        onClick={toggleLightTheme}
      >
        <BiSun className="w-8 sm:w-4 sm:h-4 h-8" />
      </button>
      <button
        className={clsx('btn btn-primary shrink-0', {
          'bg-zinc-500 hover:bg-zinc-500': colorScheme === Theme.DARK,
        })}
        disabled={colorScheme === Theme.DARK}
        onClick={toggleDarkTheme}
      >
        <BiMoon className="w-8 sm:w-4 sm:h-4 h-8" />
      </button>
    </div>
  );
};
