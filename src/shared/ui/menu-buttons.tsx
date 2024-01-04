import { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';

type MenuButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ onClick, children, className }, ref) => {
    return (
      <button
        className={clsx(
          className,
          'py-3 px-6 rounded-full border border-solid border-graphite text-nowrap font-medium transition-shadow hover:drop-shadow active:drop-shadow-sm'
        )}
        ref={ref}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

MenuButton.displayName = 'MenuButton';
