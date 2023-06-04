import { trim } from './validationHelpers';

export const validatePassword = (value: string | null) => {
  const password = trim(value);

  if (!password) {
    return 'Поле обязательно для ввода';
  }

  if (password.length < 8) {
    return 'Пароль должен быть не короче 8 символов';
  }

  if (password.length > 40) {
    return 'Пароль должен быть не длиннее 40 символов';
  }

  const regEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

  if (!regEx.test(password)) {
    return 'Пароль должен состоять из букв латинского алфавита, содержать минимум одну большую и маленькую букву, один спец символ';
  }
};

export const validateLogin = (value: string | null) => {
  if (!value) {
    return 'Поле обязательно для ввода';
  }

  if (value.length < 4) {
    return 'Имя должно быть не короче 4 символов';
  }

  if (value.length > 20) {
    return 'Логин должен быть не длиннее 20 символов';
  }

  const regEx = /^[A-Za-z0-9]*$/;

  if (!regEx.test(value)) {
    return 'Логин может состоять только из цифр и букв латинского алфавита';
  }
};

export const validateNames = (value: string | null) => {
  const name = trim(value);

  if (name === null || name === '') {
    return 'Поле обязательно для ввода';
  }

  if (name.length > 20) {
    return 'Имя должно быть не длиннее 20 символов';
  }

  const regEx = /^[A-ZА-Я][\p{L}]*$/u;

  if (!regEx.test(name)) {
    return 'Логин может состоять только из букв латинского алфавита или кирилицы';
  }
};

export const validateEmail = (value: string | null) => {
  const email = trim(value);

  if (email === null || email === '') {
    return 'Поле обязательно для ввода';
  }

  if (email.length > 254) {
    return 'Email должен быть не длиннее 254 символов';
  }

  const regEx = /^[\w-.]+@([\w-]+\.)+[\w-]/;

  if (!regEx.test(email)) {
    return 'Некорректный адрес почты';
  }
};

export const validatePhone = (value: string | null) => {
  const phone = trim(value);

  if (phone === null || phone === '') {
    return 'Поле обязательно для ввода';
  }

  if (phone.length < 10) {
    return 'Телефон должен быть не короче 10 символов';
  }

  if (phone.length > 15) {
    return 'Телефон должен быть не длиннее 15 символов';
  }

  const regEx = /^\+?[0-9]*$/;

  if (!regEx.test(phone)) {
    return 'Телефон должен состоять из цифр, может начинается с плюса';
  }
};
