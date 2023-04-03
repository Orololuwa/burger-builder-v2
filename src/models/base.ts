export interface IObject {
  [key: string]: any;
}

export interface IObjectGeneric<T> {
  [key: string]: T;
}

export interface IBaseStoreState<T> {
  data: T;
  loading: boolean;
  error: string;
}

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}
