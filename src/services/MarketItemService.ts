import { MarketItem, MarketItemSchema } from '../types/MarketItemType.ts';
import axios from 'axios';
import { handleIncorrectParse } from './ErrorHandlers.ts';
import { navigateFx } from '../shared/lib/react-router.ts';

interface MarketItemService {
  GetMarketItems: () => Promise<MarketItem[]>;
  CreateMarketItem: (marketItem: MarketItem) => Promise<boolean>;
  GetMarketItemsAuthorized: () => Promise<MarketItem[]>;
  GetMarketItem: (id: string) => Promise<MarketItem>;
  UpdateMarketItem: (id: string, marketItem: MarketItem) => Promise<MarketItem>;
  DeleteMarketItem: (id: string) => Promise<boolean>;
}

type MarketItemResponse = {
  data: object | object[];
  meta: object;
};

const GetMarketItems = async (): Promise<MarketItem[]> => {
  const response = await axios.get<MarketItemResponse>('/market-items/');
  const result = MarketItemSchema.array().safeParse(response.data.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetMarketItems',
      "Can't get market items (unauthorized)"
    );

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
    return handleIncorrectParse(
      result.error,
      'GetMarketItemsAuthorized',
      "Can't get market items (authorized)"
    );

  return result.data;
};

const GetMarketItem = async (id: string): Promise<MarketItem> => {
  const response = await axios.get<MarketItemResponse>('/market-items/' + id);
  const result = MarketItemSchema.safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetMarketItem',
      "Can't get market item"
    );

  return result.data;
};

const UpdateMarketItem = async (
  id: string,
  marketItem: MarketItem
): Promise<MarketItem> => {
  await axios.patch('/market-items/' + id, marketItem);
  console.log(`marketItem updated`);

  return Promise.resolve(marketItem);
};

const DeleteMarketItem = async (id: string): Promise<boolean> => {
  await axios.delete('/market-items/' + id);
  console.log('marketItem deleted');

  return Promise.resolve(true);
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    error?.response?.status === 404 &&
      (await navigateFx({ pathname: '/catalog' }));

    return Promise.reject(error);
  }
);

export const marketItemService: MarketItemService = {
  GetMarketItems: GetMarketItems,
  CreateMarketItem: CreateMarketItem,
  GetMarketItemsAuthorized: GetMarketItemsAuthorized,
  GetMarketItem: GetMarketItem,
  UpdateMarketItem: UpdateMarketItem,
  DeleteMarketItem: DeleteMarketItem,
};
