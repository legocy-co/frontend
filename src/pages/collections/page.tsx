import CollectionsIntroPage from './intro';
import CollectionList from '../../components/CollectionList';

export const CollectionPage = () => {
  const collection = 0;

  return collection ? (
    <div>
      <CollectionList />
    </div>
  ) : (
    <CollectionsIntroPage />
  );
};
