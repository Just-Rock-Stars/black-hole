export const validatePassword = (password: string | null) => {
  if (password === null || password === '') {
    return 'Поле обязательно для ввода';
  }

  if (password.length < 8) {
    return 'Пароль должен быть не короче 8 символов';
  }

  if (password.length > 40) {
    return 'Пароль должен быть не длиннее 40 символов';
  }

  const regEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,40}$/;

  if (!regEx.test(password)) {
    return 'Пароль должен состоять из букв латинского алфавита, содержать минимум одну большую и маленькую букву, один спец символ';
  }
};

export const validateLogin = (login: string | null) => {
  if (login === null || login === '') {
    return 'Поле обязательно для ввода';
  }

  if (login.length < 4) {
    return 'Логин должен быть не короче 4 символов';
  }

  if (login.length > 20) {
    return 'Логин должен быть не длиннее 20 символов';
  }

  const regEx = new RegExp('^[A-Za-z0-9]*$');

  if (!regEx.test(login)) {
    return 'Логин может состоять только из цифр и букв латинского алфавита';
  }
};
