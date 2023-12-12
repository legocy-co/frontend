import { forwardRef, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Error = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <div
      className="absolute py-1.5 px-3.5 bg-rose-2 text-burgundy border border-solid border-burgundy rounded-2xl"
      ref={ref}
    >
      {children}
    </div>
  );
});

Error.displayName = 'Error';
