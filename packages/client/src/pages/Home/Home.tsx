import { FC } from 'react';
import { Hero } from './parts/Hero';
import { About } from './parts/About';
import { Header } from '../../components/Header';

const Home: FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
    </>
  );
};

export default Home;
