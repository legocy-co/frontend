import {
  MarketItem,
  MarketItemData,
  MarketItemSchema,
} from '../types/MarketItemType.ts';
import axios from 'axios';
import {
  handleIncorrectParse,
  handleMarketItemError,
} from './ErrorHandlers.ts';
import { navigateFx } from '../shared/lib/react-router.ts';
import toaster from '../shared/lib/react-toastify.ts';
import { mif } from '../features/market-item/info';
import { PaginationData } from '../types/pagination.ts';

interface MarketItemService {
  GetMarketItems: (query: string) => Promise<PaginationData<MarketItem[]>>;
  CreateMarketItem: (marketItem: MarketItemData) => Promise<MarketItem>;
  UploadMarketItemImage: (
    file: FormData,
    id: number | string
  ) => Promise<boolean>;
  GetMarketItemsAuthorized: (
    query: string
  ) => Promise<PaginationData<MarketItem[]>>;
  GetMarketItem: (id: number | string) => Promise<MarketItem>;
  UpdateMarketItem: (
    id: number | string,
    marketItem: MarketItem
  ) => Promise<MarketItem>;
  DeleteMarketItem: (id: number | string) => Promise<boolean>;
}

const GetMarketItems = async (
  query: string
): Promise<PaginationData<MarketItem[]>> => {
  const { data } = await axios.get('/market-items/' + query);
  const result = MarketItemSchema.array().safeParse(data.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetMarketItems',
      "Can't get market items (unauthorized)"
    );

  return data;
};

const CreateMarketItem = async (
  marketItem: MarketItemData
): Promise<MarketItem> => {
  try {
    const response = await axios.post('/market-items/', marketItem);
    toaster.showToastSuccess('Market item created');

    const result = MarketItemSchema.safeParse(response.data);
    if (!result.success)
      return handleIncorrectParse(
        result.error,
        'CreateMarketItem',
        'Incorrect parse'
      );

    return result.data;
  } catch (e) {
    return handleMarketItemError(e, 'MarketItem', mif.form);
  }
};

const UploadMarketItemImage = async (
  file: FormData,
  id: number | string
): Promise<boolean> => {
  try {
    await axios.post('/market-items/images/' + id, file);
    toaster.showToastSuccess('Image uploaded');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

const GetMarketItemsAuthorized = async (
  query: string
): Promise<PaginationData<MarketItem[]>> => {
  const { data } = await axios.get('/market-items/authorized/' + query);
  const result = MarketItemSchema.array().safeParse(data.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetMarketItemsAuthorized',
      "Can't get market items (authorized)"
    );

  return data;
};

const GetMarketItem = async (id: number | string): Promise<MarketItem> => {
  const response = await axios.get<object>('/market-items/' + id);
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
  id: number | string,
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

const DeleteMarketItem = async (id: number | string): Promise<boolean> => {
  try {
    await axios.delete('/market-items/' + id);
    toaster.showToastSuccess('Market item deleted');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const marketItemService: MarketItemService = {
  GetMarketItems: GetMarketItems,
  CreateMarketItem: CreateMarketItem,
  UploadMarketItemImage: UploadMarketItemImage,
  GetMarketItemsAuthorized: GetMarketItemsAuthorized,
  GetMarketItem: GetMarketItem,
  UpdateMarketItem: UpdateMarketItem,
  DeleteMarketItem: DeleteMarketItem,
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    error?.response?.status === 404 && (await navigateFx({ pathname: '/' }));
    return Promise.reject(error);
  }
);
