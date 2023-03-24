export interface IObject {
  [key: string]: any;
}

export interface IBaseStoreState<T> {
  data: T;
  loading: boolean;
  error: string;
}
