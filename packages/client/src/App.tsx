import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Forum } from './pages/Forum';
import { Game } from './pages/Game';
import { Home } from './pages/Home';
import { Liderboard } from './pages/Liderboard';
import { LoginPage } from './pages/Login/Login';
import { Profile } from './pages/Profile';
import { SignUp } from './pages/Signup/SignUp';

const browserRouter = createBrowserRouter([
  { path: '/', Component: Home },
  { path: '/game', Component: Game },
  { path: '/forum', Component: Forum },
  { path: '/liderboard', Component: Liderboard },
  { path: '/profile', Component: Profile },
  { path: '/sign-in', Component: LoginPage },
  { path: '/sign-up', Component: SignUp },
]);

function App() {
  return <RouterProvider router={browserRouter} />;
}

export default App;
