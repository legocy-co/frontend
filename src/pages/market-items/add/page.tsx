import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { MarketItemForm } from '../../../features/market-item/details';
import * as model from './model.ts';
import { UploadMarketItemImageForm } from '../../../features/market-item/upload-image';
import { Button } from '../../../shared/ui/button.tsx';
import { MenuButton } from '../../../shared/ui/menu-button.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGate } from 'effector-react';

const AddMarketItemPage = () => {
  const [imagesTab, setImagesTab] = useState(false);

  const navigateFn = useNavigate();

  useGate(model.gate, { navigateFn });

  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading to={'/profile'}>Add market item</PageHeading>
      <div className="w-full flex items-center justify-center gap-5 mb-7">
        <MenuButton disabled={!imagesTab} onClick={() => setImagesTab(false)}>
          Info
        </MenuButton>
        <MenuButton disabled={imagesTab} onClick={() => setImagesTab(true)}>
          Images
        </MenuButton>
      </div>
      {!imagesTab ? <MarketItemForm /> : <UploadMarketItemImageForm />}
      <Button className="mt-20" onClick={() => model.submitTriggered()}>
        Add Market item
      </Button>
    </div>
  );
};

export default AddMarketItemPage;
