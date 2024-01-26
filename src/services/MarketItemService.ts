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
import { PaginationData } from '../types/common.ts';

interface MarketItemService {
  GetMarketItems: () => Promise<MarketItem[]>;
  CreateMarketItem: (marketItem: MarketItemData) => Promise<MarketItem>;
  UploadMarketItemImage: (
    file: FormData,
    id: number | string
  ) => Promise<boolean>;
  GetMarketItemsAuthorized: () => Promise<MarketItem[]>;
  GetMarketItem: (id: number | string) => Promise<MarketItem>;
  UpdateMarketItem: (
    id: number | string,
    marketItem: MarketItem
  ) => Promise<MarketItem>;
  DeleteMarketItem: (id: number | string) => Promise<boolean>;
}

// TODO: (page num, limit) to (limit, offset)
const GetMarketItems = async (limit: number, offset: number): Promise<MarketItem[]> => {
  const response =
    await axios.get<PaginationData<object | object[]>>('/market-items/');
  const result = MarketItemSchema.array().safeParse(response.data.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetMarketItems',
      "Can't get market items (unauthorized)"
    );

  return result.data;
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

const GetMarketItem = async (id: number | string): Promise<MarketItem> => {
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
