import InfoIcon from '../../assets/icons/info.svg';
import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

type Props = {
  children: React.ReactNode;
};

export const InfoTooltip = ({ children }: Props) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger asChild>
          <img
            className="w-5 transition-opacity hover:opacity-90"
            src={InfoIcon}
            alt=""
          />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="max-w-52 dark:bg-dark data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-lg bg-white px-5 py-4 text-sm leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] dark:shadow"
            sideOffset={5}
          >
            {children}
            <Tooltip.Arrow className="fill-white dark:fill-dark" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
