import CollectionsIntroPage from './intro';
import CollectionList from '../../components/CollectionList';
import { useUnit } from 'effector-react';
import * as model from './model.ts';

export const CollectionPage = () => {
  const collection = useUnit(model.$collectionCells);

  console.log(collection);

  return collection ? <CollectionList /> : <CollectionsIntroPage />;
};
