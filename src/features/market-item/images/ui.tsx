import { useParams } from 'react-router-dom';
import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import React from 'react';
import { FilesFieldAdapter } from '../../../shared/ui/form-adapters.tsx';
import { MarketItemPreview } from '../../../entities/market-item';
import { FormError } from '../../../shared/ui/form-error.tsx';
import { useForm } from 'effector-forms';

export const MarketItemImagesForm = () => {
  const params = useParams<'id'>();
  useGate(model.gate, { id: params.id ?? null });

  const { fields, eachValid } = useForm(model.form);
  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    model.form.submit();
  }

  return (
    <form onSubmit={onSubmit}>
      <FilesFieldAdapter
        field={model.form.fields.images}
        labelText="Market item images"
        accept=".jpg, .jpeg, .png"
      />
      <div className="max-w-sm w-full">
        <Preview />
      </div>
      {!eachValid && <FormError>{fields.images.errorText()}</FormError>}
    </form>
  );
};

const Preview = () => {
  return (
    <MarketItemPreview images={useUnit(model.form.fields.images.$value)} />
  );
};
