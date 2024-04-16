import * as model from './model.ts';
import { useNavigate } from 'react-router-dom';
import { useGate } from 'effector-react';
import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { useState } from 'react';
import clsx from 'clsx';
import MarketItemPrimaryForm, {
  mipf,
} from '../../../features/market-item/primary';
import { Button } from '../../../shared/ui/button.tsx';
import { useForm } from 'effector-forms';

const AddMarketItemPage = () => {
  const navigateFn = useNavigate();

  useGate(model.gate, { navigateFn });

  const steps = ['primary', 'secondary', 'images'];
  const [step, setStep] = useState('primary');

  const stepIndex = steps.findIndex((s) => s === step);
  const { isValid: primaryValid, submit: primarySubmit } = useForm(mipf.form);

  function handleNext() {
    switch (step) {
      case 'primary':
        primarySubmit();
        primaryValid && setStep(steps[stepIndex + 1]);
    }
  }

  // TODO: refactor steps

  // const detailsForm = useForm(mif.form);
  // const uploadImageForm = useForm(umiif.form);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading className="!mb-6 !text-header dark:!text-darkheader">
        Add Your Set
      </PageHeading>
      <div className="!w-[360px] sm:!w-[496px] flex items-center justify-between gap-1 mb-16">
        {steps.map((s) => (
          <div
            className={clsx(
              'w-[154px] border-2 rounded-[5px] dark:border-opacity-45 border-solid border-step dark:border-white',
              {
                '!border-activestep dark:!border-white dark:!border-opacity-100':
                  steps.findIndex((x) => x === s) <=
                  steps.findIndex((x) => x === step),
              }
            )}
          ></div>
        ))}
      </div>
      <div className={step === 'primary' ? '' : 'hidden'}>
        <MarketItemPrimaryForm />
      </div>
      <div className={step === 'secondary' ? '' : 'hidden'}>
        {/*<MarketItemSecondaryForm />*/}
      </div>
      <div className={step === 'images' ? '' : 'hidden'}>
        {/*<MarketItemImagesForm />*/}
      </div>
      <div className="flex justify-center gap-4">
        {step === 'primary' ? (
          <Button onClick={() => navigateFn('/')}>Cancel</Button>
        ) : (
          <Button onClick={() => setStep(steps[stepIndex - 1])}>
            Previous step
          </Button>
        )}
        {step === 'images' ? (
          <Button>Finish</Button>
        ) : (
          <Button onClick={handleNext}>Next step</Button>
        )}
      </div>
    </div>
  );
};

export default AddMarketItemPage;
