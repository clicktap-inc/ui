import type { ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

export type UploadImageProps = UseFormRegisterReturn & {
  title?: string;
  description?: ReactNode;
  name?: string;
  fileExtension?: string;
  actionTitle?: string;
  errorMessage?: string;
  defaultImagePath?: string;
  variant?: 'default' | 'base';
  classNames?: SlotsToClasses<'label' | 'skeleton'>;
};
