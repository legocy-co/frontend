type Props = {
  images: File[];
  handleDelete: (file: File) => void;
};

export const MarketItemPreview = ({ images, handleDelete }: Props) => {
  return (
    <div className="w-[343px] overflow-hidden flex gap-5 flex-col rounded-lg items-center">
      {images &&
        images.map((img, i) => (
          <div key={URL.createObjectURL(img)} className="relative">
            <img
              src={URL.createObjectURL(img)}
              className="rounded-lg"
              alt="image"
              id={'preview-' + i}
            />
            <button
              className="absolute top-3 right-3"
              type="button"
              onClick={() => handleDelete(img)}
            >
              x
            </button>
          </div>
        ))}
    </div>
  );
};
