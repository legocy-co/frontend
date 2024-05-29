import * as Switch from '@radix-ui/react-switch';
import clsx from 'clsx';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  thumbClassName?: string;
};

export const Toggle = ({
  checked,
  onChange,
  className,
  thumbClassName,
}: Props) => {
  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={onChange}
      className={clsx(
        'w-[65px] h-[31px] bg-white rounded-full data-[state=checked]:bg-primary-default outline-none cursor-pointer px-1 transition-all flex-shrink-0',
        className
      )}
    >
      <Switch.Thumb
        className={clsx(
          'block w-[25px] h-[25px] bg-black rounded-full transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[32px]',
          thumbClassName
        )}
      />
    </Switch.Root>
  );
};
