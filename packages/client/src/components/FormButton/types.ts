import { ButtonHTMLAttributes } from 'react';

export type FormButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  error?: string;
  errorClassName?: string;
  containerClassName?: string;
};
