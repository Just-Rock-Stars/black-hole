import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormButton } from '@components/FormButton';
import { Header } from '@components/Header';
import { Input } from '@components/Input';

import { validatePassword } from '@utils/authFormValidation';
import { isNetworkError } from '@utils/isNetworkError';

import { userApi } from '@src/api/userApi';

import { ErrorMessage } from './constants';
import { TFormChangeUserPassword } from './types';

export const ChangePassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors: { root, oldPassword: oldPasswordError, newPassword: newPasswordError },
      isSubmitting,
    },
  } = useForm<TFormChangeUserPassword>({
    mode: 'onChange',
  });

  const withErrorHandling = async (cb: () => Promise<void>) => {
    try {
      await cb();
    } catch (error) {
      let message = ErrorMessage.DEFAULT_MESSAGE;

      if (isNetworkError(error)) {
        if (error.response.status === 400) {
          message = ErrorMessage.OLD_PASSWORD_INCORRECT;
        }
        if (error.response.status >= 500) {
          message = ErrorMessage.SERVER_ERROR;
        }
      }
      setError('root', { type: 'server', message });
    }
  };

  const onSubmit = (formValues: TFormChangeUserPassword) => {
    withErrorHandling(async () => {
      await userApi.changeUserPassword(formValues);
      navigate('/profile');
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-5.75rem)] max-w-4xl my-0 mx-auto p-8 bg-white relative border border-gray-300">
        <main className="flex flex-col justify-center items-center w-full">
          <h1 className="text-4xl font-bold pb-14">Изменить пароль</h1>
          <form
            action="submit"
            className="flex flex-col items-center justify-center xs:w-1/2 sm:w-1/2 lg:w-1/3 lg:max-w-464px gap-y-2"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              className="text-xs p-0.5"
              label="Старый пароль"
              type="password"
              validationError={oldPasswordError?.message}
              {...register('oldPassword', { validate: validatePassword })}
            />
            <Input
              className="text-xs p-0.5"
              label="Новый пароль"
              type="password"
              validationError={newPasswordError?.message}
              {...register('newPassword', { validate: validatePassword })}
            />
            <FormButton
              className="w-full"
              containerClassName="w-full mt-5"
              disabled={isSubmitting}
              error={root?.message}
              type="submit"
            >
              Сохранить
            </FormButton>
          </form>
        </main>
      </div>
    </>
  );
};
