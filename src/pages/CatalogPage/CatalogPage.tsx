import * as model from './model';
import { useGate } from 'effector-react';
import { MenuButton } from '../../shared/ui/menu-button.tsx';
import { PageHeading } from '../../shared/ui/page-heading.tsx';
import MarketItemsList from '../../components/MarketItemsList';
// import { Button } from '../../shared/ui/button.tsx';

export const CatalogPage = () => {
  useGate(model.gate);
  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading>Catalog</PageHeading>
      <div className="w-full flex items-center justify-center gap-5 mb-7">
        <MenuButton>Filter by set</MenuButton>
        <MenuButton>Filter by price</MenuButton>
        <MenuButton>Filter by condition</MenuButton>
        <MenuButton>Filter by area</MenuButton>
        <MenuButton>Filter by series</MenuButton>
        <MenuButton>Filter by rating</MenuButton>
        <MenuButton isCurrency />
      </div>
      <MarketItemsList />
      {/*<Button className="mt-11">Show More</Button>*/}
    </div>
  );
};
