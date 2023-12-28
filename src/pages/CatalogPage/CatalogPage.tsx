import Footer from '../../components/Footer';
import Header from '../../components/Header';
import * as model from './model';
import { useGate, useUnit } from 'effector-react';

export const CatalogPage = () => {
  useGate(model.Gate);
  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col justify-center items-center">
        Catalog
        <CatalogGrid />
      </div>
      <Footer />
    </>
  );
};

const CatalogGrid = () => {
  const marketItems = useUnit(model.$marketItemCells);
  console.log(marketItems);

  return <></>;
};
