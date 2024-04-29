import { useField, useForm } from 'effector-forms';
import * as model from './model.ts';
import { FormError } from '../../../shared/ui/form-error.tsx';
import { SelectFieldAdapter } from '../../../shared/ui/form-adapters.tsx';
import { lo } from '../../location/options/index.ts';
import ChevronUpIcon from '../../../assets/icons/chevron-up.svg?react';
import LocationIcon from '../../../assets/icons/location.svg?react';
import { useUnit } from 'effector-react';
import LegoMan from '../../../assets/pics/lego-man.png';
import { addDefaultSrc } from '../../../services/utils.ts';
import { LazySvg } from '../../../shared/ui/lazy-svg.tsx';
import { useEffect, useState } from 'react';

export const MarketItemSecondaryForm = () => {
  const { fields, eachValid } = useForm(model.form);
  const stateValuation = useUnit(model.$stateValuation);
  const price = useField(model.form.fields.price);

  const lessPrice = Math.min(price.value, stateValuation);
  const greaterPrice = Math.max(price.value, stateValuation);

  const indentRes = Math.round((lessPrice / greaterPrice) * 10);
  const indent = indentRes > 8 ? 8 : indentRes;

  const lessLegocy = lessPrice === stateValuation;

  const legocyLogo = (
    <img
      className="absolute bottom-8 min-w-10"
      src="/logo.svg"
      alt=""
      onError={addDefaultSrc}
    />
  );

  const userImage = (
    <img
      className="min-w-7 min-h-7 absolute bottom-8 object-cover rounded-full"
      src={LegoMan}
      onError={addDefaultSrc}
      alt=""
    />
  );

  const [mark, setMark] = useState<string>();

  useEffect(() => {
    if (stateValuation === 0) {
      setMark('none');
    } else if (price.value < stateValuation / 1.25) {
      setMark('below');
    } else if (
      price.value > stateValuation * 1.25 &&
      price.value <= stateValuation * 1.5
    ) {
      setMark('above');
    } else if (price.value > stateValuation * 1.5) {
      setMark('high');
    } else {
      setMark('fair');
    }
  }, [stateValuation, price.value]);

  function renderMark() {
    switch (mark) {
      case 'none':
        return (
          <div className="flex w-[360px] sm:w-[781px] p-3 border border-solid border-black dark:border-white dark:bg-white dark:bg-opacity-20 rounded-md items-center justify-around gap-2 mt-10 text-[#2E2626] dark:text-white">
            <LazySvg name={mark} className="w-10 iconfills" />
            We currently don&apos;t have enough information on the market price
            of this set to provide a recommendation. We suggest checking out
            other similar listings to determine an appropriate price.
          </div>
        );
      case 'below':
        return (
          <div className="flex w-[360px] sm:w-[710px] p-3 text-lg text-[#363535] dark:text-white bg-below dark:bg-white !bg-opacity-20 rounded-md items-center justify-around gap-2 mt-10">
            <LazySvg name={mark} className="w-10 iconfills" />
            Below market average: Your price is lower than what is typically
            seen on the market.
          </div>
        );
      case 'above':
        return (
          <div className="flex w-[360px] sm:w-[780px] p-3 text-lg text-[#FCB11F] dark:text-legocy bg-above dark:bg-abovedark !bg-opacity-20 rounded-md items-center justify-around gap-2 mt-10">
            <LazySvg name={mark} className="w-10" />
            Slightly above market average: Your price is somewhat higher than
            the average market price.
          </div>
        );
      case 'high':
        return (
          <div className="flex w-[360px] sm:w-[824px] p-3 text-lg text-[#FF6464] dark:text-[#FF6464] bg-high !bg-opacity-20 rounded-md items-center justify-around gap-2 mt-10">
            <LazySvg name={mark} className="w-10" />
            Significantly above market average: Your price is considerably
            higher than the average market price.
          </div>
        );
      case 'fair':
        return (
          <div className="flex w-[360px] sm:w-[576px] p-3 text-lg text-[#568824] dark:text-[#BDFF7A] bg-fair dark:bg-fairdark !bg-opacity-20 rounded-md items-center justify-around gap-2 mt-10">
            <LazySvg name={mark} className="w-10" />
            Fair price: Your price aligns closely with the current market
            standard
          </div>
        );
    }
  }

  return (
    <form className="flex flex-col gap-8 items-center">
      <div className="flex flex-col gap-2">
        <p className="text-xl text-[#332929] dark:text-[#F9F9F9] flex items-center gap-2">
          Location <LocationIcon className="iconfills inline" />
        </p>
        <div className="flex items-center gap-4 styled-select">
          <div className="relative">
            <SelectFieldAdapter
              field={model.form.fields.country}
              options={lo.countryOptions}
              defaultOptionValue=""
              variant="primary"
              className="!rounded-lg !text-darkfiltersborder !bg-pagesize !h-12 !w-[150px] sm:!w-[226px]"
            />
            <ChevronUpIcon className="absolute rotate-180 opacity-50 top-3 right-3 iconstrokes pointer-events-none" />
          </div>
          <div className="relative">
            <SelectFieldAdapter
              field={model.form.fields.city}
              options={lo.cityOptions(fields.country.value)}
              disabled={fields.country.value === ''}
              defaultOptionValue=""
              variant="primary"
              className="!rounded-lg !text-darkfiltersborder !bg-pagesize !h-12 !w-[150px] sm:!w-[226px]"
            />
            <ChevronUpIcon className="absolute rotate-180 opacity-50 top-3 right-3 iconstrokes pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl text-[#332929] dark:text-[#F9F9F9]">Price, $</p>
        <input
          type="number"
          placeholder="100"
          className="border-none bg-transparent font-semibold text-[3.125rem] text-gray-400 outline-0 text-center"
          onChange={(ev) =>
            fields.price.onChange(Number(ev.currentTarget.value))
          }
        />
      </div>
      {stateValuation > 0 && (
        <div className="relative w-[360px] sm:w-[468px] mt-10">
          <div className="w-full border border-solid border-statevaluationchart dark:border-white"></div>
          <div className="absolute top-[-4px] flex justify-between w-full">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={'split-' + i}
                className="h-[10px] w-0.5 relative border border-solid border-statevaluationchart"
              >
                {(i === indent && (
                  <div
                    className={
                      'h-5 w-5 flex items-center justify-center top-[-7px] right-[-7px] absolute rounded-full text-sm ' +
                      (lessLegocy
                        ? 'bg-legocy dark:text-legocy'
                        : 'bg-black dark:bg-white')
                    }
                  >
                    <div className="absolute top-8">{lessPrice}$</div>
                    {lessLegocy ? legocyLogo : userImage}
                  </div>
                )) ||
                  (19 - indent === i && (
                    <div
                      className={
                        'h-5 w-5 flex items-center justify-center top-[-7px] right-[-7px] absolute rounded-full text-sm ' +
                        (lessLegocy
                          ? 'bg-black dark:bg-white'
                          : 'bg-legocy dark:text-legocy')
                      }
                    >
                      <div className="absolute top-8">{greaterPrice}$</div>
                      {lessLegocy ? userImage : legocyLogo}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
      {renderMark()}
      <div className="flex justify-center">
        {!eachValid && (
          <FormError>
            {fields.country.errorText() ||
              fields.city.errorText() ||
              fields.price.errorText()}
          </FormError>
        )}
      </div>
    </form>
  );
};
