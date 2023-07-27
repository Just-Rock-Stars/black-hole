import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { getAuthUserInfo } from '@store/slices/auth/authSlice';

import { FormButton } from '@components/FormButton';
import { Input } from '@components/Input';

import {
  validateEmail,
  validateLogin,
  validateNames,
  validatePhone,
} from '@utils/authFormValidation';
import { isNetworkError } from '@utils/isNetworkError';
import { useAppDispatch } from '@utils/useAppDispatch';
import { useAppSelector } from '@utils/useAppSelector';

import { userApi } from '@src/api/userApi';

import { TFormChangeUserData } from './types';

export const FormChangeUserData: FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TFormChangeUserData>({ mode: 'onChange' });
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.auth.authorizedUser);

  const onSubmit = async (value: TFormChangeUserData) => {
    try {
      await userApi.changeUserProfile({ ...value });
      dispatch(getAuthUserInfo());
    } catch (error) {
      let message = 'Что-то пошло не так. Попробуйте перезагрузить страницу';

      if (isNetworkError(error)) {
        if (error.response.status >= 500) {
          message = 'Повторите попытку позже';
        } else {
          message = error.response.data.reason;
        }
      }

      setError('root', { type: 'server', message });
    }
  };

  if (!userInfo) {
    return null;
  }

  return (
    <form
      action="submit"
      className="flex flex-col items-center justify-center w-full max-w-md gap-y-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className="text-xs p-0.5"
        defaultValue={userInfo.first_name}
        label="Имя"
        validationError={errors.first_name?.message}
        {...register('first_name', { validate: validateNames })}
      />
      <Input
        className="text-xs p-0.5"
        defaultValue={userInfo.second_name}
        label="Фамилия"
        validationError={errors.second_name?.message}
        {...register('second_name', { validate: validateNames })}
      />
      <Input
        className="text-xs p-0.5"
        defaultValue={userInfo.display_name === null ? '' : userInfo.display_name}
        label="Имя в чате"
        validationError={errors.display_name?.message}
        {...register('display_name', { validate: validateNames })}
      />
      <Input
        className="text-xs p-0.5"
        defaultValue={userInfo.login}
        label="Логин"
        validationError={errors.login?.message}
        {...register('login', { validate: validateLogin })}
      />
      <Input
        className="text-xs p-0.5"
        defaultValue={userInfo.email}
        label="Email"
        type="email"
        validationError={errors.email?.message}
        {...register('email', { validate: validateEmail })}
      />
      <Input
        className="text-xs p-0.5"
        defaultValue={userInfo.phone}
        label="Телефон"
        type="phone"
        validationError={errors.phone?.message}
        {...register('phone', { validate: validatePhone })}
      />
      <FormButton
        className="w-full"
        containerClassName="w-full"
        disabled={isSubmitting}
        error={errors.root?.message}
        type="submit"
      >
        Сохранить
      </FormButton>
    </form>
  );
};
