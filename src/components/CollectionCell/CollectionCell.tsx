import { useNavigate } from 'react-router-dom';
import './CollectionCell.scss';
import { useEffect, useState } from 'react';
import PencilIcon from '../../assets/icons/pencil.svg?react';
import TrashIcon from '../../assets/icons/trash.svg?react';
import ArrowIcon from '../../assets/icons/arrow.svg?react';
import ConfirmationModal from '../ConfirmationModal';
import { collectionService } from '../../services/CollectionService.ts';
import { collectionsModel } from '../../pages/collections/index.tsx';
import clsx from 'clsx';
import { CollectionSetForm, csf } from '../../features/collection';
import { useUnit } from 'effector-react';

interface CollectionCellProps {
  id: number;
  buy_price: number;
  valuation?: number;
  series: string;
  set: string;
  set_number: number;
  set_id: number;
  condition: string;
  total_return_percentage?: number;
  total_return_usd?: number;
}

const CollectionCell = (props: CollectionCellProps) => {
  const navigate = useNavigate();

  async function handleDelete() {
    await collectionService.DeleteCollectionSet(props.id);
    collectionsModel.collectionSetDeleted();

    setShowDelete(false);
  }

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const formClosed = useUnit(csf.$formClosed);

  useEffect(() => {
    if (formClosed) setShowEdit(false);
  }, [formClosed]);

  return (
    <div className="collection-cell">
      <div className="collection-cell__header">
        <div
          className="collection-cell--button"
          onClick={() => setShowEdit(true)}
        >
          <PencilIcon width={13} />
        </div>
        <u onClick={() => navigate('/wiki/sets/' + props.set_id)}>
          {props.set}
        </u>
        <div
          className="collection-cell--button"
          onClick={() => {
            setShowDelete(true);
          }}
        >
          <TrashIcon />
        </div>
      </div>
      <div className="collection-cell__body">
        <p>Condition: {props.condition}</p>
        <div className="collection-cell--price">
          <div>
            <h1>Purchase price</h1>
            <p>{props.buy_price}$</p>
          </div>
          <ArrowIcon width={20} />
          <div>
            <h1>Current price</h1>
            <p>{props.valuation ? `${props.valuation}$` : '---'}</p>
          </div>
          <div
            className={clsx(
              { '!text-green-400': props.total_return_usd! > 0 },
              { '!text-red-400': props.total_return_usd! < 0 }
            )}
          >
            <h1>ROI</h1>
            <p>
              {props.valuation! !== 0
                ? `${props.total_return_usd}$(${props.total_return_percentage}%)`
                : 'Not estimated'}
            </p>
          </div>
        </div>
      </div>
      {(showEdit || showDelete) && (
        <ConfirmationModal
          className="!p-[59px] dark:!bg-dark max-h-[550px] !top-12 overflow-auto"
          show={showDelete}
          onClose={() =>
            showDelete ? setShowDelete(false) : setShowEdit(false)
          }
          showYes={showDelete}
          onYes={handleDelete}
        >
          {showEdit ? (
            <CollectionSetForm id={props.id} />
          ) : (
            'Are you sure you want to delete a collection set?'
          )}
        </ConfirmationModal>
      )}
    </div>
  );
};

export default CollectionCell;
