import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Forum } from './pages/Forum'
import { Game } from './pages/Game'
import { GameEnd } from './pages/GameEnd'
import { GameStart } from './pages/GameStart'
import { Home } from './pages/Home'
import { Leaderboard } from './pages/Leaderboard/Leaderboard'
import { Profile } from './pages/Profile'
import { Routes } from './utils/global'

import './App.css'

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
