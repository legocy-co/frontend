import { useUnit } from 'effector-react';
import * as model from './model.ts';
import { useForm } from 'effector-forms';
import {
  SelectMenuAdapter,
  SelectSearchAdapter,
  TextareaFieldAdapter,
} from '../../../shared/ui/form-adapters.tsx';
import { FormError } from '../../../shared/ui/form-error.tsx';
import { lso } from '../../lego-set/options/index.ts';
import ChevronUpIcon from '../../../assets/icons/chevron-up.svg?react';
import { sso } from '../../set-state/options/index.ts';
import { setStates } from '../../../types/MarketItemType.ts';

export const MarketItemPrimaryForm = () => {
  const legoSets = useUnit(lso.$legoSetOptions);
  const { fields, eachValid } = useForm(model.form);

  return (
    <form className="flex flex-col gap-4 w-80 sm:w-[470px]">
      <div className="flex flex-col gap-2">
        <p className="text-xl text-[#332929] dark:text-[#F9F9F9]">Set name</p>
        <div className="relative w-80 sm:w-[470px]">
          <SelectSearchAdapter
            clientSideSearch
            field={model.form.fields.legoSetID}
            labelText=""
            options={legoSets.map((legoSet) => ({
              value: legoSet.id,
              label: `${legoSet.number} - ${legoSet.name}`,
            }))}
            className="!w-full !h-[48px] !rounded-lg !bg-pagesize dark:!bg-dark"
          />
          <ChevronUpIcon className="absolute rotate-180 opacity-50 top-6 right-4 iconstrokes" />
        </div>
      </div>
      <SelectMenuAdapter
        label="Set state"
        description="Choose a condition that best describes your set"
        options={sso.setStateOptions.slice(1)}
        field={model.form.fields.setState}
        icons={Object.keys(setStates)}
      />
      <div className="flex flex-col gap-2">
        <p className="text-xl text-[#332929] dark:text-[#F9F9F9]">
          Description
        </p>
        <p className="text-sm font-normal text-[#242020] sm:w-[450px] dark:text-[#F9F9F9] text-opacity-85">
          Here you can provide additional details, such as elaborating on the
          condition of the item, preferred communication method, etc
        </p>
        <TextareaFieldAdapter
          field={model.form.fields.description}
          labelText="Ex. Set is missing a few insignificant pieces, but overall, it’s in great condition. Bought it two months ago."
          className="sm:!w-[471px] !min-h-[108px] !rounded-lg !pl-5 !pt-5 !pr-16 !pb-16 !bg-pagesize !border-none !text-[#332929] dark:!text-[#F9F9F9] dark:!bg-dark"
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
