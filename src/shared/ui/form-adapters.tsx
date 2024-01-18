import { Field, useField } from 'effector-forms';
import { Input, InputProps } from './input';
import React from 'react';
import { Textarea } from './textarea.tsx';
import clsx from 'clsx';
import { number } from 'zod';

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
}: {
  options: SelectFieldOption[];
  defaultOptionValue: string;
  field: Field<any>;
}) => {
  const { value, onChange, hasError } = useField(field);
  const isInvalid = hasError();

  return (
    <select
      value={value ?? defaultOptionValue}
      onChange={(ev) => onChange(ev.currentTarget.value)}
      className={clsx(
        'block w-[343px] h-[44px] border border-solid border-slate rounded-xl text-charcoal indent-3 pr-10 outline-0 mb-3.5',
        { 'bg-rose': isInvalid }
      )}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value} className="">
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

function handleNumberFieldChange(onChange: (value: number) => void) {
  return (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    value === '' || isNaN(+value)
      ? onChange(null as unknown as number)
      : onChange(+value);
  };
}
