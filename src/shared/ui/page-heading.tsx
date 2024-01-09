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
        className="relative w-full h-12 flex justify-center items-center mb-7"
        ref={ref}
      >
        <img
          src={BackIcon}
          onError={addDefaultSrc}
          className="absolute left-64 hover:opacity-90 transition-opacity active:opacity-80 cursor-pointer"
          onClick={() => navigate(to)}
          alt=""
        />{' '}
        <p className="text-bh font-bold">{children}</p>
        {isMarketItemDetail && (
          <div className="absolute right-64">
            <MenuButton isCurrency />
          </div>
        )}
      </div>
    );
  }
);

PageHeading.displayName = 'PageHeading';
