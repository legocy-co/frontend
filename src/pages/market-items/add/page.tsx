import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { MarketItemInfoForm, mif } from '../../../features/market-item/info';
import * as model from './model.ts';
import {
  MarketItemImagesForm,
  umiif,
} from '../../../features/market-item/images';
import { Button } from '../../../shared/ui/button.tsx';
import { MenuButton } from '../../../shared/ui/menu-button.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGate } from 'effector-react';
import { useForm } from 'effector-forms';

const AddMarketItemPage = () => {
  const [imagesTab, setImagesTab] = useState(false);

  const navigateFn = useNavigate();

  useGate(model.gate, { navigateFn });
  const detailsForm = useForm(mif.form);
  const uploadImageForm = useForm(umiif.form);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading to={'/profile'}>Add market item</PageHeading>
      <div className="w-full flex items-center justify-center gap-5 mb-7">
        <MenuButton
          isInvalid={!detailsForm.isValid}
          disabled={!imagesTab}
          onClick={() => setImagesTab(false)}
        >
          Info
        </MenuButton>
        <MenuButton
          isInvalid={!uploadImageForm.isValid}
          disabled={imagesTab}
          onClick={() => setImagesTab(true)}
        >
          Images
        </MenuButton>
      </div>
      <div className={imagesTab ? 'hidden' : ''}>
        <MarketItemInfoForm />
      </div>
      <div className={!imagesTab ? 'hidden' : ''}>
        <MarketItemImagesForm />
      </div>
      <Button className="mt-20" onClick={() => model.submitTriggered()}>
        Add Market item
      </Button>
    </div>
  );
};

export default AddMarketItemPage;
