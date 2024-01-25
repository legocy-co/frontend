import { createGate } from 'effector-react';
import { $location, navigateFx } from '../../shared/lib/react-router.ts';
import { attach, sample } from 'effector';
import { authService } from '../../services/AuthService.ts';
import { su } from '../../features/auth/sign-up/index.tsx';
import { si } from '../../features/auth/sign-in/index.tsx';

export const gate = createGate();

// store previous path
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

    // TODO: state components update
    window.location.reload();
  },
});

sample({
  clock: gate.open,
  filter: () => authService.IsAuthorized(),
  target: redirectBackFx,
});

sample({
  clock: si.signedIn,
  target: redirectBackFx,
});

sample({
  clock: gate.close,
  target: su.form.reset,
});
