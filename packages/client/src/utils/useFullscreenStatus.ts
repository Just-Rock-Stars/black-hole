import React from 'react';

import { TFsDocument, TFullScreenElementProp } from '@components/MaximizableView/types';

const doc: TFsDocument = document;

export const useFullscreenStatus = (ref: React.RefObject<HTMLElement>) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const isFullscreenApiSupported = createInitialIsFullscreenApiSupported();

  const setFullscreen = React.useCallback(() => {
    if (ref.current === null) return;

    ref.current
      .requestFullscreen()
      .then(() => {
        setIsFullscreen(doc[getBrowserFullscreenElementProp()] !== null);
      })
      .catch(() => {
        setIsFullscreen(false);
      });
  }, [ref]);

  React.useLayoutEffect(() => {
    document.onfullscreenchange = () =>
      setIsFullscreen(doc[getBrowserFullscreenElementProp()] !== null);

    return () => {
      document.onfullscreenchange = null;
    };
  });

  return { isFullscreen, setFullscreen, isFullscreenApiSupported };
};

const createInitialIsFullscreenApiSupported = () => {
  let isInitialApiSupported = true;
  try {
    doc[getBrowserFullscreenElementProp()];
  } catch (e) {
    isInitialApiSupported = false;
  }
  return isInitialApiSupported;
};

function getBrowserFullscreenElementProp(): TFullScreenElementProp {
  if (typeof doc.fullscreenElement !== 'undefined') {
    return 'fullscreenElement';
  } else if (typeof doc.mozFullScreenElement !== 'undefined') {
    return 'mozFullScreenElement';
  } else if (typeof doc.msFullscreenElement !== 'undefined') {
    return 'msFullscreenElement';
  } else if (typeof doc.webkitFullscreenElement !== 'undefined') {
    return 'webkitFullscreenElement';
  } else {
    throw new Error('fullscreenElement не поддерживается вашим браузером');
  }
}
