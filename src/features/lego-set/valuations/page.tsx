import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { useNavigate, useParams } from 'react-router-dom';

export const LegoSetDetailValuations = () => {
  const params = useParams<'id'>();
  const navigate = useNavigate();
  const detailValuations = useUnit(model.$detailValuations);

  useGate(model.gate, { id: params.id ?? null, navigate });

  const detailValuationsElement = detailValuations.length ? (
    detailValuations.map((valuation) => (
      <p className="my-10" key={'valuation-' + valuation.id}>
        {valuation.state}: {valuation.calculator}$
      </p>
    ))
  ) : (
    <p>This set doesn&apos;t have valuations yet</p>
  );

  return <div>{detailValuationsElement}</div>;
};
