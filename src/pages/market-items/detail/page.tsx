import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { addDefaultSrc } from '../../../services/utils.ts';
import { useState } from 'react';
import GalleryModal from '../../../components/GalleryModal';
import { chatService } from '../../../services/ChatService.ts';
import { authService } from '../../../services/AuthService.ts';
import StarIcon from '../../../assets/icons/star.svg?react';
import LocationIcon from '../../../assets/icons/location.svg?react';
import PieceIcon from '../../../assets/icons/piece.svg?react';
import { Button } from '../../../shared/ui/button.tsx';
import { LazySvg } from '../../../shared/ui/lazy-svg.tsx';
import { up } from '../../UserProfilePage/index.tsx';
import { Bar, BarChart, LabelList, XAxis } from 'recharts';

const MarketItemDetailPage = () => {
  const params = useParams<'id'>();
  const navigate = useNavigate();

  useGate(model.gate, { id: params.id ?? null, navigate });

  const marketItem = useUnit(model.$marketItemDetail);
  const [showGallery, setShowGallery] = useState<number>(-1);

  const charData = [
    {
      name: 'BRAND_NEW',
      value: 54,
      display: '54$',
    },
    {
      name: 'BOX_OPENED',
      value: 42,
    },
    {
      name: 'BAGS_OPENED',
      value: 34,
    },
    {
      name: 'BUILT_WITH_BOX',
      value: 24,
    },
    {
      name: 'BUILT_WITHOUT_BOX',
      value: 20,
    },
    {
      name: 'BUILT_PIECES_LOST',
      value: 18,
    },
  ];

  const subImagesElement = (
    <div className="relative">
      <div className="flex w-full flex-wrap justify-start gap-[13px] items-center">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={'subimage_container-' + i}
            className="w-[120px] h-[114px] bg-pagesize rounded-md"
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

  const renderLabel = ({ value, x, y }: any) => {
    return (
      <LazySvg name={value} width={28} height={28} x={x + 20} y={y - 30} />
    );
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

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="mt-8 mb-9 whitespace-nowrap flex flex-wrap gap-7 justify-center">
        <div className="flex flex-col gap-8 w-[300px] sm:w-[521px]">
          <div className="flex text-[2rem] font-semibold text-celllink justify-between items-center">
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
        <div className="flex flex-col gap-5 justify-between w-[300px] sm:w-[521px]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center flex-wrap gap-3 justify-between">
              <div className="flex items-center justify-around gap-4 px-4 min-w-[336px] h-11 rounded-md bg-pagesize text-avatarbg">
                <div
                  onClick={() => navigate('/profile/' + marketItem.sellerID)}
                  className="flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-95 active:opacity-90"
                >
                  <img
                    src={marketItem.sellerImage}
                    alt=""
                    onError={addDefaultSrc}
                    className="w-7 h-7 rounded-full object-cover object-center bg-avatarbg"
                  />
                  <p>{marketItem.sellerUsername}</p>
                </div>
                <div
                  className={
                    marketItem.totalReviews
                      ? 'flex items-center justify-center gap-1'
                      : 'hidden'
                  }
                >
                  <p className="text-[#0D0C0C]">{marketItem.avgRating}</p>
                  <StarIcon className="w-[18px] fillsblack" />
                </div>
                <p
                  onClick={handleReviews}
                  className={'underline cursor-pointer'}
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
            <div className="w-full h-[123px] py-3.5 pr-5 pl-6 overflow-y-scroll text-wrap text-cellink bg-pagesize border border-solid border-black rounded-md">
              {marketItem.description}
            </div>
            <div className="flex flex-wrap items-center justify-start gap-3 text-tab">
              <div className="flex items-center justify-center gap-1">
                <LocationIcon />
                <p>Location: {marketItem.location}</p>
              </div>
              <div className="h-[30px] flex items-center px-3 text-darkstatefocus gap-2 bg-step rounded-[19px] dark:!bg-dark dark:text-darkstate text-xs">
                <LazySvg name={marketItem.stateIcon} className="w-7" />
                <p>{marketItem.state}</p>
              </div>
            </div>
            <div className="flex items-center justify-between flex-wrap text-celllink">
              <p>Series: {marketItem.series}</p>
              <p
                onClick={() => navigate('/wiki/sets/' + marketItem.setID)}
                className="underline cursor-pointer"
              >
                Set number: {marketItem.setNumber}
              </p>
              <div className="flex items-center justify-center gap-1">
                <PieceIcon />
                <p>{marketItem.nPieces} pieces</p>
              </div>
            </div>
          </div>
          <div className="w-[300px] sm:w-[521px] h-[281px] flex flex-col items-center justify-around bg-pagesize rounded-md">
            <p className="w-full indent-6 text-lg text-confirmmodal text-start">
              Our Price Evaluation For This Set
            </p>
            <BarChart width={500} height={220} data={charData}>
              <Bar dataKey="value" fill="#262323" radius={6}>
                <LabelList
                  dataKey="name"
                  position="top"
                  content={renderLabel}
                />
              </Bar>
              <XAxis dataKey="display" axisLine={false} tickLine={false} />
            </BarChart>
          </div>
        </div>
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
