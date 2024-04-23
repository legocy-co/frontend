import React, { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent) => void;
  form?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, type = 'button', form, children, className, disabled }, ref) => {
    return (
      <button
        className={clsx(
          className,
          'text-center w-40 h-14 bg-legocy rounded-md text-2xl text-black transition-all hover:bg-brightness-95 active:bg-brightness-90',
          {
            '!bg-pagesizehover dark:!bg-prevdark dark:text-[#F9F9F9] dark:text-opacity-35':
              disabled,
          }
        )}
        ref={ref}
        type={type ?? 'button'}
        onClick={onClick}
        form={form}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
