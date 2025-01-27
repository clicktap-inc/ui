'use client';

import { cn } from '../../utils/cn';
import type { IconProps } from './Icon.types';

export function Hamburger({ className, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21 14"
      width="20"
      height="20"
      fill="#20293A"
      className={cn(className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <path d="M0.583333 14H20.4167C20.7433 14 21 13.7433 21 13.4167V12.25C21 11.9233 20.7433 11.6667 20.4167 11.6667H0.583333C0.256667 11.6667 0 11.9233 0 12.25V13.4167C0 13.7433 0.256667 14 0.583333 14ZM0.583333 8.16667H20.4167C20.7433 8.16667 21 7.91 21 7.58333V6.41667C21 6.09 20.7433 5.83333 20.4167 5.83333H0.583333C0.256667 5.83333 0 6.09 0 6.41667V7.58333C0 7.91 0.256667 8.16667 0.583333 8.16667ZM0 0.583333V1.75C0 2.07667 0.256667 2.33333 0.583333 2.33333H20.4167C20.7433 2.33333 21 2.07667 21 1.75V0.583333C21 0.256667 20.7433 0 20.4167 0H0.583333C0.256667 0 0 0.256667 0 0.583333Z" />
    </svg>
  );
}

export default Hamburger;
