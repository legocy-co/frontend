import './MarketItemCell.scss';
import { addDefaultSrc } from '../../services/utils.ts';
import { useNavigate } from 'react-router-dom';
import HeartIcon from '../../assets/icons/heart.svg?react';
import { useState } from 'react';
import { authService } from '../../services/AuthService.ts';
import { marketItemService } from '../../services/MarketItemService.ts';
import ConfirmationModal from '../ConfirmationModal';
import { up } from '../../pages/UserProfilePage/index.tsx';
import PencilIcon from '../../assets/icons/pencil.svg';
import SliderIcon from '../../assets/icons/slider-back.svg?react';
import BrandNewIcon from '../../assets/icons/brand_new.svg?react';
import BoxOpenedIcon from '../../assets/icons/box_opened.svg?react';
import BagsOpenedIcon from '../../assets/icons/bags_opened.svg?react';
import BuiltWithBoxIcon from '../../assets/icons/built_with_box.svg?react';
import BuiltWithoutBoxIcon from '../../assets/icons/built_without_box.svg?react';
import BuiltPiecesLostIcon from '../../assets/icons/built_pieces_lost.svg?react';

interface MarketItemCellProps {
  id: number;
  condition: string;
  images: string[];
  location: string;
  price: number;
  series: string;
  set: string;
  set_number: number;
  seller_id: number;
  set_id: number;
}

const MarketItemCell = (props: MarketItemCellProps) => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(props.images[0]);

  async function handleDelete() {
    await marketItemService.DeleteMarketItem(props.id);
    up.marketItemDeleted();

    setShowDelete(false);
  }

  const [showDelete, setShowDelete] = useState(false);

  // try conditional import
  const showConditionIcon = (condition: string) => {
    switch (condition) {
      case 'Brand New':
        return <BrandNewIcon />;
      case 'Box Opened':
        return <BoxOpenedIcon />;
      case 'Bags Opened':
        return <BagsOpenedIcon />;
      case 'Built With Box':
        return <BuiltWithBoxIcon />;
      case 'Built Without Box':
        return <BuiltWithoutBoxIcon />;
      default:
        return <BuiltPiecesLostIcon />;
    }
  };

  return (
    <div className="cell dark:bg-dark">
      <h1>{props.location}</h1>
      {authService.IsAuthorized() &&
        authService.GetUserId() === props.seller_id && (
          <>
            <img
              className="collection-cell--edit"
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
                      props.images.length -
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
        <HeartIcon className="cell--favorite" />
      </div>
      <div className="cell--info">
        <div className="cell--info-set">
          <h1>{props.set}</h1> <h1>{props.price}$</h1>
        </div>
        <div className="cell--info-set">
          <div className="cell--info-set-props">
            <p>Series: {props.series}</p>
            <u onClick={() => navigate('/wiki/sets/' + props.set_id)}>
              <p>Set number: {props.set_number}</p>
            </u>
          </div>
          <div className="cell--info-set-condition">
            <div className="bg-condition dark:bg-conditiondark">
              {showConditionIcon(props.condition)}
            </div>
            <p>{props.condition}</p>
          </div>
        </div>
      </div>
      <div
        className="cell--link bg-celllink dark:bg-legocy text-white dark:text-celllinkdarktext"
        onClick={() => navigate(`/catalog/${props.id}`)}
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
