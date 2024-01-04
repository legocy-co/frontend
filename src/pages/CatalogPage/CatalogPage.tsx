import Footer from '../../components/Footer';
import Header from '../../components/Header';
import * as model from './model';
import { useGate, useUnit } from 'effector-react';
import MarketItemCell from '../../components/MarketItemCell';
import { MenuButton } from '../../shared/ui/menu-buttons.tsx';
import { PageHeading } from '../../shared/ui/page-heading.tsx';

export const CatalogPage = () => {
  useGate(model.gate);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      <PageHeading>Catalog</PageHeading>
      <div className="w-full flex items-center justify-center gap-5 mb-7">
        <MenuButton>Filter by set</MenuButton>
        <MenuButton>Filter by price</MenuButton>
        <MenuButton>Filter by condition</MenuButton>
        <MenuButton>Filter by area</MenuButton>
        <MenuButton>Filter by series</MenuButton>
        <MenuButton>Filter by rating</MenuButton>
      </div>
      <MarketItemContent />
      <Footer />
    </div>
  );
};

const MarketItemContent = () => {
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

  return <div className="grid grid-cols-5 gap-6">{marketItemsElements}</div>;
};
