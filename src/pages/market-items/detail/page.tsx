import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { addDefaultSrc } from '../../../services/utils.ts';
import { Button } from '../../../shared/ui/button.tsx';
import { useState } from 'react';
import GalleryModal from '../../../components/GalleryModal';
import { chatService } from '../../../services/ChatService.ts';
import { authService } from '../../../services/AuthService.ts';

const MarketItemDetailPage = () => {
  const params = useParams<'id'>();
  const navigate = useNavigate();

  useGate(model.gate, { id: params.id ?? null, navigate });

  const marketItem = useUnit(model.$marketItemDetail);
  const [showGallery, setShowGallery] = useState<number>(-1);

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
      <div className="flex w-full justify-start gap-[13px] items-center absolute top-0">
        {Array.from(
          {
            length:
              marketItem.images.length >= 4 ? 4 : marketItem.images.length - 1,
          },
          (_, i) => (
            <div
              onClick={() => setShowGallery(i + 1)}
              key={'subimage-' + i}
              className="w-[120px] h-[114px] rounded-md cursor-pointer transition-opacity hover:opacity-95 active:opacity-90"
            >
              <img
                src={marketItem.images[i + 1]}
                onError={addDefaultSrc}
                alt=""
                className="w-full h-full rounded-md object-cover"
              />
              {marketItem.images.length > 5 && i === 3 && (
                <div className="w-[120px] h-[114px] rounded-md absolute top-0 flex justify-center items-center bg-black opacity-70 cursor-pointer transition-opacity hover:opacity-65 active:opacity-60">
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

  async function handleMessage() {
    try {
      await chatService.GetChat(marketItem.id);
    } catch (e) {
      await chatService.CreateChat({
        client_id: authService.GetUserId(),
        market_item_id: marketItem.id,
        name: marketItem.set,
        seller_id: marketItem.seller_id,
      });
    } finally {
      navigate('/chat/');
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="mt-8 mb-9 whitespace-nowrap flex flex-wrap gap-7 justify-center">
        <div className="flex flex-col gap-5 w-[300px] sm:w-[521px]">
          <div className="flex text-[2rem] font-semibold text-darkfiltersbg justify-between items-center">
            <p>{marketItem.set}</p> <p>{marketItem.price}$</p>
          </div>
          <img
            className="w-full h-[200px] sm:h-[415px] object-cover object-center rounded-md bg-silver cursor-pointer transition-opacity hover:opacity-95 active:opacity-90"
            src={'' + marketItem.images.slice(0, 1)}
            onError={addDefaultSrc}
            onClick={() => setShowGallery(0)}
            alt=""
          />
          {subImagesElement}
        </div>
        <div className="w-[250px] sm:w-[577px] align-top inline-block text-xl">
          <p className="text-3xl font-semibold mb-10">{marketItem.set}</p>
          <div className="flex flex-col justify-between h-24 mb-4">
            <p>
              Condition:{' '}
              <span className="text-light dark:text-yellow-100">
                {marketItem.condition}
              </span>
            </p>
            <p>
              Series:{' '}
              <span className="text-light dark:text-yellow-100">
                {marketItem.series}
              </span>
            </p>
            <p>
              Location:{' '}
              <span className="text-light dark:text-yellow-100">
                {marketItem.location}
              </span>
            </p>
          </div>
          <p className="mb-9">
            Set Number:{' '}
            <span
              className="text-light dark:text-yellow-100 underline transition-opacity cursor-pointer hover:opacity-90 active:opacity-80"
              onClick={() => navigate('/wiki/sets/' + marketItem.set_id)}
            >
              {marketItem.set_number}
            </span>
          </p>
          <div className="bg-ghost dark:bg-dark border border-solid border-black rounded-xl whitespace-normal py-3.5 pr-5 pl-6 mb-5 sm:mb-28">
            <p>Set description: {marketItem.description}</p>
          </div>
          <div className="flex flex-col gap-5 sm:flex-row justify-between items-center text-3xl">
            <p>{marketItem.price} $</p>
            <Button className="!w-56" onClick={handleMessage}>
              Message about set
            </Button>
          </div>
        </div>
      </div>
      <div
        onClick={() => navigate('/profile/' + marketItem.seller_id)}
        className="flex mr-14 gap-4 items-center border border-solid border-black rounded-xl pt-7 pr-11 pb-5 pl-6 cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
      >
        <div className="h-16 aspect-square relative rounded-full bg-legocy">
          <img
            className="absolute h-full aspect-square rounded-full object-cover object-center"
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
