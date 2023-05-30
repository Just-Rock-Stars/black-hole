import { trim } from '../../utils/validation';

export const validatePassword = (value: string | null) => {
  const password = trim(value);

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

export const validateLogin = (value: string | null) => {
  const login = trim(value);

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

  if (email.length > 40) {
    return 'Email должен быть не длиннее 40 символов';
  }

  const regEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

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
    return 'Телефон должен быть не короч 10 символов';
  }

  if (phone.length > 15) {
    return 'Телефон должен быть не длиннее 15 символов';
  }

  const regEx = /^\+?[0-9]{10,15}$/;

  if (!regEx.test(phone)) {
    return 'Телефон должен состоять из цифр, может начинается с плюса';
  }
};
