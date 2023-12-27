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

const CreateMarketItem = async (marketItem: MarketItem): Promise<boolean> => {
  await axios.post('/market-items/');
  console.log(`marketItem №${marketItem.id} created`);

  return Promise.resolve(true);
};

const GetMarketItemsAuthorized = async (): Promise<MarketItem[]> => {
  const response = await axios.get<MarketItem[]>('/market-items/authorized/');
  const result = MarketItemSchema.array().safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(result.error, 'GetMarketItemsAuthorized');

  return result.data;
};

const GetMarketItem = async (id: number): Promise<MarketItem> => {
  const response = await axios.get<MarketItem>('/market-items/' + id);
  const result = MarketItemSchema.safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(result.error, 'GetMarketItem');

  return result.data;
};

const UpdateMarketItem = async (
  id: number,
  marketItem: MarketItem
): Promise<MarketItem> => {
  await axios.patch('/market-items/' + id, marketItem);
  console.log(`marketItem №${id} updated`);

  return Promise.resolve(marketItem);
};

const DeleteMarketItem = async (id: number): Promise<boolean> => {
  await axios.delete('/market-items/' + id);
  console.log('marketItem deleted');

  return Promise.resolve(true);
};

interface MarketItemService {
  GetMarketItems: () => Promise<MarketItem[]>;
  CreateMarketItem: (marketItem: MarketItem) => Promise<boolean>;
  GetMarketItemsAuthorized: () => Promise<MarketItem[]>;
  GetMarketItem: (id: number) => Promise<MarketItem>;
  UpdateMarketItem: (id: number, marketItem: MarketItem) => Promise<MarketItem>;
  DeleteMarketItem: (id: number) => Promise<boolean>;
}

export const MarketItemService: MarketItemService = {
  GetMarketItems: GetMarketItems,
  CreateMarketItem: CreateMarketItem,
  GetMarketItemsAuthorized: GetMarketItemsAuthorized,
  GetMarketItem: GetMarketItem,
  UpdateMarketItem: UpdateMarketItem,
  DeleteMarketItem: DeleteMarketItem,
};
