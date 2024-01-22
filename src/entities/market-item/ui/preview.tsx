import { useEffect, useState } from 'react';
import { useField } from 'effector-forms';
import { umiif } from '../../../features/market-item/images';

type Props = {
  images: File[];
};

export const MarketItemPreview = (props: Props) => {
  return (
    <div className="w-fill">
      <div className="flex flex-col items-center">
        <Preview images={props.images} />
      </div>
    </div>
  );
};

const Preview = ({ images }: { images: File[] }) => {
  const [preview, setPreview] = useState([] as File[]);
  const { value, onChange } = useField(umiif.form.fields.images);

  useEffect(() => {
    const tick = setInterval(() => setPreview(images), 0);
    return () => clearInterval(tick);
  }, [images]);

  for (let i = 0; i < images.length; i++) {
    const reader = new FileReader();
    reader.onload = () => {
      const imgElem = document.getElementById(
        'preview-' + i
      ) as HTMLImageElement;
      imgElem.src = reader.result as string;
    };

    reader.readAsDataURL(images[i]);
  }

  function handleClose(i: number) {
    const files = value.slice(0, i);
    files.push(...value.slice(i + 1));
    onChange(files);
  }

  return (
    <div
      id="preview"
      className="w-80 overflow-hidden flex gap-5 flex-col rounded-lg"
    >
      {preview &&
        preview.map((_, i) => (
          <div key={'preview-' + i} className="relative">
            <img id={'preview-' + i} className="rounded-lg" alt="image" />
            <button
              className="absolute top-3 right-3"
              type="button"
              onClick={() => handleClose(i)}
            >
              x
            </button>
          </div>
        ))}
    </div>
  );
};
