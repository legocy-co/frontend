import { forwardRef, ReactNode } from 'react';

type Props = {
  type?: 'button' | 'submit';
  onClick?: () => void;
  form?: string;
  children: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ onClick, type = 'button', form, children }, ref) => {
    return (
      <button
        className="text-center mt-14 w-60 h-14 bg-legocy rounded-xl text-2xl hover:bg-legocyhover active:bg-legocyactive"
        ref={ref}
        type={type ?? 'button'}
        onClick={onClick}
        form={form}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
