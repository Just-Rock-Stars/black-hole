import { FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  IFormChangeUserData,
  IFormChangeUserDataProps,
  IUserData,
} from './types';
import { Input } from '../../../components/Input/Input';
import { FormButton } from '../../../components/FormButton/FormButton';
import { UserApi } from '../../../api/UserApi/UserApi';
import {
  validateLogin,
  validateNames,
  validateEmail,
  validatePhone,
} from '../../../helpers/authFormValidation';
import { isNetworkError } from '../../../typeGuards/isNetworkError';

const submit = (data: IUserData) => {
  return UserApi.changeUserProfile(data);
};

export const FormChangeUserData: FC<IFormChangeUserDataProps> = ({
  userInfo,
  fetchUserInfo,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors: {
        root,
        login: loginError,
        first_name: nameError,
        second_name: surnameError,
        display_name: displayNameError,
        email: emailError,
        phone: phoneError,
      },
      isSubmitting,
    },
  } = useForm<IFormChangeUserData>({
    mode: 'onChange',
  });

  const onSubmit = async (value: IFormChangeUserData) => {
    try {
      await submit({
        ...value,
      });

      fetchUserInfo();
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
  return (
    <form
      action="submit"
      noValidate
      className="flex flex-col items-center justify-center xs:w-1/2 sm:w-1/2 lg:w-1/3 lg:max-w-464px gap-y-2"
      onSubmit={handleSubmit(onSubmit)}>
      <Input
        defaultValue={userInfo?.first_name}
        className="text-xs p-0.5"
        label="Имя"
        validationError={nameError?.message}
        {...register('first_name', { validate: validateNames })}
      />
      <Input
        defaultValue={userInfo?.second_name}
        className="text-xs p-0.5"
        label="Фамилия"
        validationError={surnameError?.message}
        {...register('second_name', { validate: validateNames })}
      />
      <Input
        defaultValue={
          userInfo?.display_name === null ? '' : userInfo?.display_name
        }
        className="text-xs p-0.5"
        label="Имя в чате"
        validationError={displayNameError?.message}
        {...register('display_name', { validate: validateNames })}
      />
      <Input
        defaultValue={userInfo?.login}
        className="text-xs p-0.5"
        label="Логин"
        validationError={loginError?.message}
        {...register('login', { validate: validateLogin })}
      />
      <Input
        defaultValue={userInfo?.email}
        className="text-xs p-0.5"
        label="Email"
        type="email"
        validationError={emailError?.message}
        {...register('email', { validate: validateEmail })}
      />
      <Input
        defaultValue={userInfo?.phone}
        type="phone"
        className="text-xs p-0.5"
        label="Телефон"
        validationError={phoneError?.message}
        {...register('phone', { validate: validatePhone })}
      />
      <FormButton
        containerClassName={`
            w-full mt-5
          `}
        className={`
              w-full px-3
              py-2 mt-3 text-white
              font-medium text-sm
            `}
        error={root?.message}
        type="submit"
        disabled={isSubmitting}>
        Сохранить
      </FormButton>
    </form>
  );
};
