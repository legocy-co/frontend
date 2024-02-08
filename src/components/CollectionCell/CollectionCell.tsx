import { useNavigate } from 'react-router-dom';
import './CollectionCell.scss';
import { addDefaultSrc } from '../../services/utils.ts';
import { useState } from 'react';

interface CollectionCellProps {
  id: number;
  buy_price: number;
  valuation: number;
  series: string;
  set: string;
  set_number: number;
  set_id: number;
  condition: string;
  images: string[];
}

const CollectionCell = (props: CollectionCellProps) => {
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState(props.images[0]);

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

  return (
    <div className="collection-cell">
      <h1>Buy price: {props.buy_price} $</h1>
      {props.images.length > 0 && (
        <div className="collection-cell--image-wrapper">
          <img
            className="collection-cell--image"
            src={imageSrc ? imageSrc : ''}
            onError={addDefaultSrc}
            alt=""
          ></img>
          {props.images.length > 1 && (
            <div className="collection-cell--buttons-wrapper">
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
            <div className="collection-cell--image-choice">{radioElements}</div>
          )}
        </div>
      )}
      <div className="collection-cell--props">
        <h1>{props.set}</h1>
        <h2>{props.valuation ? `${props.valuation}$` : '---'}</h2>
      </div>
      <div className="collection-cell--props">
        <p>Series: {props.series}</p>
        <p>Condition: {props.condition}</p>
      </div>
      <p>
        <u onClick={() => navigate('/wiki/sets/' + props.set_id)}>
          Set number: {props.set_number}
        </u>
      </p>
    </div>
  );
};

export default CollectionCell;
