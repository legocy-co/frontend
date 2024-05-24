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

export const MarketItemUpdateForm = () => {
  const params = useParams<'id'>();
  const navigateFn = useNavigate();
  useGate(model.gate, { id: params.id ?? null, navigateFn });

  const { fields, eachValid } = useForm(model.form);

  const legoSets = useUnit(lso.$legoSetOptions);
  // const initialValues = useUnit(model.$initialValues);

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    model.form.submit();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
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
      <div className="flex gap-5">
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
      <div className="mb-5 max-w-[468px]">
        <Preview />
      </div>
      <div className="flex justify-center">
        {!eachValid && (
          <FormError>
            {fields.legoSetID.errorText() ||
              fields.setState.errorText() ||
              fields.price.errorText() ||
              fields.country.errorText() ||
              fields.city.errorText()}
          </FormError>
        )}
        {params.id && (
          <Button type="submit" className="mt-20 !w-56">
            Update Market Item
          </Button>
        )}
      </div>
    </form>
  );
};

const Preview = () => {
  const imagesValue = useUnit(model.form.fields.images.$value);

  const [value, setValue] = useState(imagesValue);

  const { onChange } = useField(model.form.fields.images);

  useEffect(() => {
    onChange([]);
  }, []);

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
      images={value}
      handleDelete={handleDelete}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  );
};
