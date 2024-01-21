import { useEffect, useState } from 'react';

type Props = {
  images: File[];
};

export const MarketItemPreview = (props: Props) => {
  return (
    <div className="w-fill">
      <div className="flex flex-col">
        <Preview images={props.images} />
      </div>
    </div>
  );
};

const Preview = ({ images }: { images: File[] }) => {
  const [preview, setPreview] = useState([] as File[]);

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

  return (
    <div
      id="preview"
      className="w-96 overflow-hidden bg-neutral-85 flex gap-5 flex-col rounded-lg"
    >
      {preview &&
        preview.map((_, i) => (
          <img
            key={'preview-' + i}
            id={'preview-' + i}
            className="rounded-lg"
            alt="image"
          />
        ))}
    </div>
  );
};
