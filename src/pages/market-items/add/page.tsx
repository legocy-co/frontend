import * as model from './model.ts';
import { useNavigate } from 'react-router-dom';
import { useGate } from 'effector-react';
import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { useState } from 'react';
import clsx from 'clsx';

const AddMarketItemPage = () => {
  const steps = ['primary', 'secondary', 'images'];
  const [step] = useState('primary');

  const navigateFn = useNavigate();

  useGate(model.gate, { navigateFn });
  // const detailsForm = useForm(mif.form);
  // const uploadImageForm = useForm(umiif.form);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading className="!mb-6">Add Your Set</PageHeading>
      <div className="w-[496px] flex items-center justify-between mb-16">
        {steps.map((s) => (
          <div
            className={clsx(
              'w-[154px] border-[5px] rounded-[5px] dark:border-opacity-45 border-solid border-step dark:border-white',
              {
                '!border-activestep dark:!border-white dark:!border-opacity-100':
                  s === step,
              }
            )}
          ></div>
        ))}
      </div>
      <div className={step === 'primary' ? '' : 'hidden'}>
        {/*<MarketItemPrimaryForm />*/}
      </div>
      <div className={step === 'secondary' ? '' : 'hidden'}>
        {/*<MarketItemSecondaryForm />*/}
      </div>
      <div className={step === 'images' ? '' : 'hidden'}>
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
