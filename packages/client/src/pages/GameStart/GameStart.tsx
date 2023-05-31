import { FC } from 'react';
import { GAME_NAME, Routes } from '../../utils/global';
import { Link } from 'react-router-dom';

const GameStart: FC = () => {
  return (
    <section className="container m-auto px-4 lg:px-10 flex flex-col items-center">
      <h1 className="font-black m-0 text-center text-4xl my-6">{GAME_NAME}</h1>
      <p className="text-base my-2 text-zinc-900">
        Подарите себе незабываемую прогулку по неизведанным просторам Вселенной
        в нашей новой игре <span className="font-bold">{GAME_NAME}</span>. Это
        та самая игра, где вы не просто обычный путешественник - вы могучая
        черная дыра с космическим аппетитом!
      </p>
      <p className="text-base my-2 text-zinc-900">
        Ваша цель, казалось бы, проста - расти и развиваться, поглощая все на
        своем пути. Начиная с звездных крошек типа астероидов и комет, вы будете
        постепенно набирать вес и мощь. Ну и, конечно, становиться всё более
        угрожающими для окружающего космического мусора.
      </p>
      <p className="text-base my-2 text-zinc-900">
        Но внимание, не все во Вселенной готовы вас полюбить! Более крупные
        объекты, такие как планеты и звезды, могут нанести вам урон. Поэтому
        избегайте их, пока не станете достаточно большими, чтобы поглотить даже
        их. Сейчас они вас отшвыривают, а завтра вы их... поглотите!
      </p>
      <p className="text-base my-2 text-zinc-900">
        <span className="font-bold">{GAME_NAME}</span> предлагает уникальный
        геймплей, в котором вы не только упражняетесь в стратегическом выборе
        закуски, но и активно избегаете космических боссов, пока не наберете
        достаточно мощности.
      </p>
      <p className="text-base my-2 text-zinc-900">
        Приготовьтесь к захватывающему космическому путешествию. Нажмите кнопку
        <span className="italic"> "Поглотить Вселенную" </span> и поддайтесь
        своему космическому аппетиту.
      </p>
      <p className="text-xl font-bold my-2 text-zinc-900 text-center">
        Вселенная, приготовься - пришло время стать космическим пожирателем!
      </p>
      <Link to={Routes.GAME} className="btn-primary my-6">
        Поглотить Вселенную ✨
      </Link>
    </section>
  );
};

export default GameStart;
