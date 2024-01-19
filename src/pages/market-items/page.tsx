import * as model from './model.ts';
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
      <div className="grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 mb-7">
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
