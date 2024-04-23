import { Field, useField } from 'effector-forms';
import { Input, InputProps } from './input';
import React, { useState } from 'react';
import { Textarea } from './textarea.tsx';
import clsx from 'clsx';
import { SelectSearch, SelectSearchOption } from './select-search.tsx';

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
  variant,
  className,
}: {
  options: SelectFieldOption[];
  defaultOptionValue: string;
  field: Field<any>;
  disabled?: boolean;
  variant?: 'primary' | '';
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
        'block w-[343px] h-[44px] dark:bg-dark border border-solid border-selectborder rounded-xl text-confirmmodal indent-3 pr-10 outline-0 mb-3.5 dark:text-white',
        {
          '!h-[35px] !w-[160px] !rounded-md !bg-none !border-none text-tab dark:text-[#F9F9F9] !indent-3 !pr-10 !outline-0 !mb-1 dark:!bg-dark !cursor-pointer':
            variant === 'primary',
        },
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
          activeValue ? 'absolute top-8 right-[-16px] cursor-pointer' : 'hidden'
        }
        onClick={handleReset}
      >
        x
      </div>
    </div>
  );
};

export const FilesFieldAdapter = ({
  field,
  labelText,
  ...props
}: FormAdapterProps<File[]>) => {
  const { hasError, onChange, value } = useField(field);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).map((file) => value.push(file));

      const transfer = new DataTransfer();
      value.map((file) => transfer.items.add(file));
      e.target.files = transfer.files;

      const files = [] as File[];
      files.push(...value);

      onChange(files);
    }
  };

  return (
    <div className="w-full relative">
      <Input
        readOnly
        type="file"
        multiple
        labelText={labelText}
        value={'Click to upload'}
        isInvalid={hasError()}
        {...props}
      />
      <input
        accept={props.accept}
        multiple
        className="cursor-pointer opacity-0 z-50 w-full h-full absolute top-0 left-0"
        type="file"
        onChange={handleUpload}
      />
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
