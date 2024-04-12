import { setStates } from '../../types/MarketItemType.ts';
import { CollectionSet } from '../../types/CollectionType.ts';

export type CollectionCell = {
  id: number;
  buy_price: number;
  series: string;
  set: string;
  set_number: number;
  set_id: number;
  condition: string;
  valuation?: number;
  images: string[];
  total_return_percentage: number;
  total_return_usd: number;
};

export function toCollectionCells(
  collectionSets: CollectionSet[]
): CollectionCell[] {
  return collectionSets.map((set) => ({
    id: set.id,
    buy_price: set.buy_price,
    series: set.lego_set.series.name,
    set: set.lego_set.name,
    set_number: set.lego_set.number,
    set_id: set.lego_set.id,
    condition: setStates[set.state as keyof typeof setStates],
    valuation: set.valuation?.valuation,
    images: set.lego_set.images
      ? set.lego_set.images
          .sort(
            (current, next) => Number(current.is_main) - Number(next.is_main)
          )
          .map((img) => img.image_url)
      : [],
    total_return_percentage:
      Math.round(set.set_profits.total_return_percentage * 100) / 100,
    total_return_usd: set.set_profits.total_return_usd,
  }));
}
