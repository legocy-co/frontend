import { useRef, useState } from 'react';
import * as Portal from '@radix-ui/react-portal';
import { useOutsideClick } from 'rooks';
import { Input } from './input';
import clsx from 'clsx';

export type SelectSearchOption = {
  label: string;
  value: string;
};

type Props = {
  options: SelectSearchOption[];
  onInputChange: (value: string) => void;
  onChange: (option: SelectSearchOption) => void;
  value: string;
  activeValue?: string;
  labelText: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  className?: string;
  clientSideSearch?: boolean;
  placeholder?: string;
};

export const SelectSearch = ({
  onChange,
  value,
  activeValue,
  onInputChange,
  options,
  clientSideSearch,
  isInvalid,
  className,
  placeholder,
  ...props
}: Props) => {
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(value.toLowerCase())
  );

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [coords, setCoords] = useState({ left: 0, top: 0, right: 0 });
  const [isOpened, setIsOpened] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const defineOptionsPosition = () => {
    const current = ref.current;
    if (!current) return;
    const { x, y } = current.getBoundingClientRect();
    const right = window.innerWidth - x - current.offsetWidth;

    setCoords({
      left: x,
      top: y + scrollY + current.offsetHeight - 10,
      right,
    });
  };

  const handleInputClick = () => {
    defineOptionsPosition();
    setIsOpened(true);
  };

  function handlerClose() {
    setIsOpened(false);
  }

  useOutsideClick(containerRef, handlerClose, isOpened);

  const isEmptyOptions = filteredOptions.length === 0;
  const renderOptions = clientSideSearch ? filteredOptions : options;

  addEventListener('scroll', () => {
    defineOptionsPosition();
  });

  return (
    <div ref={ref} className="w-full relative flex flex-col">
      <Input
        ref={inputRef}
        onClick={handleInputClick}
        className={className}
        onChange={(ev) => onInputChange(ev.currentTarget.value)}
        value={value}
        isInvalid={isInvalid}
        placeholder={placeholder}
        {...props}
      />
      {isOpened && (
        <Portal.Root>
          <div
            ref={containerRef}
            className={`absolute bg-white dark:bg-dark rounded overflow-hidden max-h-60 overflow-y-auto w-[${
              inputRef.current ? inputRef.current.offsetWidth : 333
            }px] shadow-md border-black border-solid border z-30`}
            style={coords}
          >
            {isEmptyOptions &&
              (value ? (
                <div className="w-full flex justify-center py-4">
                  <p>No results</p>
                </div>
              ) : (
                <div className="w-full flex justify-center py-4">
                  <p>Enter something</p>
                </div>
              ))}

            {!isEmptyOptions &&
              renderOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={clsx(
                    'text-left dark:bg-dark w-full px-3 py-2 text-base bg-white font-medium hover:bg-black hover:bg-opacity-20 transition-all',
                    {
                      '!bg-primary-default !text-neutral-900':
                        activeValue === option.value,
                    }
                  )}
                  onClick={() => {
                    onChange(option);
                    handlerClose();
                  }}
                >
                  {option.label}
                </button>
              ))}
          </div>
        </Portal.Root>
      )}
    </div>
  );
};
