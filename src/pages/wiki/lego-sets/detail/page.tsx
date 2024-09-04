import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { addDefaultSrc } from '../../../../services/utils.ts';
import GalleryModal from '../../../../components/GalleryModal';
import PieceIcon from '../../../../assets/icons/piece.svg?react';
import clsx from 'clsx';
import { ValuationChart } from '../../../../components/ValuationChart/ValuationChart.tsx';

export const LegoSetDetailPage = () => {
  const params = useParams<'id'>();
  const navigate = useNavigate();

  useGate(model.gate, { id: params.id ?? null, navigate });

  const [showGallery, setShowGallery] = useState<number>(-1);
  const legoSet = useUnit(model.$legoSetDetail);

  const subImagesElement = legoSet.images && legoSet.images.length > 1 && (
    <div className="relative">
      <div className="flex w-full flex-wrap justify-start gap-4 items-center">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={'subimage_container-' + i}
            className="w-[115px] h-[114px] bg-pagesize dark:bg-dark rounded-md"
          ></div>
        ))}
      </div>
      <div className="flex w-full flex-wrap justify-start gap-[13px] items-center absolute top-0">
        {Array.from(
          {
            length: legoSet.images.length > 4 ? 4 : legoSet.images.length - 1,
          },
          (_, i) => (
            <div
              onClick={() => setShowGallery(i + 1)}
              key={'subimage-' + i}
              className="w-[115px] h-[114px] rounded-md cursor-pointer transition-opacity hover:opacity-95 active:opacity-90 shadow-subimages"
            >
              <img
                src={legoSet.images && legoSet.images[i + 1]}
                onError={addDefaultSrc}
                alt=""
                className="w-full h-full rounded-md object-cover"
              />
              {legoSet.images && legoSet.images.length > 5 && i === 3 && (
                <div className="w-full h-full rounded-md absolute bottom-0 flex justify-center items-center bg-black opacity-70 cursor-pointer transition-opacity hover:opacity-65 active:opacity-60">
                  <p className="text-lg text-white">
                    + {legoSet.images.length - 4} photos
                  </p>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-7 justify-center">
      {legoSet.images && (
        <div
          className={clsx('flex flex-col gap-[22px] w-80 sm:w-[508px]', {
            'sm:w-[521px]': legoSet.images.length < 2,
          })}
        >
          <img
            className={`w-full ${
              legoSet.images.length < 2
                ? 'h-[281px] sm:h-[459px]'
                : 'h-[204px] sm:h-[324px]'
            } object-cover object-center rounded-md bg-pagesizehover cursor-pointer transition-opacity hover:opacity-95 active:opacity-90`}
            src={'' + legoSet.images.slice(0, 1)}
            onError={addDefaultSrc}
            onClick={() => setShowGallery(0)}
            alt=""
          />
          {subImagesElement}
        </div>
      )}
      <div className="flex flex-col justify-between w-80 sm:w-[521px] h-[459px]">
        <h1 className="text-celllink text-[2rem] font-semibold dark:text-darkstatebg">
          {legoSet.name}
        </h1>
        <div className="flex flex-col justify-center gap-4">
          <p>Series: {legoSet.series}</p>
          <div className="flex items-center justify-start flex-wrap gap-14 text-celllink dark:text-white">
            <p className="underline underline-offset-4">
              Set number: {legoSet.number}
            </p>
            <div className="flex items-center justify-center gap-1">
              <PieceIcon className="iconfills iconstrokes" />
              <p>{legoSet.pieces} pieces</p>
            </div>
            {legoSet.year && <p>Year of release: {legoSet.year}</p>}
          </div>
        </div>
        <div className="w-80 sm:w-[521px] min-h-[281px]">
          <ValuationChart />
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
