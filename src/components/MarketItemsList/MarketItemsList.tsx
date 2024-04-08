import { useUnit } from 'effector-react';
import * as model from './model.ts';
import MarketItemCell from '../MarketItemCell';

const MarketItemsList = () => {
  const marketItems = useUnit(model.$marketItemCells);

  const marketItemsElements = marketItems.map((marketItem) => (
    <div id={'cell-' + marketItem.id} key={'cell-' + marketItem.id}>
      <MarketItemCell
        id={marketItem.id}
        location={marketItem.location}
        condition_icon={marketItem.condition_icon}
        condition={marketItem.condition}
        images={marketItem.images}
        price={marketItem.price}
        series={marketItem.series}
        set={marketItem.set}
        set_number={marketItem.set_number}
        seller_id={marketItem.seller_id}
        set_id={marketItem.set_id}
      />
    </div>
  ));

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 transition-all">
      {marketItemsElements}
    </div>
  );
};

export default MarketItemsList;
