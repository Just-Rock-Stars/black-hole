import clsx from 'clsx';
import { FC, useRef } from 'react';

import { useFullscreenStatus } from '@utils/useFullscreenStatus';

import { TMaximizableViewProps } from './types';

export const MaximizableView: FC<TMaximizableViewProps> = ({ children, backgroundColor }) => {
  const maximizableElement = useRef(null);
  const { isFullscreen, setFullscreen, isFullscreenApiSupported } =
    useFullscreenStatus(maximizableElement);

  return (
    <div
      ref={maximizableElement}
      className={clsx(
        'flex flex-row',
        isFullscreen && 'flex-col-reverse content-end items-center pl-4'
      )}
      style={{ backgroundColor: isFullscreen ? backgroundColor : '' }}
    >
      <div className="w-full h-full overflow-auto">{children}</div>
      <div className="w-20 -ml-24 -mt-4">
        {!isFullscreenApiSupported ? null : isFullscreen ? (
          <button
            className="btn btn-primary my-6 text-2xl absolute right-12"
            onClick={() => document.exitFullscreen()}
          >
            ⛶
          </button>
        ) : (
          <button className="btn btn-primary my-6 text-2xl" onClick={setFullscreen}>
            ⛶
          </button>
        )}
      </div>
    </div>
  );
};
