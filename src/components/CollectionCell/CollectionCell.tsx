import { useNavigate } from 'react-router-dom';
import './CollectionCell.scss';
import { addDefaultSrc } from '../../services/utils.ts';
import { useState } from 'react';
import PencilIcon from '../../assets/icons/pencil.svg';
import ConfirmationModal from '../ConfirmationModal';
import { collectionService } from '../../services/CollectionService.ts';
import { collectionsModel } from '../../pages/collections/index.tsx';
import clsx from 'clsx';

interface CollectionCellProps {
  id: number;
  buy_price: number;
  valuation?: number;
  series: string;
  set: string;
  set_number: number;
  set_id: number;
  condition: string;
  images: string[];
  total_return_percentage?: number;
  total_return_usd?: number;
}

const CollectionCell = (props: CollectionCellProps) => {
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState(props.images[0]);

  async function handleDelete() {
    await collectionService.DeleteCollectionSet(props.id);
    collectionsModel.collectionSetDeleted();

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
  const [roiUsd, setRoiUsd] = useState(false);

  return (
    <div className="collection-cell dark:bg-dark">
      <h1>Buy price: {props.buy_price} $</h1>
      <img
        className="collection-cell--edit"
        onClick={() => navigate('/collection/update/' + props.id)}
        alt=""
        src={PencilIcon}
      />
      <div
        className="collection-cell--delete"
        onClick={() => {
          setShowDelete(true);
        }}
      >
        x
      </div>
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
      {props.valuation! > 0 && (
        <div className="collection-cell--roi">
          <h1>ROI</h1>
          <h2
            className={clsx(
              { 'text-green-400': props.total_return_usd! > 0 },
              { 'text-red-400': props.total_return_usd! < 0 }
            )}
            onClick={() => setRoiUsd((prev) => !prev)}
          >
            {roiUsd
              ? `${props.total_return_usd} USD`
              : props.total_return_percentage + '%'}
          </h2>
        </div>
      )}
      {showDelete && (
        <ConfirmationModal
          show={showDelete}
          onClose={() => setShowDelete(false)}
          onYes={handleDelete}
        >
          Are you sure you want to delete a collection set?
        </ConfirmationModal>
      )}
    </div>
  );
};

export default CollectionCell;
