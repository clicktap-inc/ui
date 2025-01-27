import type { ReactNode } from 'react';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export type TableProps<T> = {
  columns: (
    | {
        id: keyof T;
        label: string;
        renderer?: (props: T) => ReactNode;
      }
    | {
        id: string;
        label: string;
        renderer: (props: T) => ReactNode;
      }
  )[];
  rows: T[];
  onRowClick?: (row: T) => void;
  classNames?: SlotsToClasses<
    'table' | 'thead' | 'tbody' | 'theadTr' | 'tbodyTr' | 'th' | 'td'
  >;
};
