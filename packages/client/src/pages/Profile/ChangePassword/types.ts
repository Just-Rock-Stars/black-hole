export interface IFormChangeUserPassword {
  oldPassword: string;
  newPassword: string;
}

export enum ErrorMessage {
  DEFAULT_MESSAGE = 'Что-то пошло не так. Попробуйте перезагрузить страницу',
  OLD_PASSWORD_INCORRECT = 'Старый пароль введен неверно',
  SERVER_ERROR = 'Старый пароль введен неверно',
}
