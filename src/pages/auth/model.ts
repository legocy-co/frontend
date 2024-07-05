import { $location, navigateFx } from '../../shared/lib/react-router.ts';
import { attach, sample } from 'effector';
import { authService } from '../../services/AuthService.ts';
import { createGate } from 'effector-react';

export const gate = createGate();

// store current path
const $from = $location.map((loc) =>
  loc ? new URLSearchParams(loc.search).get('from') ?? '/' : '/'
);

export const redirectBackFX = attach({
  source: $from,
  effect: (from) => navigateFx({ pathname: from === '/auth' ? '/' : from }),
});

sample({
  clock: gate.open,
  filter: () => authService.IsAuthorized(),
  target: redirectBackFX,
});
