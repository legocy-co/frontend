import { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  type?: 'button' | 'submit';
  onClick?: () => void;
  form?: string;
  children: ReactNode;
  className?: string;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ onClick, type = 'button', form, children, className }, ref) => {
    return (
      <button
        className={clsx(
          className,
          'text-center w-60 h-14 bg-legocy rounded-xl text-2xl text-black transition-colors hover:bg-legocy-hover active:bg-legocy-active',
        )}
        ref={ref}
        type={type ?? 'button'}
        onClick={onClick}
        form={form}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
