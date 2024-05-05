import { InputHTMLAttributes, forwardRef, useState } from 'react';
import clsx from 'clsx';
import HideIcon from '../../assets/icons/hide.svg';
import ShowIcon from '../../assets/icons/show.svg';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

export type InputProps = NativeInputProps & {
  labelText: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  multiple?: boolean;
  className?: string;
  placeholder?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    labelText,
    isInvalid,
    type = 'text',
    isDisabled,
    className,
    placeholder,
    ...rest
  } = props;

  const isPassword = type === 'password';
  const isNumber = type === 'number';

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const parsedType = getType(type, isPasswordVisible);

  return (
    <>
      <label>{labelText}</label>
      <div className="relative">
        <input
          disabled={isDisabled}
          ref={ref}
          className={clsx(
            'block h-[35px] w-[160px] rounded-md text-celllink dark:text-description indent-3 pr-10 outline-0 mb-1 dark:bg-dark placeholder:text-[#625F5F] dark:placeholder:text-[#F9F9F9] placeholder:text-opacity-35 dark:placeholder:text-opacity-35',
            {
              '!bg-invalid dark:!bg-invalid !text-confirmmodal dark:!text-confirmmodal':
                isInvalid,
            },
            { 'no-scroll': isNumber },
            className
          )}
          type={parsedType}
          placeholder={placeholder}
          {...rest}
        />
        {isPassword && (
          <img
            className="absolute top-4 right-3 cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
            onClick={() => setPasswordVisible((prev) => !prev)}
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
  switch (type) {
    case 'file':
      return 'text';
    case 'password':
      return isPasswordVisible ? 'text' : 'password';
    default:
      return type;
  }
}
