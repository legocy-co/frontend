import { useGate, useUnit } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';
import * as model from './model.ts';
import {
  NumberFieldAdapter,
  SelectFieldAdapter,
  SelectSearchAdapter,
  TextareaFieldAdapter,
} from '../../../shared/ui/form-adapters.tsx';
import { FormError } from '../../../shared/ui/form-error.tsx';
import { useField, useForm } from 'effector-forms';
import { lso } from '../../lego-set/options/index.ts';
import { Button } from '../../../shared/ui/button.tsx';
import { lo } from '../../location/options/index.ts';
import { sso } from '../../set-state/options/index.ts';
import ChevronUpIcon from '../../../assets/icons/chevron-up.svg?react';
import LocationIcon from '../../../assets/icons/location.svg?react';
import React, { useEffect, useState } from 'react';
import { MarketItemPreview } from '../../../entities/market-item/images';
import ConfirmationModal from '../../../components/ConfirmationModal';

export const MarketItemUpdateForm = () => {
  const params = useParams<'id'>();
  const navigateFn = useNavigate();
  useGate(model.gate, { id: params.id ?? null, navigateFn });

  const { fields, eachValid } = useForm(model.form);

  const legoSets = useUnit(lso.$legoSetOptions);
  // const initialValues = useUnit(model.$initialValues);

  const [showSold, setShowSold] = useState(false);
  const [soldPrice, setSoldPrice] = useState(120);

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    model.form.submit();
  }

  function handleSold(ev: React.FormEvent) {
    ev.preventDefault();

    fields.price.onChange(soldPrice);
    fields.isSold.onChange(true);

    model.form.submit();
  }

  useEffect(() => {
    showSold && setSoldPrice(fields.price.value);
  }, [showSold]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-xl text-[#332929] dark:text-[#F9F9F9]">Set name</p>
        <div className="relative w-80 sm:w-[468px]">
          <SelectSearchAdapter
            clientSideSearch
            field={model.form.fields.legoSetID}
            labelText=""
            options={legoSets.map((legoSet) => ({
              value: legoSet.id,
              label: `${legoSet.number} - ${legoSet.name}`,
            }))}
            className="!w-full !h-12 !rounded-lg !bg-pagesize dark:!bg-dark"
          />
          <ChevronUpIcon className="absolute rotate-180 opacity-50 top-5 right-4 iconstrokes" />
        </div>
      </div>
      <div className="flex w-80 sm:w-[468px] justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xl text-[#332929] dark:text-[#F9F9F9]">
            Set state
          </p>
          <div className="relative h-12 w-[185] sm:w-[257px] styled-select">
            <SelectFieldAdapter
              field={model.form.fields.setState}
              options={sso.setStateOptions}
              defaultOptionValue=""
              className="!w-full !h-12 !rounded-lg !bg-pagesize dark:!bg-dark"
            />
            <ChevronUpIcon className="absolute rotate-180 opacity-50 top-5 right-4 iconstrokes" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl text-[#332929] dark:text-[#F9F9F9]">Price, $</p>
          <NumberFieldAdapter
            field={model.form.fields.price}
            labelText=""
            className="!w-[109px] sm:!w-[159px] !h-12 bg-pagesize"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-80 sm:w-[468px]">
        <p className="text-xl text-[#332929] dark:text-[#F9F9F9]">
          Description
        </p>
        <p className="text-sm font-normal text-[#242020] w-[360px] sm:w-[450px] dark:text-[#F9F9F9] text-opacity-85">
          Here you can provide additional details, such as elaborating on the
          condition of the item, preferred communication method, etc
        </p>
        <TextareaFieldAdapter
          field={model.form.fields.description}
          labelText="Ex. Set is missing a few insignificant pieces, but overall, it’s in great condition. Bought it two months ago."
          className="!w-full !min-h-[108px] !rounded-lg !pl-5 !pt-5 !pr-16 !pb-16 !bg-pagesize !border-none !text-[#332929] dark:!text-[#F9F9F9] dark:!bg-dark"
        />
      </div>
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
              className="!rounded-lg !text-darkfiltersborder border-none !bg-pagesize dark:!bg-dark !h-12 !w-[132px] sm:!w-[225px]"
            />
            <ChevronUpIcon className="absolute rotate-180 opacity-50 top-5 right-4 iconstrokes pointer-events-none" />
          </div>
          <div className="relative">
            <SelectFieldAdapter
              field={model.form.fields.city}
              options={lo.cityOptions(fields.country.value)}
              disabled={fields.country.value === ''}
              defaultOptionValue=""
              className="!rounded-lg !text-darkfiltersborder border-none !bg-pagesize dark:!bg-dark !h-12 !w-[132px] sm:!w-[225px]"
            />
            <ChevronUpIcon className="absolute rotate-180 opacity-50 top-5 right-4 iconstrokes pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="mb-5 max-w-[675px] flex justify-center">
        <Preview />
      </div>
      <Button
        className="text-lg !h-12 !w-[340px]"
        onClick={() => setShowSold(true)}
      >
        Listing Is Sold
      </Button>
      <div className="flex justify-center">
        {!eachValid && (
          <FormError>
            {fields.legoSetID.errorText() ||
              fields.setState.errorText() ||
              fields.price.errorText() ||
              fields.country.errorText() ||
              fields.city.errorText() ||
              fields.images.errorText()}
          </FormError>
        )}
        {params.id && (
          <Button type="submit" className="mt-20 !w-56">
            Update Market Item
          </Button>
        )}
      </div>
      {showSold && (
        <ConfirmationModal
          className="!w-[588px] dark:!bg-dark !text-lg !font-medium !gap-6 dark:!text-description"
          show={showSold}
          onClose={() => setShowSold(false)}
          showYes={false}
        >
          <p className="font-bold text-[2rem]">Mark Listing as Sold?</p>
          <p>Once you mark this listing as sold, you cannot reactivate it.</p>
          <div className="flex flex-col items-center gap-2">
            <p>My offer for the set was:</p>
            <input
              value={soldPrice ? soldPrice + '$' : '$'}
              className="border-none bg-transparent font-semibold text-[3.125rem] text-confirmmodal dark:text-description text-opacity-35 dark:text-opacity-35 outline-0 text-center"
              onChange={(ev) =>
                setSoldPrice(Number(ev.currentTarget.value.replace('$', '')))
              }
            />
          </div>
          <div className="flex gap-6 ">
            <Button
              className="!text-lg !h-12 !w-48"
              type="submit"
              onClick={handleSold}
            >
              Confirm
            </Button>
            <Button
              className="!text-lg !h-12 !w-48 bg-prevdark"
              onClick={() => setShowSold(false)}
            >
              Cancel
            </Button>
          </div>
        </ConfirmationModal>
      )}
    </form>
  );
};

const Preview = () => {
  const imagesValue = useUnit(model.form.fields.images.$value);

  const [value, setValue] = useState(imagesValue);

  const { onChange } = useField(model.form.fields.images);

  useEffect(() => {
    imagesValue.length > 0 && setValue(imagesValue);
  }, [imagesValue.length]);

  function handleDelete(image: File) {
    const filtered = value.filter((img) => img !== image);
    setValue(filtered);
    onChange(filtered);
  }

  // assignment without re-rendering images (state change causes flickering)
  let currentFile: File;

  const handleDragStart = (_: React.DragEvent<HTMLDivElement>, item: File) => {
    currentFile = item;
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, item: File) => {
    e.preventDefault();

    const rePositionedImages = value.map((c: any, i) => {
      if (
        value.findIndex((e) => e === c) === value.findIndex((e) => e === item)
      ) {
        c.order_index = value.findIndex((e) => e === currentFile);
        return c;
      }

      if (
        value.findIndex((e) => e === c) ===
        value.findIndex((e) => e === currentFile)
      ) {
        c.order_index = value.findIndex((e) => e === item);
        return c;
      }
      c.order_index = i;
      return c;
    });

    const sortedImages = rePositionedImages
      .sort((a, b) => a.order_index - b.order_index)
      .map((obj: any) => {
        console.log(obj);
        delete obj.order_index;
        return obj as File;
      }) as File[];

    setValue(sortedImages);
    onChange(sortedImages);
  };

  return (
    <MarketItemPreview
      variant="update"
      images={value}
      handleDelete={handleDelete}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onChange={onChange}
    />
  );
};
