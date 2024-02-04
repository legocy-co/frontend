import { createStore } from 'effector';
import { CollectionSet } from '../../types/CollectionSetType.ts';
import { setStates } from '../../types/MarketItemType.ts';
import { Valuation } from '../../types/ValuationType.ts';

export type CollectionCell = {
  id: number;
  buy_price: number;
  lego_set: object;
  state: string;
  valuation_price?: number;
};

export const $collectionCells = createStore<CollectionCell[]>([]);

export function toCollectionCells(
  collectionSets: CollectionSet[],
  valuations: Valuation[]
): CollectionCell[] {
  return collectionSets.map((set) => ({
    id: set.id,
    buy_price: set.buy_price,
    lego_set: set.lego_set,
    state: setStates[set.state as keyof typeof setStates],
    valuation_price: valuations.find(
      (valuation) =>
        valuation.lego_set.id === set.lego_set.id &&
        valuation.state === set.state
    )?.valuation,
  }));
}
