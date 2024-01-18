import { InputHTMLAttributes, forwardRef, useState } from 'react';
import clsx from 'clsx';
import HideIcon from '../../assets/icons/hide.svg';
import ShowIcon from '../../assets/icons/show.svg';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

export type InputProps = NativeInputProps & {
  labelText: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { labelText, isInvalid, type = 'text', isDisabled, ...rest } = props;
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const isPassword = type === 'password';
  const isNumber = type === 'number';
  const parsedType = getType(type, isPasswordVisible);

  return (
    <>
      <label className="mb-0.5">{labelText}</label>
      <div className="relative">
        <input
          disabled={isDisabled}
          ref={ref}
          className={clsx(
            'block w-[343px] h-[44px] border border-solid border-slate rounded-xl text-charcoal indent-3 pr-10 outline-0 mb-3.5',
            { 'bg-rose': isInvalid },
            { 'no-scroll': isNumber }
          )}
          type={parsedType}
          {...rest}
        />
        {isPassword && (
          <img
            className="absolute top-4 right-3 cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
            onClick={() => setPasswordVisible((prevState) => !prevState)}
            src={isPasswordVisible ? HideIcon : ShowIcon}
            alt=""
          />
        )}
      </div>
    </>
  );
});

Input.displayName = 'Input';

function getType(type: string, isPasswordVisible: boolean) {
  if (type === 'password') return isPasswordVisible ? 'text' : 'password';
  return type;
}
