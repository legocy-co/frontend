import { useParams } from 'react-router-dom';
import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { FormEvent } from 'react';
import { FileFieldAdapter } from '../../../shared/ui/form-adapters.tsx';
import { MarketItemPreview } from '../../../entities/market-item';

export const UploadMarketItemImageForm = () => {
  const params = useParams<'id'>();
  useGate(model.gate, { id: params.id ?? null });

  // const { fields, eachValid } = useForm(model.form);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    model.form.submit();
  };

  return (
    <form onSubmit={onSubmit}>
      <FileFieldAdapter
        field={model.form.fields.image}
        labelText="Market item image"
        accept=".jpg, .jpeg, .png"
      />
      <div className="max-w-sm w-full">
        <Preview />
      </div>
    </form>
  );
};

const Preview = () => {
  const image = useUnit(model.form.fields.image.$value);
  return <MarketItemPreview image={image} />;
};
