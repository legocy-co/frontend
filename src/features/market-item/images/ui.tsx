import { useParams } from 'react-router-dom';
import { useGate } from 'effector-react';
import * as model from './model.ts';
import React, { useEffect } from 'react';
import { MarketItemPreview } from '../../../entities/market-item';
import { FormError } from '../../../shared/ui/form-error.tsx';
import { useField, useForm } from 'effector-forms';

export const MarketItemImagesForm = () => {
  const params = useParams<'id'>();
  useGate(model.gate, { id: params.id ?? null });

  const { fields, eachValid } = useForm(model.form);
  const { onChange, value } = useField(model.form.fields.images);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).map((file) => value.push(file));

      const transfer = new DataTransfer();
      value.map((file) => transfer.items.add(file));
      e.target.files = transfer.files;

      const files = [] as File[];
      files.push(...value);

      onChange(files);
    }
  };

  return (
    <form className="flex flex-col gap-4 text-center items-center">
      <p className="text-lg text-label dark:text-darkfilterstext">
        Add images of your set
      </p>
      <p className="font-normal max-w-[360px] sm:max-w-[565px] text-xs text-label dark:text-darkfilterstext">
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
          onChange={handleUpload}
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
      <div className="mb-5">
        <Preview />
      </div>
      <p className="font-normal max-w-[360px] sm:max-w-[565px] text-xs text-label dark:text-darkfilterstext">
        We recommend to upload high-resolution photos from various angles to
        showcase your product effectively and attract potential buyers.
      </p>
      {!eachValid && <FormError>{fields.images.errorText()}</FormError>}
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

  return <MarketItemPreview images={value} handleDelete={handleDelete} />;
};
