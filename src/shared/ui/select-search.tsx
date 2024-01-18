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
};

export const SelectSearch = ({
  onChange,
  value,
  activeValue,
  onInputChange,
  options,
  clientSideSearch,
  isInvalid,
  ...props
}: Props) => {
  const [coords, setCoords] = useState({ left: 0, top: 0, right: 0 });
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(containerRef, handlerClose, isOpened);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(value.toLowerCase())
  );

  const isEmptyOptions = filteredOptions.length === 0;

  const handleInputClick = () => {
    if (!ref.current) return;

    const { x, y } = ref.current.getBoundingClientRect();

    const right = window.innerWidth - x - ref.current.offsetWidth;
    setCoords({ left: x, top: y + 60, right });
    setIsOpened(true);
  };

  function handlerClose() {
    setIsOpened(false);
  }

  const renderOptions = clientSideSearch ? filteredOptions : options;

  return (
    <div ref={ref} className="w-full relative flex flex-col">
      <Input
        onClick={handleInputClick}
        onChange={(ev) => onInputChange(ev.currentTarget.value)}
        value={value}
        isInvalid={isInvalid}
        {...props}
      />
      {isOpened && (
        <Portal.Root>
          <div
            ref={containerRef}
            className="absolute bg-white rounded overflow-hidden max-h-60 overflow-y-auto shadow-md border-black border-solid border"
            style={coords}
          >
            {isEmptyOptions && (
              <div className="w-full flex justify-center py-4">
                <p>No results</p>
              </div>
            )}

            {!isEmptyOptions &&
              renderOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={clsx(
                    'text-left w-full px-3 py-2 text-base bg-white font-medium hover:bg-black hover:bg-opacity-5 transition-all',
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
