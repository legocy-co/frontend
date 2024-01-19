type Props = {
  image: string | null;
};

export const MarketItemPreview = (props: Props) => {
  console.log(props.image);
  return (
    <div className="w-fill">
      <div className="flex flex-col">
        <p>Preview</p>
        <Preview image={props.image} />
      </div>
    </div>
  );
};

const Preview = ({ image }: { image: string | null }) => {
  return (
    <div className="w-[375px] overflow-hidden bg-neutral-85 flex flex-col rounded-lg">
      {image && (
        <img
          className="w-full h-full object-contain rounded-lg"
          src={image}
          alt="image"
        />
      )}
    </div>
  );
};
