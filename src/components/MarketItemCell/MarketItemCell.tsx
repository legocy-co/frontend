import './MarketItemCell.scss';
import { addDefaultSrc } from '../../services/utils.ts';
import { useNavigate } from 'react-router-dom';
import HeartIcon from '../../assets/icons/heart.svg?react';
import { useState } from 'react';
import { authService } from '../../services/AuthService.ts';
import { marketItemService } from '../../services/MarketItemService.ts';
import ConfirmationModal from '../ConfirmationModal';
import { upp } from '../../pages/user-profile-pages';
import PencilIcon from '../../assets/icons/pencil.svg';
import SliderIcon from '../../assets/icons/slider-back.svg?react';
import LocationIcon from '../../assets/icons/location.svg?react';
import { LazySvg } from '../../shared/ui/lazy-svg.tsx';
import clsx from 'clsx';

interface MarketItemCellProps {
  id: number;
  condition_icon: string;
  condition: string;
  images: string[];
  location: string;
  price: number;
  series: string;
  set: string;
  seller_id: number;
  is_liked: boolean;
}

const MarketItemCell = (props: MarketItemCellProps) => {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(props.is_liked);
  const [imageSrc, setImageSrc] = useState(props.images[0]);
  const [showDelete, setShowDelete] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isPersonal =
    authService.IsAuthorized() && authService.GetUserId() === props.seller_id;

  async function handleDelete() {
    await marketItemService.DeleteMarketItem(props.id);
    upp.marketItemDeleted();

    setShowDelete(false);
  }

  async function handleLike() {
    // if preview
    if (!props.id) {
      return;
    }

    if (!liked) {
      await marketItemService.LikeMarketItem(props.id);
      setLiked(true);

      return;
    }

    await marketItemService.UnlikeMarketItem(props.id);
    setLiked(false);
  }

  return (
    <div
      className="cell dark:bg-dark"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isPersonal && (
        <>
          <img
            className="cell--edit"
            onClick={() => navigate('/catalog/update/' + props.id)}
            alt=""
            src={PencilIcon}
          />
          <div
            className="cell--delete"
            onClick={() => {
              setShowDelete(true);
            }}
          >
            x
          </div>
        </>
      )}
      <div className="cell--image-wrapper">
        <img
          className="cell--image"
          src={imageSrc ? imageSrc : ''}
          onError={addDefaultSrc}
          alt=""
        ></img>
        {props.images.length > 1 && (
          <div className="cell--buttons-wrapper">
            <div
              onClick={() =>
                setImageSrc(
                  props.images[
                    (props.images.findIndex((img) => img === imageSrc) +
                      props.images.length -
                      1) %
                      props.images.length
                  ]
                )
              }
            >
              <SliderIcon />
              <button />
            </div>
            <div
              onClick={() =>
                setImageSrc(
                  props.images[
                    (props.images.findIndex((img) => img === imageSrc) +
                      props.images.length +
                      1) %
                      props.images.length
                  ]
                )
              }
            >
              <SliderIcon className="rotate-180" />
              <button />
            </div>
          </div>
        )}
        {!isPersonal && (
          <HeartIcon
            className={clsx(
              'cell--favorite',
              { hidden: !hovered },
              { fillsrose: liked }
            )}
            onClick={handleLike}
          />
        )}
        <div
          className={clsx('cell--condition', {
            'cell--condition_hovered': hovered,
          })}
        >
          <LazySvg name={props.condition_icon} />
          <p>{props.condition}</p>
        </div>
      </div>
      <div className="cell--info">
        <div className="cell--info-set">
          <h1>{props.set}</h1> <h1>${props.price}</h1>
        </div>
        <div className="cell--info-set">
          <p>Theme: {props.series}</p>
          <p>
            <LocationIcon className="iconfills" /> {props.location}
          </p>
        </div>
      </div>
      <div
        className="cell--link bg-celllink dark:bg-legocy text-white dark:text-[#2F2929]"
        onClick={() => props.id && navigate(`/catalog/${props.id}`)}
      >
        <h1>More Info</h1>
      </div>
      {showDelete && (
        <ConfirmationModal
          show={showDelete}
          onClose={() => setShowDelete(false)}
          onYes={handleDelete}
        >
          Are you sure you want to delete a market item?
        </ConfirmationModal>
      )}
    </div>
  );
};

export default MarketItemCell;
