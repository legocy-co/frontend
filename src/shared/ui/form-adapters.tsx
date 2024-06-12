import { Field, useField } from 'effector-forms';
import { Input, InputProps } from './input';
import React, { useState } from 'react';
import { Textarea } from './textarea.tsx';
import clsx from 'clsx';
import { SelectSearch, SelectSearchOption } from './select-search.tsx';
import { LazySvg } from './lazy-svg.tsx';

export type FormAdapterProps<T> = {
  field: Field<T>;
} & Omit<InputProps, 'isInvalid'>;

export type SelectFieldOption = {
  value: string;
  label: string;
};

export const TextFieldAdapter = ({
  field,
  ...props
}: FormAdapterProps<string>) => {
  const { value, onChange, hasError } = useField(field);

  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      isInvalid={hasError()}
      {...props}
    />
  );
};

export const NumberFieldAdapter = ({
  field,
  ...props
}: FormAdapterProps<number>) => {
  const { value, onChange, hasError } = useField(field);

  return (
    <Input
      type="number"
      value={value ?? ''}
      onChange={handleNumberFieldChange(onChange)}
      isInvalid={hasError()}
      {...props}
    />
  );
};

export const SelectFieldAdapter = ({
  field,
  defaultOptionValue,
  options,
  disabled,
  className,
}: {
  options: SelectFieldOption[];
  defaultOptionValue: string;
  field: Field<any>;
  disabled?: boolean;
  className?: string;
}) => {
  const { value, onChange, hasError } = useField(field);

  const isInvalid = hasError();

  return (
    <select
      value={value ?? defaultOptionValue}
      disabled={disabled}
      onChange={(ev) => onChange(ev.currentTarget.value)}
      className={clsx(
        'block w-[343px] h-[44px] bg-pagesize dark:bg-dark rounded-md text-confirmmodal indent-3 pr-10 outline-0 dark:text-white',
        className,
        { '!bg-invalid dark:!bg-invalid dark:!text-black': isInvalid }
      )}
    >
      {options.map(({ value, label }, i) => (
        <option key={value + i} value={value} className="">
          {label}
        </option>
      ))}
    </select>
  );
};

export const TextareaFieldAdapter = ({
  field,
  className,
  labelText,
}: FormAdapterProps<string>) => {
  const { value, onChange } = useField(field);

  return (
    <Textarea
      labelText={labelText}
      className={className}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export const SelectSearchAdapter = ({
  field,
  labelText,
  options,
  clientSideSearch,
  ...props
}: FormAdapterProps<string> & {
  options: SelectSearchOption[];
  clientSideSearch?: boolean;
}) => {
  const { onChange, hasError, value: activeValue } = useField(field);
  const [value, setValue] = useState('');
  const foundValue = options.find((option) => option.value === activeValue);
  const inputValue = foundValue ? foundValue.label : value;

  function handleReset() {
    field.reset();
    setValue('');
  }

  return (
    <div className="relative">
      <SelectSearch
        {...props}
        clientSideSearch={clientSideSearch}
        labelText={labelText}
        onChange={(option) => {
          onChange(option.value);
        }}
        onInputChange={(search) => setValue(search)}
        value={inputValue}
        isInvalid={hasError()}
        isDisabled={inputValue === foundValue?.label}
        options={options}
        activeValue={activeValue}
      />
      <div
        className={
          activeValue ? 'absolute top-5 right-[-16px] cursor-pointer' : 'hidden'
        }
        onClick={handleReset}
      >
        x
      </div>
    </div>
  );
};

export const SelectMenuAdapter = ({
  label,
  field,
  options,
  description,
  className,
  icons,
}: {
  label: string;
  icons?: string[];
  description?: string;
  options: SelectFieldOption[];
  field: Field<any>;
  disabled?: boolean;
  className?: string;
}) => {
  const { value, onChange } = useField(field);

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <p className="text-xl text-[#332929] dark:text-[#F9F9F9]">{label}</p>
      {description && (
        <p className="text-sm font-normal text-[#242020] dark:text-[#F9F9F9] text-opacity-85">
          {description}
        </p>
      )}
      <div className="flex flex-wrap w-80 sm:w-[466px] gap-[10px] mb-2">
        {options.map((option, i) => (
          <div
            key={'menu-button-' + i}
            className={clsx(
              ' h-[30px] flex items-center px-3 text-state gap-2 bg-pagesize rounded-[19px] cursor-pointer dark:bg-darkfiltersborder dark:bg-opacity-30 dark:text-darkstate',
              {
                '!bg-dark !text-white dark:!text-darkstatefocus dark:!bg-darkstatebg dark:!bg-opacity-none':
                  value === option.value,
              }
            )}
            onClick={() => onChange(option.value)}
          >
            {icons && icons[i] && <LazySvg name={icons[i]} className="w-5" />}
            <p className="text-[10px]">{option.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

function handleNumberFieldChange(onChange: (value: number) => void) {
  return (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    value === '' || isNaN(+value)
      ? onChange(null as unknown as number)
      : onChange(+value);
  };
}
