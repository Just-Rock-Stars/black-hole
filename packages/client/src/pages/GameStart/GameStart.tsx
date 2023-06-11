import { FC } from 'react';
import { GAME_NAME } from '../../utils/global';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import { RoutePaths } from '../../providers/Router/AppRouter/constants';

const GameStart: FC = () => {
  return (
    <>
      <Header />
      <section className="page-container flex flex-col justify-center items-center md:items-start">
        <h1 className="font-black m-0 text-center text-4xl my-6 w-full">
          Подготовьтесь к космическому путешествию в {GAME_NAME}
        </h1>
        <h2 className="font-black text-2xl my-6 w-full">Управление:</h2>
        <ul className="list-disc pl-5">
          <li>
            <span className="font-bold">Десктоп:</span> используйте
            клавиши-стрелки на клавиатуре для передвижения вашей черной дыры по
            просторам космоса.
          </li>
          <li>
            <span className="font-bold">Мобильные устройства:</span> просто
            свайпайте в нужном направлении для перемещения черной дыры.
          </li>
        </ul>
        <h2 className="font-black text-2xl my-6 w-full">Механика игры:</h2>
        <p className="text-base my-2 text-zinc-900">
          Ваша черная дыра начинает свое путешествие будучи небольшим объектом,
          но она может поглощать другие объекты для увеличения своего веса и
          мощи. Каждый объект в игре, включая вашу черную дыру, имеет свой вес.
        </p>
        <p className="text-base my-2 text-zinc-900">
          Схватка с объектом заканчивается одним из двух способов: если ваша
          черная дыра тяжелее, она поглотит объект и увеличит свой вес. Если же
          объект тяжелее вашей черной дыры, она получит урон. Ваша задача -
          стать настолько большой и мощной, чтобы суметь поглотить абсолютно
          все.
        </p>
        <p className="text-xl font-bold my-2 text-zinc-900 text-center">
          Начните свою миссию по поглощению вселенной!
        </p>
        <Link to={RoutePaths.GAME} className="btn-primary my-6">
          Поглотить Вселенную ✨
        </Link>
      </section>
    </>
  );
};

export default GameStart;
