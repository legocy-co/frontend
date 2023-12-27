import { MarketItem, MarketItemSchema } from '../types/MarketItemType.ts';
import axios from 'axios';
import { handleIncorrectParse } from './ErrorHandlers.ts';

const GetMarketItems = async (): Promise<MarketItem[]> => {
  const response = await axios.get<MarketItem[]>('/market-items/');
  const result = MarketItemSchema.array().safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(result.error, 'GetMarketItems');

  return result.data;
};

interface MarketItemService {
  GetMarketItems: () => Promise<MarketItem[]>;
  CreateMarketItem: (marketItem: MarketItem) => Promise<boolean>;
  GetMarketItemsAuthorized: () => Promise<MarketItem[]>;
  GetMarketItem: (id: number) => Promise<MarketItem>;
  UpdateMarketItem: (id: number, marketItem: MarketItem) => Promise<MarketItem>;
  DeleteMarketItem: (id: number) => Promise<boolean>;
}

// export const MarketItemService: MarketItemService = {
//   GetMarketItems: GetMarketItems,
// };
