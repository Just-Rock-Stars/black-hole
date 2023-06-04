import axios from 'axios';

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
