import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

type SelectOptionProps = {
  to: string;
  label: string;
  description: string;
  descriptionWidth?: number;
  icon: React.ReactNode;
  white?: boolean;
};

export const SelectOption = ({
  to,
  label,
  description,
  icon,
  descriptionWidth = 160,
  white,
}: SelectOptionProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        'w-80 sm:w-[364px] aspect-[1.3] p-2 rounded-[10px] bg-white text-center dark:bg-state flex flex-col items-center justify-center gap-6 cursor-pointer transition-opacity hover:opacity-95 active:opacity-90',
        { 'dark:bg-white text-black': white }
      )}
      onClick={() => navigate(to)}
    >
      {icon}
      <p className="font-bold text-[1.625rem]">{label}</p>
      <p className={`max-w-[${descriptionWidth}px] text-lg`}>{description}</p>
    </div>
  );
};
