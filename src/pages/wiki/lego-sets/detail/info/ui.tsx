import { useNavigate, useParams } from 'react-router-dom';
import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { useState } from 'react';
import { addDefaultSrc } from '../../../../../services/utils.ts';
import GalleryModal from '../../../../../components/GalleryModal';

export const LegoSetDetailInfo = () => {
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
        className="w-44 h-40 object-cover object-center rounded-md bg-pagesizehover cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
      ></img>
    ));

  return (
    <>
      <div className="mt-8 mb-9 whitespace-nowrap grid xl:grid-cols-2 gap-7">
        {legoSet.images && (
          <div className="inline-block w-[300px] sm:w-[595px]">
            <img
              className="w-full h-[200px] sm:h-[470px] object-cover object-center rounded-md bg-pagesizehover cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
              src={'' + legoSet.images?.slice(0, 1)}
              onError={addDefaultSrc}
              onClick={() => setShowGallery(0)}
              alt=""
            />
            <div className="hidden xl:flex justify-around w-full">
              {subImagesElement}
            </div>
          </div>
        )}
        <div className="w-[250px] sm:w-[577px] align-top inline-block text-xl">
          <p className="text-3xl font-semibold mb-10">{legoSet.name}</p>
          <div className="flex flex-col justify-between h-24 mb-4">
            <p>
              Pieces:{' '}
              <span className="text-[#5F5F5F] dark:text-yellow-100">
                {legoSet.pieces}
              </span>
            </p>
            <p>
              Series:{' '}
              <span className="text-[#5F5F5F] dark:text-yellow-100">
                {legoSet.series}
              </span>
            </p>
          </div>
          <p className="mb-9">
            Set Number:{' '}
            <span className="text-[#5F5F5F] dark:text-yellow-100">
              {legoSet.number}
            </span>
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
    </>
  );
};
