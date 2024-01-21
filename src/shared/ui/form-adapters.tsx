import { Field, useField } from 'effector-forms';
import { Input, InputProps } from './input';
import React, { useRef, useState } from 'react';
import { Textarea } from './textarea.tsx';
import clsx from 'clsx';
import { SelectSearch, SelectSearchOption } from './select-search.tsx';

type FormAdapterProps<T> = {
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
}: {
  options: SelectFieldOption[];
  defaultOptionValue: string;
  field: Field<any>;
  disabled?: boolean;
}) => {
  const { value, onChange, hasError } = useField(field);

  const isInvalid = hasError();

  return (
    <select
      value={value ?? defaultOptionValue}
      disabled={disabled}
      onChange={(ev) => onChange(ev.currentTarget.value)}
      className={clsx(
        'block w-[343px] h-[44px] border border-solid border-slate rounded-xl text-charcoal indent-3 pr-10 outline-0 mb-3.5',
        { 'bg-rose': isInvalid }
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
  const { value, onChange, hasError } = useField(field);

  return (
    <Textarea
      labelText={labelText}
      className={className}
      isInvalid={hasError()}
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
        className="absolute top-8 right-4 cursor-pointer"
        onClick={() => field.reset()}
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
  const { hasError, onChange } = useField(field);

  const handleUpload = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.currentTarget.files) {
      const files = [] as File[];
      Array.from(ev.currentTarget.files).map((file) => {
        files.push(file);
      });
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
