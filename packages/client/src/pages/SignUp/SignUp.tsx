import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { authApi } from '@api/authApi';

import { FormButton } from '@components/FormButton';
import { Input } from '@components/Input';
import { YandexAuth } from '@components/Oauth/YandexAuth';

import {
  validateEmail,
  validateLogin,
  validateNames,
  validatePassword,
  validatePhone,
} from '@utils/authFormValidation';
import { isNetworkError } from '@utils/isNetworkError';

import { RoutePaths } from '@src/providers/AppRouter/constants';

import { TFormValues } from './types';

export const SignUp: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: {
      errors: {
        root,
        login: loginError,
        password: passwordError,
        first_name: nameError,
        second_name: surnameError,
        email: emailError,
        phone: phoneError,
      },
      isSubmitting,
    },
  } = useForm<TFormValues>({ mode: 'onChange' });

  const onSubmit = async (formValues: TFormValues) => {
    try {
      await authApi.signUp(formValues);

      reset();
      navigate(RoutePaths.SIGN_IN);
    } catch (error) {
      let message = 'Что-то пошло не так. Попробуйте перезагрузить страницу';

      if (isNetworkError(error)) {
        if (error.response.data.reason === 'User already in system') {
          message = 'Пользователь уже авторизован';
        }

        if (error.response.data.reason === 'Login already exists') {
          message = 'Пользователь с таким логином уже существует';
        }

        if (error.response.data.reason === 'Email already exists') {
          message = 'Пользователь с такой почтой уже существует';
        }

        if (error.response.status >= 500) {
          message = 'Повторите попытку позже';
        }
      }

      setError('root', { type: 'server', message });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center overlay page-container my-6">
      <h1 className="text-4xl mb-8">Регистрация</h1>
      <form
        action="submit"
        className="flex flex-col items-center justify-center gap-y-2 w-full max-w-md"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="text-xs p-0.5 text-xs"
          label="Имя"
          validationError={nameError?.message}
          {...register('first_name', { validate: validateNames })}
        />
        <Input
          className="text-xs p-0.5 text-xs"
          label="Фамилия"
          validationError={surnameError?.message}
          {...register('second_name', { validate: validateNames })}
        />
        <Input
          className="text-xs p-0.5 text-xs"
          label="Логин"
          validationError={loginError?.message}
          {...register('login', { validate: validateLogin })}
        />
        <Input
          className="text-xs p-0.5 text-xs"
          label="Email"
          type="email"
          validationError={emailError?.message}
          {...register('email', { validate: validateEmail })}
        />
        <Input
          className="text-xs p-0.5 text-xs"
          label="Пароль"
          type="password"
          validationError={passwordError?.message}
          {...register('password', { validate: validatePassword })}
        />
        <Input
          className="text-xs p-0.5 text-xs"
          label="Телефон"
          type="phone"
          validationError={phoneError?.message}
          {...register('phone', { validate: validatePhone })}
        />
        <FormButton
          className="w-full px-3 py-2"
          containerClassName="w-full"
          disabled={isSubmitting}
          error={root?.message}
          type="submit"
        >
          Зарегистрироваться
        </FormButton>
        <Link className="btn btn-secondary text-center mt-3 w-full" title="Войти" to="/sign-in">
          Войти
        </Link>
        <YandexAuth />
      </form>
    </div>
  );
};
