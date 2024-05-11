import { useGate, useUnit } from 'effector-react';
import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { MenuButton } from '../../../shared/ui/menu-button.tsx';
import * as model from './model.ts';
import MarketItemsList from '../../../components/MarketItemsList/index.tsx';

const MyUploadsPage = () => {
  useGate(model.gate);

  const status = useUnit(model.$status);
  const uploads = useUnit(model.$marketItems);

  return (
    <>
      <PageHeading>My Uploads</PageHeading>
      <p className="mb-7">You have {uploads.length} uploads</p>
      <div className="w-full flex items-center justify-center gap-5 mb-7">
        <MenuButton
          onClick={() => model.statusChanged('CHECK_REQUIRED')}
          disabled={status === 'CHECK_REQUIRED'}
        >
          Pending{' '}
          {uploads.filter((item) => item.status === 'CHECK_REQUIRED').length}
        </MenuButton>
        <MenuButton
          onClick={() => model.statusChanged('ACTIVE')}
          disabled={status === 'ACTIVE'}
        >
          Active {uploads.filter((item) => item.status === 'ACTIVE').length}
        </MenuButton>
        <MenuButton
          onClick={() => model.statusChanged('SOLD')}
          disabled={status === 'SOLD'}
        >
          Sold {uploads.filter((item) => item.status === 'SOLD').length}
        </MenuButton>
      </div>
      <MarketItemsList />
    </>
  );
};

export default MyUploadsPage;
