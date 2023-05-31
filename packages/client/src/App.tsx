import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Forum } from './pages/Forum';
import { Game } from './pages/Game';
import { GameStart } from './pages/GameStart';
import { Home } from './pages/Home';
import { Leaderboard } from './pages/Leaderboard';
import { LoginPage } from './pages/Login/Login';
import { Profile } from './pages/Profile';
import { SignUp } from './pages/Signup/SignUp';
import { Routes } from './utils/global';

const browserRouter = createBrowserRouter([
  { path: Routes.INDEX, Component: Home },
  { path: Routes.GAME, Component: Game },
  { path: Routes.GAME_START, Component: GameStart },
  { path: Routes.FORUM, Component: Forum },
  { path: Routes.LEADERBOARD, Component: Leaderboard },
  { path: Routes.PROFILE, Component: Profile },
  { path: Routes.SIGNIN, Component: LoginPage },
  { path: Routes.SIGNUP, Component: SignUp },
]);

function App() {
  return <RouterProvider router={browserRouter} />;
}

export default App;
