import { Field, useField } from 'effector-forms';
import { Input, InputProps } from './input';
import React, { useState } from 'react';
import { Textarea } from './textarea.tsx';
import clsx from 'clsx';
import { SelectSearch, SelectSearchOption } from './select-search.tsx';
import { LazySvg } from './lazy-svg.tsx';
import { Button } from './button.tsx';
import Select, { components, OptionProps } from 'react-select';
import TrashIcon from '../../assets/icons/trash.svg?react';
import ChevronUpIcon from '../../assets/icons/chevron-up.svg?react';

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
  placeholder,
}: FormAdapterProps<string>) => {
  const { value, onChange, hasError } = useField(field);

  return (
    <Textarea
      placeholder={placeholder}
      labelText={labelText}
      className={className}
      isInvalid={hasError()}
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

export const MultiCheckboxAdapter = ({
  field,
  label,
  options,
}: {
  field: Field<string[]>;
  label: string;
  options: SelectFieldOption[];
}) => {
  const { value, onChange } = useField(field);

  const hasValue = value && value.length;

  const Option = (props: OptionProps) => {
    return (
      <div>
        <components.Option
          {...props}
          className="dark:!bg-dark dark:!border-dark "
        >
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{' '}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const ClearIndicator = () => (
    <Button
      className="w-[52px] h-5 flex !flex-grow-0 text-white mr-3 !bg-black dark:!bg-white !bg-opacity-35 text-[0.7rem] dark:!bg-opacity-35 items-center align-top justify-evenly rounded-sm"
      onClick={() => onChange([])}
    >
      <p>Clear</p>
      <TrashIcon className="w-2 fillswhite" />
    </Button>
  );

  const DropdownIndicator = () => (
    <ChevronUpIcon
      className={`${
        hasValue
          ? 'hidden'
          : 'w-[14px] mr-3 rotate-180 dark:opacity-25 iconstrokes'
      }`}
    />
  );

  return (
    <div>
      <p>{label}</p>
      <Select
        options={options}
        isMulti
        isSearchable={false}
        placeholder={2010}
        classNames={{
          control: () =>
            '!bg-white dark:!bg-dark !min-h-[35px] !border-none !shadow-none mt-2',
          option: () =>
            '!bg-white !flex !gap-2 !text-black dark:!text-white dark:!bg-dark hover:!bg-condition dark:hover:!bg-tab input:!bg-transparent accent-dark',
          multiValue: () =>
            '!bg-celllink rounded-sm h-5 !text-xs flex items-center justify-between',
          multiValueLabel: () => '!text-statevaluationchart',
          multiValueRemove: () =>
            'hover:!bg-transparent text-white hover:!text-white hover:!text-opacity-95',
          indicatorSeparator: () => 'hidden',
        }}
        hideSelectedOptions={false}
        components={{
          Option,
          ClearIndicator,
          DropdownIndicator,
        }}
        onChange={(opt) =>
          onChange(opt.map((op: SelectFieldOption) => op.value))
        }
        value={
          value
            ? value.map((value) => Object({ value: value, label: value }))
            : []
        }
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
