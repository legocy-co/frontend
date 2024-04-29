import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { addDefaultSrc } from '../../../services/utils.ts';
import { useEffect, useState } from 'react';
import GalleryModal from '../../../components/GalleryModal';
import { chatService } from '../../../services/ChatService.ts';
import { authService } from '../../../services/AuthService.ts';
import StarIcon from '../../../assets/icons/star.svg?react';
import LocationIcon from '../../../assets/icons/location.svg?react';
import NoneIcon from '../../../assets/icons/none.svg?react';
import PieceIcon from '../../../assets/icons/piece.svg?react';
import { Button } from '../../../shared/ui/button.tsx';
import { LazySvg } from '../../../shared/ui/lazy-svg.tsx';
import { up } from '../../UserProfilePage/index.tsx';
import { Bar, BarChart, LabelList, Tooltip, XAxis } from 'recharts';
import { setStates } from '../../../types/MarketItemType.ts';
import MarketItemCell from '../../../components/MarketItemCell';

const MarketItemDetailPage = () => {
  const params = useParams<'id'>();
  const navigate = useNavigate();

  useGate(model.gate, { id: params.id ?? null, navigate });

  const [showGallery, setShowGallery] = useState<number>(-1);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const marketItem = useUnit(model.$marketItemDetail);
  const chartData = useUnit(model.$chartData);
  const recommendations = useUnit(model.$recommendations);

  // let prevents re-render component
  let barGraphData = { x: 0, y: 0, name: '' };

  const subImagesElement = (
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
            length:
              marketItem.images.length >= 4 ? 4 : marketItem.images.length - 1,
          },
          (_, i) => (
            <div
              onClick={() => setShowGallery(i + 1)}
              key={'subimage-' + i}
              className="w-[120px] h-[114px] rounded-md cursor-pointer transition-opacity hover:opacity-95 active:opacity-90 shadow-subimages"
            >
              <img
                src={marketItem.images[i + 1]}
                onError={addDefaultSrc}
                alt=""
                className="w-full h-full rounded-md object-cover"
              />
              {marketItem.images.length > 5 && i === 3 && (
                <div className="w-[120px] h-[114px] rounded-md absolute bottom-0 flex justify-center items-center bg-black opacity-70 cursor-pointer transition-opacity hover:opacity-65 active:opacity-60">
                  <p className="text-lg text-white">
                    + {marketItem.images.length - 4} photos
                  </p>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );

  const recommendationsElement = recommendations.map((marketItem) => (
    <div id={'cell-' + marketItem.id} key={'cell-' + marketItem.id}>
      <MarketItemCell
        id={marketItem.id}
        location={marketItem.location}
        condition_icon={marketItem.condition_icon}
        condition={marketItem.condition}
        images={marketItem.images}
        price={marketItem.price}
        series={marketItem.series}
        set={marketItem.set}
        seller_id={marketItem.seller_id}
        is_liked={marketItem.is_liked}
      />
    </div>
  ));

  const StateTooltip = ({ active, payload }: any) => {
    const tooltip = document.getElementsByClassName(
      'recharts-tooltip-wrapper'
    )[0] as HTMLElement;

    useEffect(() => {
      if (tooltip) {
        tooltip.style.left = `${barGraphData.x}px`;
        tooltip.style.top = `${barGraphData.y - 50}px`;
      }
    }, [barGraphData]);

    if (active && payload && payload.length) {
      return (
        <div className="absolute flex h-4 bg-legocy items-center px-2 rounded-2xl text-[8px] dark:text-black">
          {setStates[barGraphData.name as keyof typeof setStates]}
          <div className="invisible absolute h-2 w-2 top-3 left-1/2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
        </div>
      );
    }
  };

  function handleReviews() {
    up.sectionSelected('reviews');
    navigate('/profile/' + marketItem.sellerID);
  }

  async function handleMessage() {
    try {
      await chatService.GetChat(marketItem.id);
    } catch (e) {
      await chatService.CreateChat({
        client_id: authService.GetUserId(),
        market_item_id: marketItem.id,
        name: marketItem.set,
        seller_id: marketItem.sellerID,
      });
    } finally {
      navigate('/chat/');
    }
  }

  window.addEventListener(
    'resize',
    function () {
      setWindowWidth(window.innerWidth);
    },
    true
  );

  // TODO: stroke chart textpath
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="mt-8 mb-9 whitespace-nowrap flex flex-wrap gap-7 justify-center">
        <div className="flex flex-col gap-8 w-[300px] sm:w-[521px]">
          <div className="flex text-[2rem] gap-2 font-semibold text-celllink justify-between items-center dark:text-white">
            <p>{marketItem.set}</p> <p>{marketItem.price}$</p>
          </div>
          <img
            className="w-full h-[200px] sm:h-[415px] object-cover object-center rounded-md bg-pagesizehover cursor-pointer transition-opacity hover:opacity-95 active:opacity-90"
            src={'' + marketItem.images.slice(0, 1)}
            onError={addDefaultSrc}
            onClick={() => setShowGallery(0)}
            alt=""
          />
          {subImagesElement}
        </div>
        <div className="flex flex-col gap-5 justify-start w-[300px] sm:w-[521px]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center flex-wrap gap-3 justify-between">
              <div className="flex items-center justify-around gap-4 px-4 w-[300px] sm:w-[336px] h-11 rounded-md bg-pagesize dark:bg-dark text-avatarbg">
                <div
                  onClick={() => navigate('/profile/' + marketItem.sellerID)}
                  className="flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-95 active:opacity-90"
                >
                  <img
                    src={marketItem.sellerImage}
                    alt=""
                    onError={addDefaultSrc}
                    className="w-7 h-7 rounded-full object-cover object-center bg-avatarbg dark:bg-avatarbgdark"
                  />
                  <p className="overflow-ellipsis overflow-hidden max-w-44 dark:text-avatarbgdark">
                    {marketItem.sellerUsername}
                  </p>
                </div>
                <div
                  className={
                    marketItem.totalReviews
                      ? 'flex items-center justify-center gap-1'
                      : 'hidden'
                  }
                >
                  <p className="text-[#0D0C0C] dark:text-white">
                    {marketItem.avgRating}
                  </p>
                  <StarIcon className="w-[18px] fillsblack iconfills" />
                </div>
                <p
                  onClick={handleReviews}
                  className={'underline cursor-pointer dark:text-avatarbgdark'}
                >
                  {marketItem.totalReviews ? marketItem.totalReviews : 0}{' '}
                  {'review' + (marketItem.totalReviews! !== 1 ? 's' : '')}
                </p>
              </div>
              <Button
                onClick={handleMessage}
                className="!w-[162px] !h-11 !text-lg !text-celllink"
              >
                Contact seller
              </Button>
            </div>
            <div className="w-full h-[123px] py-3.5 pr-5 pl-6 overflow-y-scroll text-wrap text-cellink bg-pagesize border border-solid border-black dark:border-white dark:bg-dark dark:text-white rounded-md">
              {marketItem.description}
            </div>
            <div className="flex flex-wrap items-center justify-start gap-3 text-tab dark:text-white">
              <div className="flex items-center justify-center gap-1">
                <LocationIcon className="iconfills" />
                <p>Location: {marketItem.location}</p>
              </div>
              <div className="h-[30px] flex items-center px-3 text-darkstatefocus gap-2 bg-step rounded-[19px] dark:!bg-darkstatebg dark:text-black text-xs">
                <LazySvg name={marketItem.stateIcon} className="w-7" />
                <p>{marketItem.state}</p>
              </div>
            </div>
            <div className="flex items-center justify-between flex-wrap text-celllink dark:text-white">
              <p>Series: {marketItem.series}</p>
              <p
                onClick={() => navigate('/wiki/sets/' + marketItem.setID)}
                className="underline cursor-pointer"
              >
                Set number: {marketItem.setNumber}
              </p>
              <div className="flex items-center justify-center gap-1">
                <PieceIcon className="iconfills iconstrokes" />
                <p>{marketItem.nPieces} pieces</p>
              </div>
            </div>
          </div>
          {chartData.length > 0 ? (
            <div className="w-[300px] sm:w-[521px] min-h-[281px] mt-[50px] flex flex-col items-center justify-around bg-pagesize dark:bg-dark rounded-md text-tab dark:text-white">
              <p className="w-full indent-6 text-lg text-confirmmodal text-start dark:text-white">
                Our Price Evaluation For This Set
              </p>
              <BarChart
                width={windowWidth > 600 ? 500 : 300}
                height={220}
                data={chartData}
                margin={{ top: 20 }}
                className="iconfills textfills"
              >
                <Bar
                  dataKey="value"
                  fill="#2F2F2F"
                  radius={6}
                  onMouseOver={(data) => (barGraphData = data)}
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
            <div className="flex w-[300px] sm:w-[521px] text-wrap p-3 border border-solid border-black dark:border-white dark:bg-white dark:bg-opacity-20 rounded-md items-center justify-around gap-2  text-[#2E2626] dark:text-white">
              <NoneIcon className="w-10 iconfills" />
              We currently don&apos;t have enough information on the market of
              this set to provide a recommendation. We suggest checking out
              other similar listings to determine an appropriate price.
            </div>
          )}
        </div>
      </div>
      {recommendations.length > 0 && (
        <p className="mt-24 text-[2rem] font-semibold text-celllink dark:text-white">
          You might like...
        </p>
      )}
      <div className="w-full mt-8 flex pb-3 items-center justify-start gap-5 overflow-x-scroll">
        {recommendationsElement}
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
