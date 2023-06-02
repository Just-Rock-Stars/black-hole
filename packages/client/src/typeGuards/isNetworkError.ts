import { AxiosError } from 'axios';

export function isNetworkError(e: any): e is AxiosError {
  if (e && e.isAxiosError === true) {
    const lowercaseMessage = e?.message?.toLowerCase();
    return (
      lowercaseMessage?.includes('Network Error'.toLowerCase()) ||
      e.code === 'ECONNABORTED'
    );
  }

  return false;
}
