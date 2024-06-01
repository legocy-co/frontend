import { createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';

export const wikiVisited = createEvent();

const $visited = createStore(false);

sample({
  clock: wikiVisited,
  fn: () => true,
  target: $visited,
});

persist({
  store: $visited,
  key: 'wikiVisited',
});
