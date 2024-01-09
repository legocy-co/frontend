import { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import ExpandIcon from '../../assets/icons/expand.svg';

type MenuButtonProps = {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  isCurrency?: boolean;
};

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ onClick, children, className, isCurrency = false }, ref) => {
    return (
      <button
        className={clsx(
          className,
          'py-3 px-6 rounded-full border border-solid border-graphite text-nowrap font-medium transition-shadow hover:drop-shadow active:drop-shadow-sm',
          { 'flex justify-between items-center min-w-32 px-4': isCurrency }
        )}
        ref={ref}
        onClick={onClick}
      >
        {children}
        {isCurrency && (
          <>
            <p>USD $</p>
            <img src={ExpandIcon} alt="" />
          </>
        )}
      </button>
    );
  }
);

MenuButton.displayName = 'MenuButton';
