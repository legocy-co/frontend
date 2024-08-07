import { forwardRef, ReactNode } from 'react';
import BackIcon from '../../assets/icons/back.svg?react';
import { useNavigate } from 'react-router-dom';
import { MenuButton } from './menu-button.tsx';
import clsx from 'clsx';

type PageHeadingProps = {
  children?: ReactNode;
  to?: string;
  isMarketItemDetail?: boolean;
  className?: string;
};

export const PageHeading = forwardRef<HTMLDivElement, PageHeadingProps>(
  ({ children, to, isMarketItemDetail = false, className }, ref) => {
    const navigate = useNavigate();

    return (
      <div
        className={clsx(
          'relative w-2/3 h-12 flex justify-center items-center mb-[30px] text-nowrap',
          className
        )}
        ref={ref}
      >
        <BackIcon
          className={
            !to
              ? 'hidden'
              : 'max-lg:hidden lg:absolute left-0 hover:opacity-90 transition-opacity active:opacity-80 cursor-pointer'
          }
          onClick={() => navigate(to!)}
        />
        <div className="flex justify-center text-celllink dark:text-description items-center gap-6 text-bh font-bold">
          {children}
        </div>
        {isMarketItemDetail && (
          <MenuButton className="absolute right-0" isCurrency />
        )}
      </div>
    );
  }
);

PageHeading.displayName = 'PageHeading';
