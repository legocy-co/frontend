import { InputHTMLAttributes, forwardRef, useState } from 'react';
import clsx from 'clsx';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

export type InputProps = NativeInputProps & {
  labelText: string;
  isInvalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { labelText, isInvalid, type = 'text', ...rest } = props;
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const isPassword = type === 'password';
  const parsedType = getType(type, isPasswordVisible);

  return (
    <>
      <label className="mb-0.5">{labelText}</label>
      <div className="relative">
        <input
          ref={ref}
          className={clsx(
            'block w-[343px] h-[44px] border border-solid border-slate rounded-xl text-charcoal indent-3 outline-0 mb-3.5',
            { 'bg-rose': isInvalid },
          )}
          type={parsedType}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setPasswordVisible((prevState) => !prevState)}
            className="absolute top-4 right-3 cursor-pointer hover:transition-opacity"
          >
            <img
              src={`/src/assets/icons/${
                isPasswordVisible ? 'hide' : 'show'
              }.svg`}
              alt=""
            />
          </button>
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
