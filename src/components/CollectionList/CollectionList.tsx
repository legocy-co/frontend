import { useUnit } from 'effector-react';
import CollectionCell from '../CollectionCell/CollectionCell.tsx';
import { collectionsModel } from '../../pages/collections/index.tsx';

const CollectionList = () => {
  const collectionSets = useUnit(collectionsModel.$collectionCells);

  const collectionCellsElement = collectionSets.map((set) => (
    <div id={'collection-cell-' + set.id} key={'collection-cell-' + set.id}>
      <CollectionCell
        id={set.id}
        buy_price={set.buyPrice}
        valuation={set.valuation ?? 0}
        series={set.series}
        set={set.set}
        set_number={set.setNumber}
        set_id={set.setID}
        condition={set.condition}
        total_return_percentage={set.totalReturnPercentage}
        total_return_usd={set.totalReturnUSD}
      />
    </div>
  ));

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 transition-all mt-7">
      {collectionCellsElement}
    </div>
  );
};

export default CollectionList;
