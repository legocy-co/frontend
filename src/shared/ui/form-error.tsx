import { forwardRef, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const FormError = forwardRef<HTMLDivElement, Props>(
  ({ children }, ref) => {
    return (
      <div
        className="absolute py-1.5 px-3.5 bg-invalid bg-opacity-80 text-[#821919] rounded-2xl"
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

FormError.displayName = 'FormError';
