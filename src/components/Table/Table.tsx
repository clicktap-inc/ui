'use client';

import { cn } from '../../utils/cn';
import type { TableProps } from './Table.types';

export function Table<T>({
  columns,
  rows,
  onRowClick = () => {},
  classNames,
}: TableProps<T>) {
  return (
    <table className={cn(classNames?.table)}>
      <thead className={cn(classNames?.thead)}>
        <tr className={cn(classNames?.theadTr)}>
          {columns.map((column) => (
            <th
              key={String(column.id)}
              className={cn(classNames?.th)}
              data-th-header={column.label.toLowerCase()}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={cn(classNames?.tbody)}>
        {Object.entries(rows).map(([key, row]) => (
          <tr
            key={key}
            onClick={() => onRowClick(row)}
            className={cn(classNames?.tbodyTr)}
          >
            {columns.map((column) => (
              <td
                key={`${String(column.id)}_${key}`}
                data-th={column.label.toLowerCase()}
                className={cn(classNames?.td)}
              >
                {column.renderer
                  ? column.renderer(row)
                  : String(row[column.id as keyof T])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
