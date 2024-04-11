import * as model from './model.ts';
import { useNavigate } from 'react-router-dom';
import { useGate } from 'effector-react';
import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { useState } from 'react';
import clsx from 'clsx';

const AddMarketItemPage = () => {
  const tabs = ['primary', 'secondary', 'images'];
  const [tab] = useState('primary');

  const navigateFn = useNavigate();

  useGate(model.gate, { navigateFn });
  // const detailsForm = useForm(mif.form);
  // const uploadImageForm = useForm(umiif.form);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading>Add Your Set</PageHeading>
      <div className="w-[496px] flex items-center justify-between">
        {tabs.map((t) => (
          <div
            className={clsx(
              'w-[154px] border-[5px] border-opacity-45 border-solid border-white',
              { 'border-opacity-100': t === tab }
            )}
          ></div>
        ))}
      </div>
      <div className={tab === 'primary' ? '' : 'hidden'}>
        {/*<MarketItemPrimaryForm />*/}
      </div>
      <div className={tab === 'secondary' ? '' : 'hidden'}>
        {/*<MarketItemSecondaryForm />*/}
      </div>
      <div className={tab === 'images' ? '' : 'hidden'}>
        {/*<MarketItemImagesForm />*/}
      </div>
      {/*<div className="w-full flex items-center justify-center gap-5 mb-7">*/}
      {/*  <MenuButton*/}
      {/*    isInvalid={!detailsForm.isValid}*/}
      {/*    disabled={!tab}*/}
      {/*    onClick={() => setTab(false)}*/}
      {/*  >*/}
      {/*    Info*/}
      {/*  </MenuButton>*/}
      {/*  <MenuButton*/}
      {/*    isInvalid={!uploadImageForm.isValid}*/}
      {/*    disabled={tab}*/}
      {/*    onClick={() => setTab(true)}*/}
      {/*  >*/}
      {/*    Images*/}
      {/*  </MenuButton>*/}
      {/*</div>*/}
      {/*<div className={tab ? 'hidden' : ''}>*/}
      {/*  <MarketItemInfoForm />*/}
      {/*</div>*/}
      {/*<div className={!tab ? 'hidden' : ''}>*/}
      {/*  <MarketItemImagesForm />*/}
      {/*</div>*/}
      {/*<Button className="mt-20" onClick={() => model.submitTriggered()}>*/}
      {/*  Add Market item*/}
      {/*</Button>*/}
    </div>
  );
};

export default AddMarketItemPage;
