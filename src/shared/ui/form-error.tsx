import { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  className?: string;
};

export const FormError = forwardRef<HTMLDivElement, Props>(
  ({ children, className }, ref) => {
    return (
      <div
        className={clsx(
          'absolute py-1.5 px-3.5 bg-invalid bg-opacity-80 text-[#821919] rounded-2xl text-center',
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

FormError.displayName = 'FormError';
