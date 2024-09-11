import { InputAttributes, NumberFormatBase } from 'react-number-format';
import {
  FieldError,
  Input,
  Label,
  Text,
  TextFieldProps,
  ValidationResult,
  TextField,
} from 'react-aria-components';
import { cn } from '../utils';
import type { SlotsToClasses } from '../types';

interface CreditCardExpirationInputProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  classNames?: SlotsToClasses<'label' | 'input' | 'description' | 'error'>;
}

function AriaInput({ className, ...props }: InputAttributes) {
  return (
    <Input
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
        className
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

export function CreditCardExpirationInput({
  label,
  description,
  errorMessage,
  placeholder,
  value,
  className,
  classNames,
  ...props
}: CreditCardExpirationInputProps) {
  const format = (val: string) => {
    if (val === '') return '';
    let month = val.substring(0, 2);
    const year = val.substring(2, 4);

    if (month.length === 1 && Number(month[0]) > 1) {
      month = `0${month[0]}`;
    } else if (month.length === 2) {
      // set the lower and upper boundary
      if (Number(month) === 0) {
        month = `01`;
      } else if (Number(month) > 12) {
        month = '12';
      }
    }

    return `${month}/${year}`;
  };

  return (
    <TextField
      className={cn('flex flex-col w-full text-slate-900', className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Label className={cn('flex text-slate-500 text-sm', classNames?.label)}>
        {label}
      </Label>
      <NumberFormatBase
        format={format}
        customInput={AriaInput}
        className={cn(classNames?.input)}
        placeholder={placeholder}
        value={value}
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

CreditCardExpirationInput.defaultProps = {
  label: undefined,
  description: undefined,
  errorMessage: undefined,
  placeholder: undefined,
  classNames: undefined,
};

export default CreditCardExpirationInput;
