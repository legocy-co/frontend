import { useUnit } from 'effector-react';
import * as model from './model.ts';
import MarketItemCell from '../MarketItemCell';

const MarketItemsList = () => {
  const marketItems = useUnit(model.$marketItemCells);

  const marketItemsElements = marketItems.map((marketItem) => (
    <MarketItemCell
      key={marketItem.id}
      id={marketItem.id}
      location={marketItem.location}
      condition={marketItem.condition}
      images={marketItem.images}
      price={marketItem.price}
      series={marketItem.series}
      set={marketItem.set}
      set_number={marketItem.set_number}
      seller_id={marketItem.seller_id}
    />
  ));

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 transition-all">
      {marketItemsElements}
    </div>
  );
};

export default MarketItemsList;
