import { useGate } from 'effector-react';
import { useParams } from 'react-router-dom';
import * as model from './model';
import { FormEvent } from 'react';
export const MarketItemForm = () => {
  const params = useParams<'id'>();
  useGate(model.Gate, { id: params.id ?? null });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    model.form.submit();
  };

  return <form onSubmit={onSubmit}></form>;
};
