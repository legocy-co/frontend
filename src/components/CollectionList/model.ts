import { setStates } from '../../types/MarketItemType.ts';
import { CollectionSet } from '../../types/CollectionType.ts';

export type CollectionCell = {
  buyPrice: number;
  condition: string;
  id: number;
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
