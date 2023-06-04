import clsx from 'clsx';

import { FormButtonProps } from './types';

export const FormButton = ({
  error,
  errorClassName,
  containerClassName,
  ...buttonProps
}: FormButtonProps) => {
  return (
    <div className={containerClassName}>
      <span
        className={clsx(
          errorClassName,
          `
              mb-3 block
              text-xs text-red-500
              height-1 min-h-16
              mx-auto w-fit
            `
        )}>
        {error}
      </span>
      <button
        {...buttonProps}
        className={clsx(buttonProps.className, `btn-primary`)}
      />
    </div>
  );
};
