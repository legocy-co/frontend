import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { addDefaultSrc } from '../../../services/utils.ts';
import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import HeartIcon from '../../../assets/icons/heart.svg';
import { Button } from '../../../shared/ui/button.tsx';
import { useState } from 'react';
import GalleryModal from '../../../components/GalleryModal';

const MarketItemDetailPage = () => {
  const params = useParams<'id'>();
  const navigate = useNavigate();

  const marketItem = useUnit(model.$marketItemDetail);
  const [showGallery, setShowGallery] = useState<number>(-1);

  const subImagesElement = marketItem.images
    .slice(1, 4)
    .map((image, i) => (
      <img
        key={image}
        src={image}
        onError={addDefaultSrc}
        onClick={() => setShowGallery(i + 1)}
        alt=""
        className="w-44 h-40 object-cover object-center rounded-md bg-silver cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
      ></img>
    ));

  useGate(model.gate, { id: params.id ?? null, navigate });
  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading isMarketItemDetail to="/catalog" />
      <div className="mt-8 mb-9 whitespace-nowrap grid xl:grid-cols-2 gap-7">
        <div className="inline-block w-[595px]">
          <div className="relative mb-7">
            <img
              className="w-full h-[470px] object-cover object-center rounded-md bg-silver cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
              src={'' + marketItem.images.slice(0, 1)}
              onError={addDefaultSrc}
              onClick={() => setShowGallery(0)}
              alt=""
            />
            <img
              className="absolute top-4 left-5 cursor-pointer transition-all hover:brightness-95 active:brightness-90"
              src={HeartIcon}
              alt=""
            />
          </div>
          <div className="hidden xl:flex justify-around w-full">
            {subImagesElement}
          </div>
        </div>
        <div className="w-[577px] align-top inline-block text-xl">
          <p className="text-3xl font-semibold mb-10">{marketItem.set}</p>
          <div className="flex flex-col justify-between h-24 mb-4">
            <p>
              Condition:{' '}
              <span className="text-light">{marketItem.condition}</span>
            </p>
            <p>
              Series: <span className="text-light">{marketItem.series}</span>
            </p>
            <p>
              Location:{' '}
              <span className="text-light">{marketItem.location}</span>
            </p>
          </div>
          <p className="mb-9">
            Set Number:{' '}
            <span className="text-light">{marketItem.set_number}</span>
          </p>
          <div className="bg-ghost border border-solid border-black rounded-xl whitespace-normal py-3.5 pr-5 pl-6 mb-28">
            <p>Set description: {marketItem.description}</p>
          </div>
          <div className="flex justify-between items-center text-3xl">
            <p>{marketItem.price} $</p>
            <Button>Message about set</Button>
          </div>
        </div>
      </div>
      <div
        onClick={() => navigate('/profile/' + marketItem.seller_id)}
        className="flex gap-4 items-center border border-solid border-black rounded-xl pt-7 pr-11 pb-5 pl-6 cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
      >
        <div className="h-16 aspect-square relative rounded-full bg-legocy">
          <img
            className="absolute h-full rounded-full object-cover object-center"
            onError={addDefaultSrc}
            src={marketItem.seller_image}
            alt=""
          />
        </div>
        <p className="text-2xl">{marketItem.seller_username}</p>
      </div>
      {showGallery > -1 && (
        <GalleryModal
          list={marketItem.images}
          i={showGallery}
          onClose={() => setShowGallery(-1)}
        />
      )}
    </div>
  );
};

export default MarketItemDetailPage;
