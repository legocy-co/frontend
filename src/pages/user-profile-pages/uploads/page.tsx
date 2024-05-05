import { useGate, useUnit } from 'effector-react';
import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { MenuButton } from '../../../shared/ui/menu-button.tsx';
import * as model from './model.ts';

const MyUploadsPage = () => {
  useGate(model.gate);

  const status = useUnit(model.$status);
  const marketItems = useUnit(model.$marketItems);

  return (
    <>
      <PageHeading>My Uploads</PageHeading>
      <p className="mb-7">You have {marketItems.length} uploads</p>
      <div className="w-full flex items-center justify-center gap-5 mb-7">
        <MenuButton
          onClick={() => model.setStatus('CHECK_REQUIRED')}
          disabled={status === 'CHECK_REQUIRED'}
        >
          Pending{' '}
          {
            marketItems.filter((item) => item.status === 'CHECK_REQUIRED')
              .length
          }
        </MenuButton>
        <MenuButton
          onClick={() => model.setStatus('ACTIVE')}
          disabled={status === 'ACTIVE'}
        >
          Active {marketItems.filter((item) => item.status === 'ACTIVE').length}
        </MenuButton>
        <MenuButton
          onClick={() => model.setStatus('SOLD')}
          disabled={status === 'SOLD'}
        >
          Sold {marketItems.filter((item) => item.status === 'SOLD').length}
        </MenuButton>
      </div>
      {/*TODO: fetchMarketItemsFX*/}
      {/*<MarketItemsList />*/}
    </>
  );
};

export default MyUploadsPage;
