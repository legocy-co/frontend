import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { CollectionSetForm } from '../../../features/collection';

export const AddCollectionSetPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading to={'/collection'}>Add collection set</PageHeading>
      <CollectionSetForm />
    </div>
  );
};
