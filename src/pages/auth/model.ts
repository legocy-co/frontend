import { createGate } from 'effector-react';
import { $location, navigateFx } from '../../shared/lib/react-router.ts';
import { attach, sample } from 'effector';
import * as signInModel from '../../features/auth/sign-in/model.ts';
import { authService } from '../../services/AuthService.ts';

export const gate = createGate();

const GetFrom = (search: string | null) => {
  if (!search) return '/';

  const params = new URLSearchParams(search);
  const from = params.get('from');
  return from ?? '/';
};

const $from = $location.map((loc) => GetFrom(loc?.search ?? null));
const redirectBackFx = attach({
  source: $from,
  effect: (from) => {
    navigateFx({
      pathname: from,
    });
  },
});

sample({
  clock: gate.open,
  filter: () => authService.IsAuthorized(),
  target: redirectBackFx,
});

sample({
  clock: signInModel.signedIn,
  target: redirectBackFx,
});