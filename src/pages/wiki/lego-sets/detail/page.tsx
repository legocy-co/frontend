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

//TODO: redesign detail page
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
      <div className="flex w-full flex-wrap justify-start gap-[13px] items-center">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={'subimage_container-' + i}
            className="w-[120px] h-[114px] bg-pagesize dark:bg-dark rounded-md"
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
              className="w-[120px] h-[114px] rounded-md cursor-pointer transition-opacity hover:opacity-95 active:opacity-90 shadow-subimages"
            >
              <img
                src={legoSet.images && legoSet.images[i + 1]}
                onError={addDefaultSrc}
                alt=""
                className="w-full h-full rounded-md object-cover"
              />
              {legoSet.images && legoSet.images.length > 5 && i === 3 && (
                <div className="w-[120px] h-[114px] rounded-md absolute bottom-0 flex justify-center items-center bg-black opacity-70 cursor-pointer transition-opacity hover:opacity-65 active:opacity-60">
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
        <div className="flex flex-col gap-8 w-[300px] sm:w-[521px]">
          <img
            className="w-full h-[200px] sm:h-[415px] object-cover object-center rounded-md bg-pagesizehover cursor-pointer transition-opacity hover:opacity-95 active:opacity-90"
            src={'' + legoSet.images.slice(0, 1)}
            onError={addDefaultSrc}
            onClick={() => setShowGallery(0)}
            alt=""
          />
          {subImagesElement}
        </div>
      )}
      <div className="flex flex-col gap-5 justify-start w-[300px] sm:w-[521px]">
        <div className="flex flex-col gap-5">
          <h1 className="text-celllink text-[2rem] font-semibold dark:text-darkstatebg">{legoSet.name}</h1>
          <div className="flex items-center justify-between flex-wrap gap-2 text-celllink dark:text-white">
            <p>Series: {legoSet.series}</p>
            <p className="underline underline-offset-4">
              Set number: {legoSet.number}
            </p>
            <div className="flex items-center justify-center gap-1">
              <PieceIcon className="iconfills iconstrokes" />
              <p>{legoSet.pieces} pieces</p>
            </div>
          </div>
        </div>
        {chartData.length > 0 ? (
          <div className="w-[300px] sm:w-[521px] min-h-[281px] flex flex-col items-center justify-around bg-pagesize dark:bg-dark rounded-md text-tab dark:text-white">
            <p className="w-full indent-6 text-lg text-confirmmodal text-start dark:text-white">
              Our Price Evaluation For This Set
            </p>
            <BarChart
              width={windowWidth > 600 ? 500 : 300}
              height={220}
              data={chartData}
              margin={{
                top: 30,
                right: 500 - chartData.length * 83,
              }}
              className="iconfills textfills"
            >
              <Bar
                dataKey="value"
                fill="#2F2F2F"
                radius={3}
                barSize={57}
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
                      x={width > 50 ? x + width / 4 : x + width / 6}
                      y={y - 30}
                    />
                  )}
                />
              </Bar>
              <XAxis
                dataKey="display"
                stroke="#262323"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip cursor={false} content={<StateTooltip />} />
            </BarChart>
          </div>
        ) : (
          <div className="flex w-[300px] sm:w-[521px] text-wrap p-3 border border-solid border-black dark:border-white dark:bg-white dark:bg-opacity-20 rounded-md items-center justify-around gap-2 text-[#2E2626] dark:text-white">
            <NoneIcon className="w-10 iconfills" />
            We currently don&apos;t have enough information to give you our
            price evaluation for this set . We suggest checking out other
            similar listings to determine an appropriate price.
          </div>
        )}
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
