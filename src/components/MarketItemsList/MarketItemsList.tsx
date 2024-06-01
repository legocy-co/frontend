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
        stateIcon={marketItem.condition_icon}
        state={marketItem.condition}
        images={marketItem.images}
        price={marketItem.price}
        series={marketItem.series}
        set={marketItem.set}
        sellerID={marketItem.seller_id}
        isLiked={marketItem.is_liked}
        status={marketItem.status}
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
