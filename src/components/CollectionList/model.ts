import { CollectionSet } from '../../types/CollectionSetType.ts';
import { setStates } from '../../types/MarketItemType.ts';
import { Valuation } from '../../types/ValuationType.ts';

export type CollectionCell = {
  id: number;
  buy_price: number;
  series: string;
  set: string;
  set_number: number;
  set_id: number;
  condition: string;
  valuation?: number;
};

export function toCollectionCells(
  collectionSets: CollectionSet[],
  valuations: Valuation[]
): CollectionCell[] {
  return collectionSets.map((set) => ({
    id: set.id,
    buy_price: set.buy_price,
    series: set.lego_set.series.name,
    set: set.lego_set.name,
    set_number: set.lego_set.number,
    set_id: set.lego_set.number,
    condition: setStates[set.state as keyof typeof setStates],
    valuation: valuations.find(
      (valuation) =>
        valuation.lego_set.id === set.lego_set.id &&
        valuation.state === set.state
    )?.valuation,
  }));
}
