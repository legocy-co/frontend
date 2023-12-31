import Footer from '../../components/Footer';
import Header from '../../components/Header';
import * as model from './model';
import { useGate, useUnit } from 'effector-react';
import CatalogCell from '../../components/CatalogCell';

export const CatalogPage = () => {
  useGate(model.Gate);
  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col justify-center items-center">
        Catalog
        <CatalogContent />
      </div>
      <Footer />
    </>
  );
};

const CatalogContent = () => {
  const marketItems = useUnit(model.$marketItemCells);
  console.log(marketItems);
  const marketItemsElements = marketItems.map((marketItem) => (
    <CatalogCell
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

  return <div className="grid grid-cols-5 gap-6">{marketItemsElements}</div>;
};
