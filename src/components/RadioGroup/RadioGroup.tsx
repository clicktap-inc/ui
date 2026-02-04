import { Label, RadioGroup as AriaRadioGroup } from 'react-aria-components';
import { cn } from '../../utils/cn';
import { RadioGroupProps } from './RadioGroup.types';

export function RadioGroup({
  label,
  errorMessage,
  description,
  orientation,
  children,
  className,
  ...props
}: RadioGroupProps) {
  return (
    <AriaRadioGroup
      className={cn('flex flex-col gap-4', className)}
      orientation={orientation}
      {...props}
    >
      {typeof children === 'function' ? (
        children
      ) : (
        <>
          {label && (
            <Label className="flex text-slate-500 text-xs">{label}</Label>
          )}
          <div
            className={cn(
              'flex flex-col gap-2',
              orientation === 'horizontal' && 'flex-row items-center gap-4',
            )}
          >
            {children}
          </div>
          {description && (
            <p className="flex mt-1 text-slate-500 text-sm">{description}</p>
          )}

          {errorMessage && (
            <p className="flex pl-6 text-red-500 text-sm">{errorMessage}</p>
          )}
        </>
      )}
    </AriaRadioGroup>
  );
}

export default RadioGroup;
