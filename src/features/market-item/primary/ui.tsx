import { useUnit } from 'effector-react';
import * as model from './model.ts';
import { useForm } from 'effector-forms';
import {
  SelectSearchAdapter,
  TextareaFieldAdapter,
} from '../../../shared/ui/form-adapters.tsx';
import { FormError } from '../../../shared/ui/form-error.tsx';
import { lso } from '../../lego-set/options/index.ts';
import { setStates } from '../../../types/MarketItemType.ts';
import { LazySvg } from '../../../shared/ui/lazy-svg.tsx';
import ChevronUpIcon from '../../../assets/icons/chevron-up.svg?react';
import clsx from 'clsx';

export const MarketItemPrimaryForm = () => {
  const legoSets = useUnit(lso.$legoSetOptions);
  const { fields, eachValid } = useForm(model.form);
  const selectedState = useUnit(model.form.fields.setState.$value);

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-xl text-label dark:text-darkfilterstext">Set name</p>
        <div className="relative w-[360px] sm:w-[470px]">
          <SelectSearchAdapter
            clientSideSearch
            field={model.form.fields.legoSetID}
            labelText=""
            options={legoSets.map((legoSet) => ({
              value: legoSet.id,
              label: `${legoSet.number} - ${legoSet.name}`,
            }))}
            variant="primary"
            className="!text-label dark:!text-darkfilterstext !w-[360px] sm:!w-[470px] !h-[48px] !rounded-lg !bg-pagesize dark:!bg-dark"
          />
          <ChevronUpIcon className="absolute rotate-180 opacity-50 top-5 right-4 iconstrokes" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl text-label dark:text-darkfilterstext">
          Set state
        </p>
        <p className="text-sm font-normal text-subtitle dark:text-darkfilterstext dark:text-opacity-85">
          Choose a condition that best describes your set
        </p>
        <div className="flex flex-wrap !w-[360px] sm:!w-[466px] gap-[10px] mb-2">
          {...Object.entries(setStates).map((state) => (
            <div
              key={'state-' + state}
              className={clsx(
                'h-[30px] flex items-center px-3 text-state gap-2 bg-pagesize rounded-[19px] cursor-pointer dark:!bg-dark dark:text-darkstate',
                {
                  '!bg-dark !text-white dark:!text-darkstatefocus dark:!bg-darkstatebg':
                    selectedState === state[0],
                }
              )}
              onClick={() =>
                model.form.fields.setState.onChange(state[0] as any)
              }
            >
              <LazySvg name={state[0]} className="w-5" />
              <p className="text-[10px]">{state[1]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl text-label dark:text-darkfilterstext">
          Description
        </p>
        <p className="text-sm font-normal text-subtitle w-[360px] sm:w-[450px] dark:text-darkfilterstext dark:text-opacity-85">
          Here you can provide additional details, such as elaborating on the
          condition of the item, preferred communication method, etc
        </p>
        <TextareaFieldAdapter
          field={model.form.fields.description}
          labelText="Ex. Set is missing a few insignificant pieces, but overall, it’s in great condition. Bought it two months ago."
          className="!w-[360px] sm:!w-[471px] !min-h-[108px] !rounded-lg !pl-5 !pt-5 !pr-16 !pb-16 !bg-pagesize !border-none !text-label dark:!text-darkfilterstext dark:!bg-dark"
        />
      </div>
      <div className="flex justify-center">
        {!eachValid && (
          <FormError>
            {fields.legoSetID.errorText() || fields.setState.errorText()}
          </FormError>
        )}
      </div>
    </form>
  );
};
