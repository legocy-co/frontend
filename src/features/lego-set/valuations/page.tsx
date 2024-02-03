import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { setStates } from '../../../types/MarketItemType.ts';

export const LegoSetDetailValuations = () => {
  const params = useParams<'id'>();
  const navigate = useNavigate();
  const detailValuations = useUnit(model.$detailValuations);

  useGate(model.gate, { id: params.id ?? null, navigate });

  const valuationsElement = Object.keys(setStates).map((state) => (
    <div className="flex flex-col gap-2">
      <p className="font-normal">
        {setStates[state as keyof typeof setStates]}
      </p>
      <p className="text-2xl">
        {detailValuations.find((valuation) => valuation.state === state)
          ? detailValuations.find((valuation) => valuation.state === state)
              ?.calculator + ' $'
          : 'Not estimated'}
      </p>
    </div>
  ));

  return (
    <div className="w-3/4 grid grid-flow-col gap-10 grid-rows-3 mt-8 transition-all">
      {valuationsElement}
    </div>
  );
};
