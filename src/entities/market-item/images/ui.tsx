import CloseIcon from '../../../assets/icons/close.svg?react';
import PlusIcon from '../../../assets/icons/plus.svg?react';
import React from 'react';
import clsx from 'clsx';
import { handleUploadFile } from '../../../services/utils.ts';

type Props = {
  images: File[];
  handleDelete: (file: File) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, item: File) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, item: File) => void;
  variant?: 'update';
  onChange?: (v: File[]) => File[];
};

export const MarketItemPreview = ({
  images,
  handleDelete,
  onDrop,
  onDragOver,
  onDragStart,
  onDragEnd,
  variant,
  onChange,
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
            {!i && !variant && (
              <p className="font-normal text-xs absolute bottom-24 left-8">
                Thumbnail
              </p>
            )}
            <img
              src={URL.createObjectURL(img)}
              className={clsx(
                'rounded-lg w-[127px] h-[92px] object-cover object-center cursor-grab',
                {
                  'border border-solid border-white':
                    variant === 'update' && !i,
                }
              )}
              alt="image"
              id={'preview-' + i}
            />
            <CloseIcon
              className="absolute w-2 top-1 right-2 fillswhite cursor-pointer transition-opacity hover:opacity-95 active:opacity-90"
              onClick={() => handleDelete(img)}
            />
          </div>
        ))}
      {variant === 'update' && onChange && (
        <>
          <input
            id="imagesUpload"
            type="file"
            placeholder=""
            multiple
            onChange={(e) => handleUploadFile(e, images, onChange)}
            accept=".jpg, .jpeg, .webp, .heic"
            className="hidden"
          />
          <label
            htmlFor="imagesUpload"
            className="rounded-lg w-[127px] h-[92px] dark:bg-white bg-black !bg-opacity-20 flex justify-center items-center cursor-pointer transition-all hover:!bg-opacity-25 active:!bg-opacity-30"
          >
            <PlusIcon className="[&>path]:fill-white" />
          </label>
        </>
      )}
    </div>
  );
};
