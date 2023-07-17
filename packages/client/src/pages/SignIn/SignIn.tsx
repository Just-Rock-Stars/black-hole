import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { authActions, getAuthUserInfo } from '@store/slices/auth/authSlice';

import { authApi } from '@api/authApi';

import { FormButton } from '@components/FormButton';
import { Input } from '@components/Input';
import { YandexAuth } from '@components/Oauth/YandexAuth';

import { validateLogin, validatePassword } from '@utils/authFormValidation';
import { isNetworkError } from '@utils/isNetworkError';
import { useAppDispatch } from '@utils/useAppDispatch';
import { useAppSelector } from '@utils/useAppSelector';

import { RoutePaths } from '@src/providers/AppRouter/constants';

import { TFormValues } from './types';

export const SignIn: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizedUser = useAppSelector((state) => state.auth.authorizedUser);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TFormValues>({ mode: 'onChange' });

  const onSubmit = async (data: TFormValues) => {
    try {
      await authApi.signIn(data);
      reset();
      dispatch(getAuthUserInfo());
      dispatch(authActions.initAuthData());
      navigate(RoutePaths.HOME);
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

      setError('root', { type: 'server', message });
    }
  };

  if (authorizedUser !== null) {
    return <Navigate to={RoutePaths.PROFILE} />;
  }

  return (
    <div className="flex flex-col justify-center items-center overlay page-container my-6">
      <h1 className="text-4xl mb-4">Вход</h1>
      <form
        action="submit"
        className="flex flex-col items-center justify-center w-full max-w-md gap-y-2"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="text-xs p-0.5 text-xs"
          label="Логин"
          validationError={errors.login?.message}
          {...register('login', { validate: validateLogin })}
        />
        <Input
          className="text-xs p-0.5 text-xs"
          label="Пароль"
          type="password"
          validationError={errors.password?.message}
          {...register('password', { validate: validatePassword })}
        />
        <FormButton
          className="w-full px-3 py-2"
          containerClassName="w-full"
          disabled={isSubmitting}
          error={errors.root?.message}
          type="submit"
        >
          Войти
        </FormButton>
        <Link className="btn btn-secondary text-center w-full" title="Регистрация" to="/sign-up">
          Регистрация
        </Link>
        <YandexAuth />
      </form>
    </div>
  );
};
