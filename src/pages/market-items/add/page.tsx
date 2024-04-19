import * as model from './model.ts';
import { useNavigate } from 'react-router-dom';
import { useGate, useUnit } from 'effector-react';
import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import clsx from 'clsx';
import { Button } from '../../../shared/ui/button.tsx';
import MarketItemPrimaryForm, {
  mipf,
} from '../../../features/market-item/primary';
import { tabChanged, tabs } from './model.ts';
import MarketItemSecondaryForm, {
  misf,
} from '../../../features/market-item/secondary';
import {
  MarketItemImagesForm,
  miif,
} from '../../../features/market-item/images';
import MarketItemCell from '../../../components/MarketItemCell';
import { $marketItemCell } from '../../../components/MarketItemsList/model.ts';

const AddMarketItemPage = () => {
  const navigateFn = useNavigate();
  useGate(model.gate, { navigateFn });

  const tab = useUnit(model.$tab);
  const tabIndex = tabs.findIndex((t) => t === tab);

  const cell = useUnit($marketItemCell);
  const description = useUnit(mipf.form.fields.description.$value);

  function handleNext() {
    switch (tab) {
      case 'primary':
        mipf.form.submit();
        break;
      case 'secondary':
        misf.form.submit();
        break;
      case 'images':
        miif.form.submit();
        break;
      case 'preview':
        model.finish();
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading className="!mb-6 !text-header dark:!text-darkheader">
        Add Your Set
      </PageHeading>
      <div className="!w-[360px] sm:!w-[496px] flex items-center justify-between gap-1 mb-16">
        {model.tabs.slice(0, model.tabs.length - 1).map((t) => (
          <div
            key={'tab-' + t}
            className={clsx(
              'w-[154px] border-2 rounded-[5px] dark:border-opacity-45 border-solid border-step dark:border-white',
              {
                '!border-filterstext dark:!border-white dark:!border-opacity-100':
                  model.tabs.findIndex((x) => x === t) <= tabIndex,
              }
            )}
          ></div>
        ))}
      </div>
      <div className={tab === 'primary' ? '' : 'hidden'}>
        <MarketItemPrimaryForm />
      </div>
      <div className={tab === 'secondary' ? '' : 'hidden'}>
        <MarketItemSecondaryForm />
      </div>
      <div className={tab === 'images' ? '' : 'hidden'}>
        <MarketItemImagesForm />
      </div>
      <div
        className={
          tab === 'preview' ? 'flex flex-col gap-6 items-center' : 'hidden'
        }
      >
        <p className="text-lg text-label dark:text-darkfilterstext">Preview</p>
        <p className="font-normal text-xs text-label dark:text-darkfilterstext">
          This is a preview of how other users will see your card.
        </p>
        {cell.set && (
          <MarketItemCell
            id={cell.id}
            condition_icon={cell.condition_icon}
            condition={cell.condition}
            images={cell.images}
            location={cell.location}
            price={cell.price}
            series={cell.series}
            set={cell.set}
            seller_id={cell.seller_id}
            is_liked={cell.is_liked}
          />
        )}
        <p className="max-w-[360px] sm:max-w-[405px] color-[#1D1C1C] dark:color-white">
          Set description: {description}
        </p>
      </div>
      <div className="flex justify-center gap-4 mt-10">
        <Button
          className="!h-10 text-lg text-prevtext bg-prev dark:bg-prevdark dark:text-white hover:bg-prev transition-all hover:brightness-95 active:brightness-90"
          onClick={() =>
            tab === 'primary' ? navigateFn('/') : tabChanged(tabs[tabIndex - 1])
          }
        >
          {tab === 'primary' ? 'Cancel' : 'Previous step'}
        </Button>
        <Button className="!h-10 text-lg text-celllink" onClick={handleNext}>
          {tab === 'images' || tab === 'preview' ? 'Finish' : 'Next step'}
        </Button>
      </div>
    </div>
  );
};

export default AddMarketItemPage;
