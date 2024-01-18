import { MarketItem, MarketItemSchema } from '../types/MarketItemType.ts';
import axios from 'axios';
import {
  handleIncorrectParse,
  handleMarketItemError,
} from './ErrorHandlers.ts';
import { navigateFx } from '../shared/lib/react-router.ts';
import toaster from '../shared/lib/react-toastify.ts';
import { mi } from '../features/market-item/index.tsx';

interface MarketItemService {
  GetMarketItems: () => Promise<MarketItem[]>;
  CreateMarketItem: (marketItem: MarketItem) => Promise<boolean>;
  UploadMarketItemImage: (file: File, id: string) => Promise<boolean>;
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
  try {
    await axios.post('/market-items/', marketItem);
    toaster.showToastSuccess('Market item created');

    return Promise.resolve(true);
  } catch (e) {
    return handleMarketItemError(e, 'MarketItem', mi.form);
  }
};

const UploadMarketItemImage = async (
  file: File,
  id: string
): Promise<boolean> => {
  try {
    await axios.post('/market-items/images/' + id, file);
    toaster.showToastSuccess('Image uploaded');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
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
  try {
    await axios.patch('/market-items/' + id, marketItem);
    toaster.showToastSuccess(`Market item updated`);

    return Promise.resolve(marketItem);
  } catch (e) {
    return Promise.reject(e);
  }
};

const DeleteMarketItem = async (id: string): Promise<boolean> => {
  try {
    await axios.delete('/market-items/' + id);
    toaster.showToastSuccess('Market item deleted');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    error?.response?.status === 404 && (await navigateFx({ pathname: '/' }));
    return Promise.reject(error);
  }
);

export const marketItemService: MarketItemService = {
  GetMarketItems: GetMarketItems,
  CreateMarketItem: CreateMarketItem,
  UploadMarketItemImage: UploadMarketItemImage,
  GetMarketItemsAuthorized: GetMarketItemsAuthorized,
  GetMarketItem: GetMarketItem,
  UpdateMarketItem: UpdateMarketItem,
  DeleteMarketItem: DeleteMarketItem,
};
