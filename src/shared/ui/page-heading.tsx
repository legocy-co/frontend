import { forwardRef, ReactNode } from 'react';
import BackIcon from '../../assets/icons/back.svg';
import { addDefaultSrc } from '../../services/utils.ts';
import { useNavigate } from 'react-router-dom';
import { MenuButton } from './menu-button.tsx';

type PageHeadingProps = {
  children?: ReactNode;
  to?: string;
  isMarketItemDetail?: boolean;
};

export const PageHeading = forwardRef<HTMLDivElement, PageHeadingProps>(
  ({ children, to = '/', isMarketItemDetail = false }, ref) => {
    const navigate = useNavigate();

    return (
      <div
        className="relative w-2/3 h-12 flex justify-between items-center mb-7"
        ref={ref}
      >
        <img
          src={BackIcon}
          onError={addDefaultSrc}
          className="hover:opacity-90 transition-opacity active:opacity-80 cursor-pointer"
          onClick={() => navigate(to)}
          alt=""
        />{' '}
        <p className="absolute left-0 right-0 text-center text-bh font-bold pointer-events-none">
          {children}
        </p>
        {isMarketItemDetail && <MenuButton isCurrency />}
      </div>
    );
  }
);

PageHeading.displayName = 'PageHeading';
