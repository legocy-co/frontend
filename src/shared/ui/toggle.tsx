import * as Switch from '@radix-ui/react-switch';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const Toggle = ({ checked, onChange }: Props) => {
  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={onChange}
      className="w-[65px] h-[31px] bg-white rounded-full data-[state=checked]:bg-primary-default outline-none cursor-pointer px-[4px] transition-all flex-shrink-0"
    >
      <Switch.Thumb className="block w-[25px] h-[25px] bg-black rounded-full transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[32px]" />
    </Switch.Root>
  );
};
