import CollectionsIntroPage from './intro';

export const CollectionPage = () => {
  const collection = 0;

  return !collection ? <CollectionsIntroPage /> : null;
};
