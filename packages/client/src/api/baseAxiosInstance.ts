import axios from 'axios';

import { API_BASE_URL, CUSTOM_API_BASE_URL } from '@constants';

export const forumAxiosInstance = axios.create({
  baseURL: CUSTOM_API_BASE_URL,
  withCredentials: true,
});

export const baseAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
