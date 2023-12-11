import { forwardRef, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Error = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <div
      className="absolute py-1.5 px-3.5 bg-roseo text-crimson border border-solid border-crimson rounded-2xl"
      ref={ref}
    >
      {children}
    </div>
  );
});

Error.displayName = 'Error';

// margin-top: 1px;
// position: absolute;
// padding: 6px 15px;
// background: #FFD0D0D1;
// color: #821919;
// border: 1px solid #821919;
// border-radius: 17px;
