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
          'text-center w-60 h-14 bg-legocy rounded-xl text-2xl text-black transition-colors hover:bg-legocy-hover active:bg-legocy-active',
          {
            '!bg-silver dark:!bg-darkbuttondisabled dark:text-darkfiltersprice':
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
