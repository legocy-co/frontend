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
          'text-center w-40 h-14 bg-legocy rounded-md text-2xl text-black transition-all hover:brightness-95 active:brightness-90',
          {
            '!bg-pagesizehover dark:!bg-prevdark dark:text-[#F9F9F9] dark:text-opacity-35 pointer-events-none':
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
