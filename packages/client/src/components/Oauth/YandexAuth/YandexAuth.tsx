import clsx from 'clsx';
import { useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

import { oAuthApi } from '@api/OAuthApi';

export const YandexAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onAuth = async () => {
    setIsLoading(true);
    await oAuthApi.auth();
  };

  return (
    <button
      className={clsx(
        'btn bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-red-500 text-center w-full flex align-middle justify-center',
        {
          'bg-gray-400': isLoading,
        }
      )}
      disabled={isLoading}
      onClick={onAuth}
      type="button"
    >
      {isLoading ? <BiLoaderAlt className="animate-spin" /> : <p>Войти через Яндекс</p>}
    </button>
  );
};
