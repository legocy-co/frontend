import { useUnit } from 'effector-react';
import CollectionCell from '../CollectionCell/CollectionCell.tsx';
import { collectionsModel } from '../../pages/collections/index.tsx';

const CollectionList = () => {
  const collectionSets = useUnit(collectionsModel.$collectionCells);

  console.log(collectionSets);

  const collectionCellsElement = collectionSets.map((set) => (
    <div id={'collection-cell-' + set.id} key={'collection-cell-' + set.id}>
      <CollectionCell
        id={set.id}
        buy_price={set.buy_price}
        valuation={set.valuation ?? 0}
        series={set.series}
        set={set.set}
        set_number={set.set_number}
        set_id={set.set_id}
        condition={set.condition}
        images={set.images}
      />
    </div>
  ));

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 transition-all mt-7">
      {collectionCellsElement}
    </div>
  );
};

export default CollectionList;
