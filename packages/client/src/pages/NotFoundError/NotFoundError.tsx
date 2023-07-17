import { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFoundError: FC = () => {
  return (
    <div className="mt-20 text-center text-white flex flex-col items-center">
      <p className="text-7xl font-bold">404</p>
      <h1 className="mt-4 text-xl font-bold">Извините, страница не найдена</h1>
      <p className="mt-6 text-base w-10/12">
        Похоже страница не найдена. Если вы уверены, что страница существует, пожалуйста, напишите в
        поддержку
      </p>
      <Link to="/">
        <button className="mt-10 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-700 focus-visible:outline-indigo-800">
          Вернуться на главную
        </button>
      </Link>
      <div className="text-sm font-semibold mt-4">
        Contact support
        <span>&rarr;</span>
      </div>
    </div>
  );
};
