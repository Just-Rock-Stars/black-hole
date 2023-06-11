import { Navbar } from '../../../components/Navbar';
import { Layout } from '../Layout';
import { useNavigate } from 'react-router-dom';
import { FormButton } from '../../../components/FormButton/FormButton';
import { Input } from '../../../components/Input/Input';
import { UserApi } from '../../../api/UserApi/UserApi';
import { validatePassword } from '../../../helpers/authFormValidation';
import { ErrorMessage, IFormChangeUserPassword } from './types';
import { useForm } from 'react-hook-form';
import { isNetworkError } from '../../../typeGuards/isNetworkError';

const submit = (data: IFormChangeUserPassword) => {
  return UserApi.changeUserPassword(data);
};

export const ChangePassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors: {
        root,
        oldPassword: oldPasswordError,
        newPassword: newPasswordError,
      },
      isSubmitting,
    },
  } = useForm<IFormChangeUserPassword>({
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

  const onSubmit = (value: IFormChangeUserPassword) => {
    withErrorHandling(async () => {
      await submit({ ...value });

      navigate('/profile');
    });
  };

  return (
    <>
      <Navbar />
      <Layout>
        <main className="flex flex-col justify-center items-center w-full">
          <h1 className="text-4xl font-bold pb-14">Изменить пароль</h1>
          <form
            action="submit"
            noValidate
            className="flex flex-col items-center justify-center xs:w-1/2 sm:w-1/2 lg:w-1/3 lg:max-w-464px gap-y-2"
            onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="password"
              className="text-xs p-0.5"
              label="Старый пароль"
              validationError={oldPasswordError?.message}
              {...register('oldPassword', { validate: validatePassword })}
            />
            <Input
              type="password"
              className="text-xs p-0.5"
              label="Новый пароль"
              validationError={newPasswordError?.message}
              {...register('newPassword', { validate: validatePassword })}
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
        </main>
      </Layout>
    </>
  );
};
