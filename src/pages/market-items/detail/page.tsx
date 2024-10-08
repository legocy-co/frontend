import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { addDefaultSrc, setTwoDecimals } from '../../../services/utils.ts';
import { useState } from 'react';
import GalleryModal from '../../../components/GalleryModal';
import { chatService } from '../../../services/ChatService.ts';
import { authService } from '../../../services/AuthService.ts';
import StarIcon from '../../../assets/icons/star.svg?react';
import LocationIcon from '../../../assets/icons/location.svg?react';
import NoneIcon from '../../../assets/icons/none.svg?react';
import PieceIcon from '../../../assets/icons/piece.svg?react';
import { Button } from '../../../shared/ui/button.tsx';
import { LazySvg } from '../../../shared/ui/lazy-svg.tsx';
import { upp } from '../../user-profile-pages/index.tsx';
import MarketItemCell from '../../../components/MarketItemCell';
import { ValuationChart } from '../../../components/ValuationChart/ValuationChart.tsx';

const MarketItemDetailPage = () => {
  const params = useParams<'id'>();
  const navigate = useNavigate();

  useGate(model.gate, { id: params.id ?? null, navigate });

  const [showGallery, setShowGallery] = useState<number>(-1);

  const marketItem = useUnit(model.$marketItemDetail);
  const recommendations = useUnit(model.$recommendations);

  const isActive = marketItem.status === 'ACTIVE';
  const isSold = marketItem.status === 'SOLD';

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
              marketItem.images.length > 4 ? 4 : marketItem.images.length - 1,
          },
          (_, i) => (
            <div
              onClick={() => setShowGallery(i + 1)}
              key={'subimage-' + i}
              className={`w-[120px] h-[114px] rounded-md cursor-pointer transition-opacity hover:opacity-95 active:opacity-90 shadow-subimages ${
                isSold && 'contrast-50'
              }`}
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
        status={marketItem.status}
        id={marketItem.id}
        location={marketItem.location}
        stateIcon={marketItem.condition_icon}
        state={marketItem.condition}
        images={marketItem.images}
        price={marketItem.price}
        series={marketItem.series}
        set={marketItem.set}
        sellerID={marketItem.seller_id}
        isLiked={marketItem.is_liked}
      />
    </div>
  ));

  function handleReviews() {
    upp.sectionSelected('reviews');
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

  return (
    <div className="w-full h-full flex flex-col items-center">
      {!isActive && (
        <div className="w-80 sm:w-[584px] text-black h-12 bg-statuswarn flex justify-center items-center gap-5 bg-opacity-35 rounded-md border border-solid border-black dark:bg-white dark:bg-opacity-85 dark:border-statevaluationchart">
          <NoneIcon />
          <p>
            This listing{' '}
            {isSold ? 'has already been sold' : 'is still being validated'}
          </p>
        </div>
      )}
      <div className="mt-8 mb-9 flex flex-wrap gap-7 justify-center">
        <div className="flex flex-col gap-8 w-80 sm:w-[521px]">
          <div className="flex text-[2rem] gap-2 font-semibold text-celllink justify-between items-center dark:text-white">
            <p>{marketItem.set}</p> <p>{marketItem.price}$</p>
          </div>
          <img
            className={`w-full h-[259px] sm:h-[415px] object-cover object-center rounded-md bg-pagesizehover cursor-pointer transition-opacity hover:opacity-95 active:opacity-90 ${
              isSold && 'contrast-50'
            }`}
            src={'' + marketItem.images.slice(0, 1)}
            onError={addDefaultSrc}
            onClick={() => setShowGallery(0)}
            alt=""
          />
          {subImagesElement}
        </div>
        <div className="flex flex-col gap-5 justify-start w-80 sm:w-[521px]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center flex-wrap gap-3 justify-between">
              <div className="flex items-center justify-around gap-4 px-4 w-80 sm:w-[336px] h-11 rounded-md bg-pagesize dark:bg-dark text-avatarbg">
                <div
                  onClick={() => navigate('/profile/' + marketItem.sellerID)}
                  className="flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-95 active:opacity-90"
                >
                  {marketItem.sellerImage && (
                    <img
                      src={marketItem.sellerImage}
                      alt=""
                      onError={addDefaultSrc}
                      className="w-7 h-7 rounded-full object-cover object-center bg-avatarbg dark:bg-description"
                    />
                  )}
                  <p className="overflow-ellipsis overflow-hidden max-w-44 dark:text-description">
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
                    {marketItem.avgRating !== undefined &&
                      setTwoDecimals(marketItem.avgRating)}
                  </p>
                  <StarIcon className="w-[18px] iconfills" />
                </div>
                <p
                  onClick={handleReviews}
                  className={'underline cursor-pointer dark:text-description'}
                >
                  {marketItem.totalReviews ? marketItem.totalReviews : 0}{' '}
                  {'review' + (marketItem.totalReviews! !== 1 ? 's' : '')}
                </p>
              </div>
              <Button
                onClick={handleMessage}
                className="!w-[162px] !h-11 !text-lg !text-celllink disabled:!text-white"
                disabled={
                  !isActive || marketItem.sellerID === authService.GetUserId()
                }
              >
                Contact seller
              </Button>
            </div>
            <div className="w-full h-[173px] py-3.5 pr-5 pl-6 overflow-y-scroll text-wrap text-cellink bg-pagesize border border-solid border-black dark:border-white dark:bg-dark dark:text-white rounded-md">
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
            <div className="flex items-center justify-between flex-wrap gap-2 text-celllink dark:text-white">
              <p>Series: {marketItem.series}</p>
              <p
                onClick={() => navigate('/wiki/sets/' + marketItem.setID)}
                className="underline underline-offset-4 cursor-pointer"
              >
                Set number: {marketItem.setNumber}
              </p>
              <div className="flex items-center justify-center gap-1">
                <PieceIcon className="iconfills iconstrokes" />
                <p>{marketItem.nPieces} pieces</p>
              </div>
            </div>
          </div>
          <ValuationChart />
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
