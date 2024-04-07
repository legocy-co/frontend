import ChevronUpIcon from '../../assets/icons/chevron-up.svg?react';
import clsx from 'clsx';
import './ScrollArrow.scss';
import { useState } from 'react';

export const ScrollArrow = () => {
  const [shown, setShown] = useState(false);

  window.addEventListener('scroll', function () {
    setShown(
      window.scrollY >
        document.body.offsetHeight / 2 -
          (window.innerHeight / document.body.offsetHeight) * window.innerHeight
    );
  });

  return (
    <div
      className={clsx('scrollarrow', {
        '!hidden': !shown,
      })}
      onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}
    >
      <ChevronUpIcon />
    </div>
  );
};
