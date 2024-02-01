import './MarketItemCell.scss';
import { addDefaultSrc } from '../../services/utils.ts';
import { useNavigate } from 'react-router-dom';
import HeartIcon from '../../assets/icons/heart.svg';
import { useState } from 'react';
import { authService } from '../../services/AuthService.ts';
import { marketItemService } from '../../services/MarketItemService.ts';
import ConfirmationModal from '../ConfirmationModal';

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

    const cell = document.getElementById('cell-' + props.id) as HTMLElement;
    cell.style.display = 'none';

    setShowDelete(false);
  }

  const radioElements = props.images.map((img, i) => (
    <div key={img + i}>
      <input
        type="radio"
        id={img}
        onChange={() => setImageSrc(img)}
        checked={img === imageSrc}
      />
      <label htmlFor={img} />
    </div>
  ));

  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="cell">
      <h1>{props.location}</h1>
      {authService.IsAuthorized() &&
        authService.GetUserId() === props.seller_id && (
          <div
            className="cell--delete"
            onClick={() => {
              setShowDelete(true);
            }}
          >
            x
          </div>
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
            <button
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
            ></button>
            <button
              onClick={() =>
                setImageSrc(
                  props.images[
                    (props.images.findIndex((img) => img === imageSrc) + 1) %
                      props.images.length
                  ]
                )
              }
            ></button>
          </div>
        )}

        {props.images.length > 1 && (
          <div className="cell--image-choice">{radioElements}</div>
        )}
        <img
          className="cell--favorite"
          src={HeartIcon}
          onError={addDefaultSrc}
          alt=""
        />
      </div>
      <div className="cell--props">
        <h1>{props.set}</h1> <h1>{props.price}$</h1>
      </div>
      <div className="cell--props">
        <p>Series: {props.series}</p>
        <p>Condition: {props.condition}</p>
      </div>
      <p>
        <u onClick={() => navigate('/wiki/sets/' + props.set_id)}>
          Set number: {props.set_number}
        </u>
      </p>
      <div
        className="cell--link"
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
