import { createGate } from 'effector-react';
import { $location, navigateFx } from '../../shared/lib/react-router';
import { attach, sample } from 'effector';
import * as signInModel from '../../features/sign-in/model';
import { AuthService } from '../../services/AuthService.tsx';

export const Gate = createGate();

const getFrom = (search: string | null) => {
  if (!search) return '/';

  const params = new URLSearchParams(search);
  const from = params.get('from');
  return from ?? '/';
};

const $from = $location.map((loc) => getFrom(loc?.search ?? null));
const redirectBackFx = attach({
  source: $from,
  effect: (from) => {
    navigateFx({
      pathname: from,
    });
  },
});

sample({
  clock: Gate.open,
  filter: () => AuthService.IsAuthorized(),
  target: redirectBackFx,
});

sample({
  clock: signInModel.signedIn,
  target: redirectBackFx,
});
