import {
  FieldError,
  Input as AriaInput,
  Label,
  Text,
  TextField,
  TextFieldProps,
  ValidationResult,
} from 'react-aria-components';
import { cn } from '../utils';
import type { SlotsToClasses } from '../types';

export interface MyTextFieldProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  classNames?: SlotsToClasses<'label' | 'input' | 'description' | 'error'>;
}

export const InputSharedClasses = [
  'border-solid border border-slate-300 rounded-md',
  'text-sm text-slate-900 placeholder-slate-400',
  'h-10 px-2 py-0 m-0 w-full',
  'bg-white',
  'transition-all duration-200 ease-in-out',
  'hover:border-slate-400',
  'focus:outline-2 focus:outline focus:outline-slate-200 focus:border-slate-400',
  'disabled:border-slate-200 disabled:bg-slate-100',
  'invalid:border-red-500 invalid:bg-red-100 invalid:text-red-600',
  'invalid:hover:border-red-600 invalid:focus:border-red-600 invalid:focus:outline-red-200',
];

export function Input({
  label,
  description,
  errorMessage,
  placeholder,
  className,
  classNames,
  ...props
}: MyTextFieldProps) {
  return (
    <TextField
      className={cn('flex flex-col w-full text-slate-900', className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Label className={cn('flex text-slate-500 text-sm', classNames?.label)}>
        {label}
      </Label>
      <AriaInput
        placeholder={placeholder}
        className={cn(
          'border-solid border border-slate-300 rounded-md',
          'text-sm text-slate-900 placeholder-slate-400',
          'h-10 px-2 py-0 m-0 w-full',
          'bg-white',
          'transition-all duration-200 ease-in-out',
          'hover:border-slate-400',
          'focus:outline-2 focus:outline focus:outline-slate-200 focus:border-slate-400',
          'disabled:border-slate-200 disabled:bg-slate-100',
          'invalid:border-red-500 invalid:bg-red-100 invalid:text-red-600',
          'invalid:hover:border-red-600 invalid:focus:border-red-600 invalid:focus:outline-red-200',
          classNames?.input
        )}
      />

      {description && (
        <Text
          className={cn('flex text-slate-500 text-sm', classNames?.description)}
          slot="description"
        >
          {description}
        </Text>
      )}
      <FieldError
        className={cn('flex text-red-500 text-sm', classNames?.error)}
      >
        {errorMessage}
      </FieldError>
    </TextField>
  );
}

Input.defaultProps = {
  label: undefined,
  description: undefined,
  errorMessage: undefined,
  placeholder: undefined,
  classNames: undefined,
};

export default Input;
