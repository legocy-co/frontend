import {
  Like,
  LikeSchema,
  MarketItem,
  MarketItemData,
  MarketItemSchema,
} from '../types/MarketItemType.ts';
import axios from 'axios';
import { handleIncorrectParse, handleSetError } from './ErrorHandlers.ts';
import toaster from '../shared/lib/react-toastify.ts';
import { mif } from '../features/market-item/info';
import { PaginationData } from '../types/pagination.ts';

interface MarketItemService {
  GetMarketItems: (query: string) => Promise<PaginationData<MarketItem[]>>;
  CreateMarketItem: (marketItem: MarketItemData) => Promise<MarketItem>;
  GetMarketItemsAuthorized: (
    query: string
  ) => Promise<PaginationData<MarketItem[]>>;
  GetLikedItems: () => Promise<Like[]>;
  LikeMarketItem: (id: number | string) => Promise<boolean>;
  UnlikeMarketItem: (id: number | string) => Promise<boolean>;
  GetMarketItem: (id: number | string) => Promise<MarketItem>;
  UpdateMarketItem: (
    id: number | string,
    marketItem: MarketItemData
  ) => Promise<MarketItemData>;
  DeleteMarketItem: (id: number | string) => Promise<boolean>;
  UploadImage: (file: FormData, id: number | string) => Promise<boolean>;
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
    const response = await axios.post<object>('/market-items/', marketItem);
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
    return handleSetError(e, 'MarketItem', mif.form);
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

const GetLikedItems = async (): Promise<Like[]> => {
  const response = await axios.get<object[]>('/market-items/likes/');
  const result = LikeSchema.array().safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetLikedItems',
      "Can't get liked items"
    );

  return result.data;
};

const LikeMarketItem = async (id: number | string): Promise<boolean> => {
  try {
    await axios.post('/market-items/likes/' + id);
    toaster.showToastSuccess('Market item liked');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

const UnlikeMarketItem = async (id: number | string): Promise<boolean> => {
  try {
    await axios.delete('/market-items/likes/' + id);
    toaster.showToastSuccess('Market item unliked');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
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
  marketItem: MarketItemData
): Promise<MarketItemData> => {
  try {
    await axios.put('/market-items/' + id, marketItem);
    toaster.showToastSuccess(`Market item updated`);

    return Promise.resolve(marketItem);
  } catch (e) {
    return handleSetError(e, 'MarketItem', mif.form);
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

const UploadImage = async (
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

export const marketItemService: MarketItemService = {
  GetMarketItems: GetMarketItems,
  CreateMarketItem: CreateMarketItem,
  GetMarketItemsAuthorized: GetMarketItemsAuthorized,
  GetLikedItems: GetLikedItems,
  LikeMarketItem: LikeMarketItem,
  UnlikeMarketItem: UnlikeMarketItem,
  GetMarketItem: GetMarketItem,
  UpdateMarketItem: UpdateMarketItem,
  DeleteMarketItem: DeleteMarketItem,
  UploadImage: UploadImage,
};
