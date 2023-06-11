import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { FC } from 'react';
import { authApi } from '../../api/Auth/Auth';
import { authActions, getAuthUserInfo } from '../../store/slices/auth/auth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import AppLink from '../../components/AppLink/index';
import FormButton from '../../components/FormButton';
import Input from '../../components/Input';
import {
  validateLogin,
  validatePassword,
} from '../../helpers/authFormValidation';
import { isNetworkError } from '../../typeGuards/isNetworkError';
import { RoutePaths } from '../../providers/Router/AppRouter/constants';
import { FormValues } from './types';
import { Header } from '../../components/Header';

export const SignIn: FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth.authData);

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors: { root, login: loginError, password: passwordError },
      isSubmitting,
    },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await authApi.SignIn(data);

      reset();

      dispatch(getAuthUserInfo());
      dispatch(authActions.initAuthData());
    } catch (error) {
      let message = 'Что-то пошло не так. Попробуйте перезагрузить страницу';

      if (isNetworkError(error)) {
        if (error.response.status === 401) {
          message = 'Неверный логин или пароль';
        }

        if (error.response.data.reason === 'User already in system') {
          message = 'Пользователь уже авторизован';
        }

        if (error.response.status >= 500) {
          message = 'Повторите попытку позже';
        }
      }

      setError('root', {
        type: 'server',
        message,
      });
    }
  };

  if (auth) {
    return <Navigate to={RoutePaths.PROFILE} />;
  }

  return (
    <>
      <Header />
      <main
        className="flex flex-col
    justify-center items-center
    h-screen w-full">
        <h1 className="text-4xl mb-8">Войти</h1>
        <form
          action="submit"
          noValidate
          className="flex flex-col items-center justify-center xs:w-1/2 sm:w-1/2 lg:w-1/3 lg:max-w-464px gap-y-2"
          onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="text-xs p-0.5 text-xs"
            label="Логин"
            validationError={loginError?.message}
            {...register('login', { validate: validateLogin })}
          />
          <Input
            type="password"
            className="text-xs p-0.5 text-xs"
            label="Пароль"
            validationError={passwordError?.message}
            {...register('password', { validate: validatePassword })}
          />
          <FormButton
            containerClassName={`
            w-full mt-5
          `}
            className={`
              w-full px-3
              py-2 mt-3 text-white
              font-medium text-sm
              mt-0
            `}
            error={root?.message}
            type="submit"
            disabled={isSubmitting || !!auth}>
            Войти
          </FormButton>
        </form>
        <AppLink to={'/sign-up'} title="Регистрация">
          Регистрация
        </AppLink>
      </main>
    </>
  );
};
