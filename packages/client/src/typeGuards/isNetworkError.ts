import { AxiosError, isAxiosError } from 'axios';

export function isNetworkError(e: unknown): e is AxiosError & {
  response: { data: { reason: string } };
} {
  return e && isAxiosError(e) && e.response?.status && e.response.data.reason;
}
