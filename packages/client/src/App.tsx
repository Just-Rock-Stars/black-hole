import './App.css'
import { Leaderboard } from './pages/Leaderboard'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { Forum } from './pages/Forum'
import { Profile } from './pages/Profile'
import { Game } from './pages/Game'
import { GameStart } from './pages/GameStart'
import { Routes } from './utils/global'
import { GameEnd } from './pages/GameEnd'

const browserRouter = createBrowserRouter([
  { path: Routes.INDEX, Component: Home },
  { path: Routes.GAME, Component: Game },
  { path: Routes.GAME_START, Component: GameStart },
  { path: Routes.GAME_END, Component: GameEnd },
  { path: Routes.FORUM, Component: Forum },
  { path: Routes.LEADERBOARD, Component: Leaderboard },
  { path: Routes.PROFILE, Component: Profile },
])

function App() {
  return <RouterProvider router={browserRouter} />
}

export default App
