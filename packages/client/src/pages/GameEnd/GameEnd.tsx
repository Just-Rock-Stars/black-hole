import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import { RoutePaths } from '../../providers/Router/AppRouter/constants';

const GameEnd: FC = () => {
  return (
    <>
      <Header />
      <section className="page-container px-4 lg:px-10 flex flex-col">
        <h1 className="font-black m-0 text-center text-4xl my-6">GAME OVER</h1>
        <p className="text-base my-2 text-zinc-900">
          Ваше космическое путешествие подошло к концу... на время. Вы показали
          невероятные навыки поглощения и непреодолимый аппетит в этой
          галактической схватке. Мироздание может выдохнуть... но не надолго!
        </p>
        <p className="font-bold text-xl my-2 text-zinc-900">
          Вот ваши впечатляющие достижения:
        </p>
        <ul className="list-disc pl-5">
          <li>
            Время прохождения:
            <span className="font-bold text-rose-500"> 123 </span>
          </li>
          <li>
            Набранные очки:{' '}
            <span className="font-bold text-rose-500"> 123 </span>
          </li>
          <li>
            Максимальный размер:
            <span className="font-bold text-rose-500"> 123 </span>
          </li>
          <li>
            Количество поглощенных объектов:
            <span className="font-bold text-rose-500"> 123 </span>
          </li>
        </ul>
        <p className="text-base my-2 text-zinc-900">
          Но знаем мы одно - космический аппетит никогда не утихает полностью!
          Подобно сияющим звездам на темном небе, ваше стремление к победе не
          иссякнет.
        </p>
        <p className="text-base my-2 text-zinc-900">
          Готовы вновь ощутить всю мощь и величие вселенной? Нажмите
          <span className="italic"> "Поглотить вселенную снова" </span> и
          продолжите свое поглощающее путешествие, становясь еще больше, еще
          сильнее! Или если вам нужно немного отдохнуть, кнопка
          <span className="italic"> "Вернуться на главную" </span> приведет вас
          обратно к тихому причалу нашей главной страницы.
        </p>
        <p className="text-xl font-bold my-2 text-zinc-900 text-center sm:text-left">
          Определите свой следующий путь, о могучий поглотитель космоса!
        </p>
        <div className="flex flex-col md:flex-row w-full gap-4 text-center py-4 md:py-0">
          <Link to={RoutePaths.GAME} className="btn-primary md:my-6">
            Поглотить вселенную снова ✨
          </Link>
          <Link to={RoutePaths.HOME} className="btn-primary md:my-6">
            Вернуться на главную
          </Link>
        </div>
      </section>
    </>
  );
};

export default GameEnd;
