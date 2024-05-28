import { useParams } from 'react-router-dom';
import { useGate } from 'effector-react';
import * as model from './model.ts';
import React, { useEffect } from 'react';
import { MarketItemPreview } from '../../../entities/market-item/images';
import { FormError } from '../../../shared/ui/form-error.tsx';
import { useField, useForm } from 'effector-forms';
import { handleUploadFile } from '../../../services/utils.ts';

export const MarketItemImagesForm = () => {
  const params = useParams<'id'>();
  useGate(model.gate, { id: params.id ?? null });

  const { fields, eachValid } = useForm(model.form);
  const { onChange, value } = useField(model.form.fields.images);

  return (
    <form className="flex flex-col gap-4 text-center items-center">
      <p className="text-lg text-[#332929] dark:text-[#F9F9F9]">
        Add images of your set
      </p>
      <p className="font-normal max-w-[360px] sm:max-w-[565px] text-xs text-[#332929] dark:text-[#F9F9F9]">
        The first image will serve as the thumbnail. The thumbnail is the main
        photo displayed on the item card within the catalog. We recommend
        selecting a photo that effectively showcases the entire set.{' '}
        {value.length > 0 && 'Drag the images to change their order.'}
      </p>
      <div>
        <input
          id="images_upload"
          type="file"
          placeholder=""
          multiple
          onChange={(e) => handleUploadFile(e, value, onChange)}
          accept=".jpg, .jpeg, .webp, .heic"
          className="hidden"
        />
        <label
          htmlFor="images_upload"
          className={
            value.length < 5
              ? 'text-center px-8 py-2 cursor-pointer bg-legocy rounded-md text-[#1C1C1C] text-lg transition-all hover:bg-brightness-95 active:bg-brightness-90'
              : 'hidden'
          }
        >
          Add image
        </label>
      </div>
      <div className="my-5">
        <Preview />
      </div>
      <p className="font-normal max-w-[360px] sm:max-w-[565px] text-xs text-[#332929] dark:text-[#F9F9F9]">
        We recommend to upload high-resolution photos from various angles to
        showcase your product effectively and attract potential buyers.
      </p>
      <div className="flex justify-center">
        {!eachValid && <FormError>{fields.images.errorText()}</FormError>}
      </div>
    </form>
  );
};

const Preview = () => {
  const { value, onChange } = useField(model.form.fields.images);

  useEffect(() => {
    onChange([]);
  }, []);

  function handleDelete(image: File) {
    const filtered = value.filter((img) => img !== image);
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

    onChange(
      rePositionedImages
        .sort((a, b) => a.order_index - b.order_index)
        .map((obj: any) => {
          delete obj.order_index;
          return obj as File;
        }) as File[]
    );
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
