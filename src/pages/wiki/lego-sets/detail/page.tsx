import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { addDefaultSrc } from '../../../../services/utils.ts';
import { setStates } from '../../../../types/MarketItemType.ts';
import { LazySvg } from '../../../../shared/ui/lazy-svg.tsx';
import { Bar, BarChart, LabelList, Tooltip, XAxis } from 'recharts';
import GalleryModal from '../../../../components/GalleryModal';
import NoneIcon from '../../../../assets/icons/none.svg?react';
import PieceIcon from '../../../../assets/icons/piece.svg?react';
import clsx from 'clsx';

export const LegoSetDetailPage = () => {
  const params = useParams<'id'>();
  const navigate = useNavigate();

  useGate(model.gate, { id: params.id ?? null, navigate });

  const [showGallery, setShowGallery] = useState<number>(-1);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const legoSet = useUnit(model.$legoSetDetail);
  const chartData = useUnit(model.$chartData);

  let barData = { x: 0, y: 0, name: '' };

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

  const StateTooltip = ({ active, payload }: any) => {
    const tooltip = document.getElementsByClassName(
      'recharts-tooltip-wrapper'
    )[0] as HTMLElement;

    useEffect(() => {
      if (tooltip) {
        tooltip.style.left = `${barData.x}px`;
        tooltip.style.top = `${barData.y - 50}px`;
      }
    }, [barData]);

    if (active && payload && payload.length) {
      return (
        <div className="absolute flex h-4 bg-legocy items-center px-2 rounded-2xl text-[8px] dark:text-black whitespace-nowrap">
          {setStates[barData.name as keyof typeof setStates]}
          <div className="invisible absolute h-2 w-2 top-3 left-1/2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
        </div>
      );
    }
  };

  window.addEventListener(
    'resize',
    function () {
      setWindowWidth(window.innerWidth);
    },
    true
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
          {chartData.length > 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-around bg-pagesize dark:bg-dark rounded-md text-tab dark:text-white">
              <p className="w-full indent-6 text-lg text-confirmmodal text-start dark:text-white">
                Our Price Evaluation For This Set
              </p>
              <BarChart
                width={windowWidth > 640 ? 500 : 250}
                height={220}
                data={chartData}
                margin={{
                  top: 30,
                  right:
                    (windowWidth > 640 ? 500 : 250) -
                    chartData.length * (windowWidth > 640 ? 84 : 41),
                }}
                className="iconfills textfills"
              >
                <Bar
                  dataKey="value"
                  fill="#2F2F2F"
                  radius={3}
                  barSize={windowWidth > 640 ? 57 : 28}
                  onMouseOver={(data) => (barData = data)}
                >
                  <LabelList
                    dataKey="name"
                    position="top"
                    content={({ value, x, y, width }: any) => (
                      <LazySvg
                        name={value}
                        width={28}
                        height={28}
                        x={width > 50 ? x + width / 4 : x}
                        y={y - 30}
                      />
                    )}
                  />
                </Bar>
                <XAxis
                  interval={0}
                  dataKey="display"
                  stroke="#262323"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip cursor={false} content={<StateTooltip />} />
              </BarChart>
            </div>
          ) : (
            <div className="flex w-full text-wrap p-3 border border-solid border-black dark:border-white dark:bg-white dark:bg-opacity-20 rounded-md items-center justify-around gap-2 text-[#2E2626] dark:text-white">
              <NoneIcon className="w-10 iconfills" />
              We currently don&apos;t have enough information to give you our
              price evaluation for this set . We suggest checking out other
              similar listings to determine an appropriate price.
            </div>
          )}
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
