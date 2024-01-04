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
    />
  ));

  return (
    <div
      style={{ gridTemplate: 'auto auto / repeat(5, 1fr)' }}
      className="grid gap-6"
    >
      {marketItemsElements}
    </div>
  );
};

export default MarketItemsList;
