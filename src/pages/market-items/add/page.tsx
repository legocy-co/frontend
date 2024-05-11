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
import Loader from '../../../shared/ui/loader.tsx';
import CongratsIcon from '../../../assets/icons/congrats.svg?react';
import { upp } from '../../user-profile-pages/index.tsx';

const AddMarketItemPage = () => {
  const navigateFn = useNavigate();
  useGate(model.gate, { navigateFn });

  const tab = useUnit(model.$tab);
  const tabIndex = tabs.findIndex((t) => t === tab);

  const cell = useUnit($marketItemCell);
  const description = useUnit(mipf.form.fields.description.$value);

  function toUploads() {
    upp.sectionSelected('uploads');
    navigateFn('/profile');
  }

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
        break;
      case 'final':
        navigateFn('/catalog');
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading className="!mb-6 !text-[#211C1C] dark:!text-[#F4F4F4]">
        Add Your Set
      </PageHeading>
      <div className="!w-[360px] sm:!w-[496px] flex items-center justify-between gap-1 mb-16">
        {model.tabs.slice(0, model.tabs.length - 3).map((t) => (
          <div
            key={'tab-' + t}
            className={clsx(
              'w-[154px] border-2 rounded-[5px] dark:border-opacity-45 border-solid border-step dark:border-white',
              {
                '!border-tab dark:!border-white dark:!border-opacity-100':
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
        <p className="text-lg text-[#332929] dark:text-[#F9F9F9]">Preview</p>
        <p className="font-normal text-xs text-[#332929] dark:text-[#F9F9F9]">
          This is a preview of how other users will see your card.
        </p>
        {cell.set && (
          <MarketItemCell
            id={cell.id}
            stateIcon={cell.condition_icon}
            state={cell.condition}
            images={cell.images}
            location={cell.location}
            price={cell.price}
            series={cell.series}
            set={cell.set}
            sellerID={cell.seller_id}
            isLiked={cell.is_liked}
          />
        )}
        <p className="max-w-[360px] sm:max-w-[405px] color-[#1D1C1C] dark:color-white">
          Set description: {description}
        </p>
      </div>
      <div
        className={
          tab === 'loading' ? 'flex flex-col gap-6 items-center' : 'hidden'
        }
      >
        <p className="font-normal text-xs text-[#332929] dark:text-[#F9F9F9]">
          Your set is publishing. Please stay at this page.
        </p>
        <Loader />
      </div>
      <div
        className={
          tab === 'final' ? 'flex flex-col gap-6 items-center' : 'hidden'
        }
      >
        <CongratsIcon className="iconstrokes" />
        <p className="text-lg max-w-[360px] sm:max-w-[494px] text-center text-cellink dark:color-white">
          Thank you for your submission! Your request has been sent for
          moderation and is currently being reviewed. Please await approval.
        </p>
      </div>
      <div
        className={
          tab === 'loading' ? 'hidden' : 'flex justify-center gap-4 mt-10'
        }
      >
        <Button
          className="!h-10 text-lg text-tab bg-prev dark:bg-prevdark dark:text-white hover:bg-prev transition-all hover:brightness-95 active:brightness-90"
          onClick={() =>
            tab === 'primary'
              ? navigateFn('/catalog/select')
              : tab === 'final'
                ? toUploads()
                : tabChanged(tabs[tabIndex - 1])
          }
        >
          {tab === 'primary'
            ? 'Cancel'
            : tab === 'final'
              ? 'Go to my uploads'
              : 'Previous step'}
        </Button>
        <Button className="!h-10 text-lg text-celllink" onClick={handleNext}>
          {tab === 'images' || tab === 'preview'
            ? 'Finish'
            : tab === 'final'
              ? 'Exit to catalog'
              : 'Next step'}
        </Button>
      </div>
    </div>
  );
};

export default AddMarketItemPage;
