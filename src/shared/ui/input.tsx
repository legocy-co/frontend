import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

export type InputProps = NativeInputProps & {
  labelText: string;
  isInvalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { labelText, isInvalid } = props;

  return (
    <>
      <label className="mb-0.5">{labelText}</label>
      <input
        ref={ref}
        className={clsx(
          'relative block w-[343px] h-[44px] border border-solid border-slate rounded-xl text-charcoal indent-3 outline-0 mb-3.5',
          { 'bg-rose': isInvalid },
        )}
      />
    </>
  );
});

Input.displayName = 'Input';
