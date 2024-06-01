import { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import ExpandIcon from '../../assets/icons/expand.svg';

type MenuButtonProps = {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  isCurrency?: boolean;
  disabled?: boolean;
  isInvalid?: boolean;
};

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  (
    { onClick, children, className, isCurrency = false, disabled, isInvalid },
    ref
  ) => {
    return (
      <button
        className={clsx(
          className,
          'py-2.5 px-5 rounded-2xl bg-pagesize dark:bg-dark border border-solid border-menubuttonborder text-nowrap whitespace-nowrap text-celllink dark:text-white transition-all hover:brightness-95 active:brightness-90',
          { 'flex justify-between items-center min-w-32 px-4': isCurrency },
          {
            'pointer-events-none !border-step !text-[#8E8D8D] dark:bg-tab dark:!border-darkmenuborder dark:border-opacity-95':
              disabled,
          },
          { '!bg-invalid !text-black': isInvalid }
        )}
        ref={ref}
        onClick={onClick}
        disabled={disabled}
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
