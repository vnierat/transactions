import { ReactNode } from 'react';

export type Columns<T> = {
  key: keyof T;
  label: ReactNode | string;
  render: (value: T[keyof T]) => JSX.Element;
  sortable?: boolean;
  onSort?: () => void;
};
