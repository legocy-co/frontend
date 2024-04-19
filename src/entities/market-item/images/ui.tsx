import CloseIcon from '../../../assets/icons/close.svg?react';
import clsx from 'clsx';
import React from 'react';

type Props = {
  images: File[];
  handleDelete: (file: File) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, item: File) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, item: File) => void;
};

export const MarketItemPreview = ({
  images,
  handleDelete,
  onDrop,
  onDragOver,
  onDragStart,
  onDragEnd,
}: Props) => {
  return (
    <div className="flex max-w-[675px] flex-wrap gap-2 justify-center items-center">
      {images &&
        images.map((img, i) => (
          <div
            key={URL.createObjectURL(img)}
            className="relative"
            draggable
            onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
              onDragStart(e, img)
            }
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDrop={(e: React.DragEvent<HTMLDivElement>) => onDrop(e, img)}
          >
            {!i && <p className="font-normal text-xs">Thumbnail</p>}
            <img
              src={URL.createObjectURL(img)}
              className={clsx(
                'rounded-lg w-[127px] h-[92px] object-cover object-center cursor-grab',
                { 'mt-[0.9rem]': i }
              )}
              alt="image"
              id={'preview-' + i}
            />
            <CloseIcon
              className="absolute w-2 top-5 right-2 fillswhite cursor-pointer transition-opacity hover:opacity-95 active:opacity-90"
              onClick={() => handleDelete(img)}
            />
          </div>
        ))}
    </div>
  );
};
