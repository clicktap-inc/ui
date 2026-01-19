'use client';

import { useFilter } from 'react-aria';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CountryIso2,
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';
import {
  Button,
  ListBox,
  ListBoxItem,
  Input as AriaInput,
  DialogTrigger,
} from 'react-aria-components';
import type { TextFieldProps } from 'react-aria-components';
import { cn } from '../../utils/cn';
import { Input } from '../Input/Input';
import type { SlotsToClasses } from '../../types/SlotsToClasses';

interface PhoneInputProps extends Omit<TextFieldProps, 'type'> {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  classNames?: SlotsToClasses<'label' | 'input' | 'description' | 'error'>;
  defaultCountry?: CountryIso2;
}

const options = defaultCountries.map(parseCountry);

export function PhoneInput({
  value,
  onChange,
  defaultCountry = 'us',
  ...props
}: PhoneInputProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry,
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange?.(data.phone);
      },
      forceDialCode: true,
    });
  const dialCodeWithPrefix = `+${country.dialCode}`;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { startsWith } = useFilter({ sensitivity: 'base' });
  const [filterValue, setFilterValue] = useState('');
  const [isOpen, onOpenChange] = useState(false);

  const filteredItems = useMemo(
    () => options.filter((item) => startsWith(item.name, filterValue)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterValue]
  );

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div
      className={cn('flex relative', props.label ? 'pt-4' : '')}
      aria-label={props['aria-label']}
    >
      <DialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
        <Button
          aria-label="Select Country"
          className="flex px-4 h-10 text-sm items-center rounded-l-md bg-slate-100 gap-2 uppercase [&[aria-expanded=false]_svg]:rotate-180 border border-r-0 border-slate-300"
          excludeFromTabOrder
        >
          {country.iso2}
          <svg
            width="15"
            height="8"
            viewBox="0 0 15 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 7L7.5 0.999999L14 7" stroke="currentColor" />
          </svg>
        </Button>

        <div
          className={cn(
            'w-full grid absolute left-0 top-[calc(100%+.25rem)] bg-white z-50 rounded-md text-slate-600 border border-slate-300',
            'shadow-inner',
            isOpen ? 'block' : 'hidden'
          )}
          ref={triggerRef}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 17 16"
            className="absolute top-4 left-[1.325rem]"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M12.3 6.9a4.9 4.9 0 1 1-9.8 0 4.9 4.9 0 0 1 9.8 0Zm-1.1 5.7c-1.1.7-2.4 1.2-3.8 1.2a6.9 6.9 0 1 1 5.3-2.5l3 3-1.4 1.4-3.1-3Z"
              clipRule="evenodd"
            />
          </svg>

          <AriaInput
            aria-label="Search for countries"
            placeholder="Search for countries"
            className={cn(
              'pl-12 pr-5 py-4 w-full m-0 border-0 text-slate-950 transition-all duration-[0.25s] ease outline-0 bg-transparent',
              'placeholder:text-slate-950 focus:outline-0',
              'border-b border-slate-200'
            )}
            onChange={(event) => setFilterValue(event.target.value)}
            onBlur={() => {
              onOpenChange(false);
              inputRef.current?.focus();
            }}
            value={filterValue}
            ref={searchRef}
          />

          <div className="p-2.5">
            <ListBox
              className="text-slate-950 max-h-60 overflow-y-auto"
              selectionMode="single"
              aria-label="Countries List"
              onSelectionChange={(selection) => {
                setCountry(String([...selection][0]));
                setFilterValue('');
                onOpenChange(false);
              }}
            >
              {(isOpen ? filteredItems : []).map((parsedCountry) => (
                <ListBoxItem
                  id={parsedCountry.iso2}
                  key={parsedCountry.iso2}
                  value={parsedCountry}
                  textValue={parsedCountry.iso2}
                  className="p-3 text-slate-900 data-[hovered]:bg-slate-100 rounded-md"
                >
                  {parsedCountry.name} (+{parsedCountry.dialCode})
                </ListBoxItem>
              ))}
            </ListBox>
          </div>
        </div>
      </DialogTrigger>

      <Input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        value={inputValue}
        inputProps={{
          onChange: handlePhoneValueChange,
        }}
        ref={inputRef}
        classNames={{
          input: cn(
            'rounded-l-none',
            inputValue.trim() === dialCodeWithPrefix ? 'text-slate-600' : ''
          ),
          label: 'absolute top-0 left-0',
        }}
      />
    </div>
  );
}

export default PhoneInput;
