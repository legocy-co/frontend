import { attach, createEvent, createStore, sample } from 'effector';
import {Location, NavigateFunction, To} from 'react-router-dom';

export const
    navigateChanged = createEvent<NavigateFunction>(),
    locationChanged = createEvent<Location>(),
    $location = createStore<null | Location>(null),
    $navigate = createStore<null | NavigateFunction>(null);

export const navigateFX = attach({
  source: $navigate,
  effect: (navigate, to: To) => {
    navigate && navigate(to);
  },
});

sample({
  clock: navigateChanged,
  target: $navigate,
});

sample({
  clock: locationChanged,
  target: $location,
});