import { ClassValue } from 'clsx';

export type SlotsToClasses<S extends string> = {
  [key in S]?: ClassValue;
};
