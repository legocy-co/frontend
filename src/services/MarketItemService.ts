import { MarketItem, MarketItemSchema } from '../types/MarketItemType.ts';
import axios from 'axios';
import { handleIncorrectParse } from './ErrorHandlers.ts';

interface MarketItemService {
  GetMarketItems: () => Promise<MarketItem[]>;
  CreateMarketItem: (marketItem: MarketItem) => Promise<boolean>;
  GetMarketItemsAuthorized: () => Promise<MarketItem[]>;
  GetMarketItem: (id: number | string) => Promise<MarketItem>;
  UpdateMarketItem: (id: number, marketItem: MarketItem) => Promise<MarketItem>;
  DeleteMarketItem: (id: number) => Promise<boolean>;
}

type MarketItemResponse = {
  data: object | object[];
  meta: object;
};

const GetMarketItems = async (): Promise<MarketItem[]> => {
  const response = await axios.get<MarketItemResponse>('/market-items/');
  const result = MarketItemSchema.array().safeParse(response.data.data);
  if (!result.success)
    return handleIncorrectParse(result.error, 'GetMarketItems');

  return result.data;
};

const CreateMarketItem = async (marketItem: MarketItem): Promise<boolean> => {
  await axios.post('/market-items/', marketItem);
  console.log(`marketItem created`);

  return Promise.resolve(true);
};

const GetMarketItemsAuthorized = async (): Promise<MarketItem[]> => {
  const response = await axios.get<MarketItemResponse>(
    '/market-items/authorized/'
  );
  const result = MarketItemSchema.array().safeParse(response.data.data);
  if (!result.success)
    return handleIncorrectParse(result.error, 'GetMarketItemsAuthorized');

  return result.data;
};

const GetMarketItem = async (id: number | string): Promise<MarketItem> => {
  const response = await axios.get<MarketItemResponse>('/market-items/' + id);
  const result = MarketItemSchema.safeParse(response.data.data);
  if (!result.success)
    return handleIncorrectParse(result.error, 'GetMarketItem');

  return result.data;
};

const UpdateMarketItem = async (
  id: number,
  marketItem: MarketItem
): Promise<MarketItem> => {
  await axios.patch('/market-items/' + id, marketItem);
  console.log(`marketItem updated`);

  return Promise.resolve(marketItem);
};

const DeleteMarketItem = async (id: number): Promise<boolean> => {
  await axios.delete('/market-items/' + id);
  console.log('marketItem deleted');

  return Promise.resolve(true);
};

export const marketItemService: MarketItemService = {
  GetMarketItems: GetMarketItems,
  CreateMarketItem: CreateMarketItem,
  GetMarketItemsAuthorized: GetMarketItemsAuthorized,
  GetMarketItem: GetMarketItem,
  UpdateMarketItem: UpdateMarketItem,
  DeleteMarketItem: DeleteMarketItem,
};
