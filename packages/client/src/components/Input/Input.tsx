import clsx from 'clsx';
import { forwardRef } from 'react';

import { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      wrapperClassName,
      label,
      className,
      labelClassName,
      validationError,
      ...inputProps
    },
    ref
  ) => {
    const inputError = 'border-red-500';
    return (
      <div
        className={clsx(wrapperClassName, 'flex flex-col items-center w-full')}>
        {label !== undefined && (
          <label
            htmlFor={inputProps.id}
            className={clsx(
              labelClassName,
              `block mr-auto text-sm
            font-medium text-gray-700 mb-1
            `
            )}>
            {label}
          </label>
        )}
        <input
          {...inputProps}
          ref={ref}
          className={clsx(
            className,
            `bg-gray-50 border text-gray-900
          border-gray-300 text-gray-900 focus:ring-blue-500 rounded-lg
          focus:border-blue-500 block w-full focus-visible:outline-none`,
            { [inputError]: !!validationError }
          )}
        />
        <span className={'block text-xs text-red-500 mt-1 w-full min-h-16'}>
          {validationError}
        </span>
      </div>
    );
  }
);
