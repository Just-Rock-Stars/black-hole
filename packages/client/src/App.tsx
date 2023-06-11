import { useEffect } from 'react';
import './App.css';
import { AppRouter } from './providers/Router';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { authActions, getAuthUserInfo } from './store/slices/auth/auth';

function App() {
  const isInited = useAppSelector(state => state.auth.isInited);
  const dispatch = useAppDispatch();

  const initFetch = () => {
    dispatch(getAuthUserInfo());
    dispatch(authActions.initAuthData());
  };

  useEffect(() => {
    initFetch();
  }, []);

  return <>{isInited && <AppRouter />}</>;
}

export default App;
