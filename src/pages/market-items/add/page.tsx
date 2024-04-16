import * as model from './model.ts';
import { useNavigate } from 'react-router-dom';
import { useGate, useUnit } from 'effector-react';
import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import clsx from 'clsx';
import { Button } from '../../../shared/ui/button.tsx';
import MarketItemPrimaryForm, {
  mipf,
} from '../../../features/market-item/primary';
import { tabChanged } from './model.ts';

const AddMarketItemPage = () => {
  const navigateFn = useNavigate();
  useGate(model.gate, { navigateFn });

  const tabs = model.tabs;
  const tab = useUnit(model.$tab);
  const tabIndex = tabs.findIndex((t) => t === tab);

  function handleNext() {
    switch (tab) {
      case 'primary':
        mipf.form.submit();
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading className="!mb-6 !text-header dark:!text-darkheader">
        Add Your Set
      </PageHeading>
      <div className="!w-[360px] sm:!w-[496px] flex items-center justify-between gap-1 mb-16">
        {tabs.map((t) => (
          <div
            key={'tab-' + t}
            className={clsx(
              'w-[154px] border-2 rounded-[5px] dark:border-opacity-45 border-solid border-step dark:border-white',
              {
                '!border-activestep dark:!border-white dark:!border-opacity-100':
                  tabs.findIndex((x) => x === t) <= tabIndex,
              }
            )}
          ></div>
        ))}
      </div>
      <div className={tab === 'primary' ? '' : 'hidden'}>
        <MarketItemPrimaryForm />
      </div>
      <div className={tab === 'secondary' ? '' : 'hidden'}>
        {/*<MarketItemSecondaryForm />*/}
      </div>
      <div className={tab === 'images' ? '' : 'hidden'}>
        {/*<MarketItemImagesForm />*/}
      </div>
      <div className="flex justify-center gap-10 mt-10">
        <Button
          className="!h-10 text-lg text-prevtext bg-prev dark:bg-prevdark dark:text-white hover:bg-prev hover:brightness-90"
          onClick={() =>
            tab === 'primary' ? navigateFn('/') : tabChanged(tabs[tabIndex - 1])
          }
        >
          {tab === 'primary' ? 'Cancel' : 'Previous step'}
        </Button>
        <Button className="!h-10 text-lg text-celllink" onClick={handleNext}>
          {tab === 'images' ? 'Finish' : 'Next step'}
        </Button>
      </div>
    </div>
  );
};

export default AddMarketItemPage;
