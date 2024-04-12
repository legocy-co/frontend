import { CollectionSet } from '../../types/CollectionSetType.ts';
import { setStates } from '../../types/MarketItemType.ts';

export type CollectionCell = {
  buyPrice: number;
  condition: string;
  id: number;
  images: string[];
  series: string;
  set: string;
  setID: number;
  setNumber: number;
  totalReturnPercentage: number;
  totalReturnUSD: number;
  valuation?: number;
};

export function toCollectionCells(
  collectionSets: CollectionSet[]
): CollectionCell[] {
  return collectionSets.map((set) => ({
    buyPrice: set.buyPrice,
    condition: setStates[set.state as keyof typeof setStates],
    id: set.id,
    images: set.legoSet.images
      ? set.legoSet.images
          .sort((current, next) => Number(current.isMain) - Number(next.isMain))
          .map((img) => img.imageURL)
      : [],
    series: set.legoSet.series.name,
    set: set.legoSet.name,
    setID: set.legoSet.id,
    setNumber: set.legoSet.number,
    totalReturnPercentage:
      Math.round(set.setProfits.totalReturnPercentage * 100) / 100,
    totalReturnUSD: set.setProfits.totalReturnUSD,
    valuation: set.valuation?.valuation,
  }));
}
