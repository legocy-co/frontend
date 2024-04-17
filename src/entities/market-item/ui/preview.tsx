import CloseIcon from '../../../assets/icons/close.svg?react';
import clsx from 'clsx';

type Props = {
  images: File[];
  handleDelete: (file: File) => void;
};

export const MarketItemPreview = ({ images, handleDelete }: Props) => {
  // const [items] = useState(Array.from({ length: images.length }, (_, i) => i));

  return (
    <div className="flex max-w-[675px] flex-wrap gap-2 justify-center items-center">
      {images &&
        images.map((img, i) => (
          <div key={URL.createObjectURL(img)} className="relative">
            {!i && <p className="font-normal text-xs">Thumbnail</p>}
            <img
              src={URL.createObjectURL(img)}
              className={clsx(
                'rounded-lg w-[127px] h-[92px] object-cover object-center',
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
