import { forwardRef, ReactNode } from 'react';
import BackIcon from '../../assets/icons/back.svg';
import { addDefaultSrc } from '../../services/utils.ts';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

export const PageHeading = forwardRef<HTMLDivElement, Props>(
  ({ children }, ref) => {
    const navigate = useNavigate();
    return (
      <div
        className="relative w-full flex justify-center items-center mb-7"
        ref={ref}
      >
        <img
          src={BackIcon}
          onError={addDefaultSrc}
          className="absolute left-0 hover:opacity-90 transition-opacity active:opacity-80 cursor-pointer"
          onClick={() => navigate('/')}
          alt=""
        />{' '}
        <p className="text-bh font-bold">{children}</p>
      </div>
    );
  }
);

PageHeading.displayName = 'PageHeading';
