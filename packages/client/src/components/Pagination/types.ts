import { Dispatch, SetStateAction } from 'react';

export interface IPagination {
  pages: Array<number>;
  switchPages: Dispatch<SetStateAction<number>>;
  currentPage: number;
}
