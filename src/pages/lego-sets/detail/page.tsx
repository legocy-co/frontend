import { useNavigate, useParams } from 'react-router-dom';
import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { addDefaultSrc } from '../../../services/utils.ts';
import HeartIcon from '../../../assets/icons/heart.svg';
import GalleryModal from '../../../components/GalleryModal';
import { useState } from 'react';

export const LegoSetDetailPage = () => {
  const params = useParams<'id'>();
  const navigate = useNavigate();

  useGate(model.gate, { id: params.id ?? null, navigate });

  const legoSet = useUnit(model.$legoSetDetail);
  const [showGallery, setShowGallery] = useState<number>(-1);

  const subImagesElement = legoSet.images
    ?.slice(1, 4)
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

  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading isMarketItemDetail to="/wiki/sets/" />
      <div className="mt-8 mb-9 whitespace-nowrap grid xl:grid-cols-2 gap-7">
        <div className="inline-block w-[300px] sm:w-[595px]">
          <div className="relative mb-7">
            <img
              className="w-full h-[200px] sm:h-[470px] object-cover object-center rounded-md bg-silver cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
              src={'' + legoSet.images?.slice(0, 1)}
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
        <div className="w-[250px] sm:w-[577px] align-top inline-block text-xl">
          <p className="text-3xl font-semibold mb-10">{legoSet.name}</p>
          <div className="flex flex-col justify-between h-24 mb-4">
            <p>
              Pieces: <span className="text-light">{legoSet.pieces}</span>
            </p>
            <p>
              Series: <span className="text-light">{legoSet.series}</span>
            </p>
          </div>
          <p className="mb-9">
            Set Number: <span className="text-light">{legoSet.number}</span>
          </p>
        </div>
      </div>
      {showGallery > -1 && legoSet.images && (
        <GalleryModal
          list={legoSet.images}
          i={showGallery}
          onClose={() => setShowGallery(-1)}
        />
      )}
    </div>
  );
};
