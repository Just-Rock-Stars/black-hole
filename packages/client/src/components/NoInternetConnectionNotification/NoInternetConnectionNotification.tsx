import { FC, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

import { useIsOnline } from '@utils/isOnline';

export const NoInternetConnectionNotification: FC = () => {
  const [isNotificationDismissed, setIsNotificationDismissed] = useState(false);
  const { isOnline } = useIsOnline();

  useEffect(() => {
    setIsNotificationDismissed(false);
  }, [isOnline]);

  if (isOnline || isNotificationDismissed) {
    return null;
  }

  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-x-2 p-3 bg-red-600 text-white rounded-lg">
      Нет подключения к интернету
      <button className="btn btn-danger" onClick={() => setIsNotificationDismissed(true)}>
        <FiX />
      </button>
    </div>
  );
};
