import { useEffect, useState } from 'react';

type Props = {
  images: string[];
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

const Preview = ({ images }: { images: string[] }) => {
  const [preview, setPreview] = useState([] as string[]);

  useEffect(() => {
    const tick = setInterval(() => setPreview(images), 0);
    return () => clearInterval(tick);
  }, [images]);

  return (
    <div
      id="preview"
      className="w-96 overflow-hidden bg-neutral-85 flex gap-5 flex-col rounded-lg"
    >
      {preview &&
        preview.map((img) => (
          <img key={img} className="rounded-lg" src={img} alt="image" />
        ))}
    </div>
  );
};
