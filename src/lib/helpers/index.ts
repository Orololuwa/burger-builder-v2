import { IPagination } from "models/base";

export const initialPagination: IPagination = {
  next: 2,
  total: 0,
  prevPage: 0,
  lastPage: 0,
  pageSize: 10,
  hasNext: true,
  currentPage: 1,
  hasPrevious: false
};
