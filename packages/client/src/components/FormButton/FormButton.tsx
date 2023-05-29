import clsx from 'clsx';

import { Button } from '../Button/Button';
import { FormButtonProps } from './types';

export const FormButton = ({
  error,
  errorClassName,
  containerClassName,
  ...buttonProps
}: FormButtonProps) => {
  return (
    <div className={clsx(containerClassName, ``)}>
      <span
        className={clsx(
          errorClassName,
          `
              mb-3 block
              text-xs text-red-500
              height-1 min-h-16
            `
        )}>
        {error}
      </span>
      <Button {...buttonProps} />
    </div>
  );
};
