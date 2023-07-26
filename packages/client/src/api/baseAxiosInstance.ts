import axios from 'axios';

import { API_BASE_URL, API_FORUM_URL } from '@constants';

export const forumAxiosInstance = axios.create({
  baseURL: API_FORUM_URL,
  withCredentials: true,
});

export const baseAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
