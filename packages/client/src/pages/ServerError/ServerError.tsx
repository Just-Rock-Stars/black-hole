import { FC } from 'react';
import { Link } from 'react-router-dom';

export const ServerError: FC = () => {
  return (
    <div className="mt-20 text-center text-white flex flex-col items-center">
      <p className="text-7xl font-bold">500</p>
      <h1 className="mt-4 text-xl font-bold">Извините, произошла ошибка</h1>
      <p className="mt-6 text-base w-10/12">
        Похоже ошибка произошла на стороне сервера. Свяжитесь с нами, и мы поможем вам решить её.
      </p>
      <Link to="/">
        <button className="mt-10 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-700 focus-visible:outline-indigo-800">
          Вернуться на главную
        </button>
      </Link>
      <div className="text-sm font-semibold mt-4">
        Contact support <span>&rarr;</span>
      </div>
    </div>
  );
};
