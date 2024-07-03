import { attach, createEffect, createEvent, sample } from 'effector';
import { authService } from '../../services/AuthService.ts';
import { SignInData } from '../../types/authorization.ts';
import { IResolveParams } from 'reactjs-social-login';
import { $location, navigateFx } from '../../shared/lib/react-router.ts';

export const loggedOut = createEvent();

export const tokenRefreshed = createEvent();

export const googleTokenFetched = createEvent<string>();

export const fbDataFetched = createEvent();

const $from = $location.map((loc) =>
  loc ? new URLSearchParams(loc.search).get('from') ?? '/' : '/'
);

export const redirectBackFX = attach({
  source: $from,
  effect: (from) => navigateFx({ pathname: from === '/auth' ? '/' : from }),
});

export const googleAuthFX = createEffect((token: string) =>
  authService.GoogleSignIn({ token })
);

export const fbAuthFX = createEffect((data: typeof IResolveParams.data) =>
  authService.FacebookSignIn({
    email: data.email,
    facebook_id: data.id,
    username: data.name,
  })
);

// AuthService
export const signInFx = createEffect((values: SignInData) =>
  authService.SignIn({
    email: values.email,
    password: values.password,
  })
);

sample({
  clock: [googleAuthFX.done, fbAuthFX.done, signInFx.done],
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
