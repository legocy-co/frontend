import { createGate } from 'effector-react';
import { NavigateFunction } from 'react-router-dom';
import { createEffect, sample } from 'effector';
import { csf } from '../../../features/collection';

export const gate = createGate<{ navigate: NavigateFunction }>();

const $navigate = gate.state.map(({ navigate }) => navigate);

const introRedirectFX = createEffect((navigate: NavigateFunction) =>
  navigate('/collection/intro')
);

const collectionRedirectFX = createEffect((navigate: NavigateFunction) =>
  navigate('/collection')
);

sample({
  clock: csf.formClosed,
  source: $navigate,
  target: introRedirectFX,
});

sample({
  clock: csf.collectionUpdated,
  source: $navigate,
  target: collectionRedirectFX,
});
