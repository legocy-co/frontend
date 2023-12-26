import { MarketItem } from '../types/MarketItemType.ts';

interface MarketItemService {
  GetMarketItems: () => Promise<MarketItem[]>;
  CreateMarketItem: (marketItem: MarketItem) => Promise<boolean>;
  GetMarketItemsAuthorized: () => Promise<MarketItem[]>;
  GetMarketItem: (id: number) => Promise<MarketItem>;
  UpdateMarketItem: (id: number, marketItem: MarketItem) => Promise<MarketItem>;
  DeleteMarketItem: (id: number) => Promise<boolean>;
}
