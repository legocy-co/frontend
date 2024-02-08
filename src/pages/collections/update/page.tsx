import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { CollectionSetForm } from '../../../features/collections';

export const UpdateCollectionSetPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading to={'/collection'}>Update collection set</PageHeading>
      <CollectionSetForm />
    </div>
  );
};
