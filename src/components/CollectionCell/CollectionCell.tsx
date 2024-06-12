import { useNavigate } from 'react-router-dom';
import './CollectionCell.scss';
import { useEffect, useState } from 'react';
import PencilIcon from '../../assets/icons/pencil.svg?react';
import TrashIcon from '../../assets/icons/trash.svg?react';
import ArrowIcon from '../../assets/icons/arrow.svg?react';
import ConfirmationModal from '../ConfirmationModal';
import { collectionService } from '../../services/CollectionService.ts';
import clsx from 'clsx';
import { CollectionSetForm, csf } from '../../features/collection';
import { useUnit } from 'effector-react';
import { Button } from '../../shared/ui/button.tsx';
import * as model from '../../features/collection/model.ts';

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
    csf.collectionUpdated();

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
          className="!p-10 dark:!bg-dark max-h-[550px] !top-12 overflow-auto"
          show={showDelete || showEdit}
          showYes={false}
          onClose={() =>
            showDelete ? setShowDelete(false) : setShowEdit(false)
          }
        >
          {showEdit ? (
            <CollectionSetForm id={props.id} />
          ) : (
            <div className="flex flex-col gap-5 px-10 w-80 sm:w-[500px] font-medium text-center">
              <h1 className="font-bold text-[32px]">
                Delete Set from Collection?
              </h1>
              <p className="text-lg">
                Once you confirm, this set will be removed from your collection.
                You can always add it again.
              </p>
              <div className="flex items-center gap-5 mt-5">
                <Button
                  onClick={handleDelete}
                  className="w-48 !h-12 !text-avatarbg"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => model.formClosed()}
                  className="w-48 !h-12 text-white dark:!text-dark !bg-darkfiltersborder"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </ConfirmationModal>
      )}
    </div>
  );
};

export default CollectionCell;
