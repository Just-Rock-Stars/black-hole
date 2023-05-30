import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { useState } from 'react';
import { AuthApi } from '../../api/Auth/Auth';
import { SignInDto } from '../../api/Auth/types';
import AppLink from '../../components/AppLink/index';
import FormButton from '../../components/FormButton';
import Input from '../../components/Input';
import { Navbar } from '../../components/Navbar';
import { FormValues } from './types';
import { validateLogin, validatePassword } from './validationUtils';

const authApi = new AuthApi();

const submit = (dto: SignInDto) => {
  return authApi.SignIn(dto);
};

export const LoginPage = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

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
      await submit(data);

      reset();

      setHasLoggedIn(true);
    } catch (error) {
      const typedError = error as any;
      const errorMessage = typedError?.message;

      if (typeof errorMessage === 'string') {
        setError('root', { message: errorMessage, type: 'server' });
      }
    }
  };

  if (hasLoggedIn) {
    return <Navigate to={'/profile'} />;
  }

  return (
    <>
      <Navbar />
      <main
        className="flex flex-col
    justify-center items-center
    h-screen w-screen">
        <h1 className="text-4xl mb-8">Войти</h1>
        <form
          action="submit"
          noValidate
          className="flex flex-col items-center justify-center w-1/5 gap-y-2"
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
            text="Войти"
            error={root?.message}
            type="submit"
            disabled={isSubmitting || hasLoggedIn}
          />
        </form>
        <AppLink to={'/signup'} title="Регистрация">
          Регистрация
        </AppLink>
      </main>
    </>
  );
};
