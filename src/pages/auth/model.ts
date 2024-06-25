import { createGate } from 'effector-react';
import { $location, navigateFx } from '../../shared/lib/react-router.ts';
import { attach, createEffect, createEvent, sample } from 'effector';
import { authService } from '../../services/AuthService.ts';
import { IResolveParams } from 'reactjs-social-login';

export const gate = createGate();

export const loggedOut = createEvent();

export const tokenRefreshed = createEvent();

export const googleTokenFetched = createEvent<string>();

export const fbDataFetched = createEvent();

// store previous path
const GetFrom = (search: string | null) => {
  if (!search) return '/';

  const params = new URLSearchParams(search);
  const from = params.get('from');
  return from ?? '/';
};

const $from = $location.map((loc) => GetFrom(loc?.search ?? null));

const redirectBackFX = attach({
  source: $from,
  effect: (from) =>
    navigateFx({
      pathname: from === '/auth/sign-in' ? '/' : from,
    }),
});

const googleAuthFX = createEffect((token: string) =>
  authService.GoogleSignIn({ token })
);

const fbAuthFX = createEffect((data: typeof IResolveParams.data) =>
  authService.FacebookSignIn({
    email: data.email,
    facebook_id: data.facebook_id,
    username: data.username,
  })
);

sample({
  clock: gate.open,
  filter: () => authService.IsAuthorized(),
  target: redirectBackFX,
});

sample({
  source: googleTokenFetched,
  target: googleAuthFX,
});

sample({
  source: fbDataFetched,
  target: fbAuthFX,
});

sample({
  clock: [googleAuthFX.done, fbAuthFX.done],
  target: redirectBackFX,
});
