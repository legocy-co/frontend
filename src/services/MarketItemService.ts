import {
  Like,
  LikeSchema,
  MarketItem,
  MarketItemData,
  MarketItemSchema,
} from '../types/MarketItemType.ts';
import axios from 'axios';
import { handleIncorrectParse } from './ErrorHandlers.ts';
import toaster from '../shared/lib/react-toastify.ts';
import { PaginationData } from '../types/pagination.ts';
import { UpdateImageData } from '../types/MarketItemImage.ts';
import { sleep } from './utils.ts';

interface MarketItemService {
  GetMarketItems: (query: string) => Promise<PaginationData<MarketItem[]>>;
  CreateMarketItem: (data: MarketItemData) => Promise<MarketItem>;
  GetMarketItemsAuthorized: (
    query: string
  ) => Promise<PaginationData<MarketItem[]>>;
  GetFavoriteMarketItems: (
    limit: number,
    offset: number
  ) => Promise<PaginationData<MarketItem[]>>;
  GetLikedItems: () => Promise<Like[]>;
  LikeMarketItem: (marketItemID: number | string) => Promise<boolean>;
  UnlikeMarketItem: (marketItemID: number | string) => Promise<boolean>;
  GetMarketItem: (itemID: number | string) => Promise<MarketItem>;
  UpdateMarketItem: (
    itemID: number | string,
    data: MarketItemData
  ) => Promise<MarketItemData>;
  DeleteMarketItem: (itemID: number | string) => Promise<boolean>;
  DeleteImage: (
    imageID: number | string,
    marketItemID: number | string
  ) => Promise<boolean>;
  UploadImage: (
    file: File,
    sortIndex: string,
    marketItemID: number | string
  ) => Promise<boolean>;
  UpdateImage: (
    imageID: number | string,
    marketItemID: number | string,
    data: UpdateImageData
  ) => Promise<boolean>;
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

const CreateMarketItem = async (data: MarketItemData): Promise<MarketItem> => {
  try {
    const response = await axios.post<object>('/market-items/', data);
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

const GetFavoriteMarketItems = async (
  limit = 0,
  offset = 0
): Promise<PaginationData<MarketItem[]>> => {
  const { data } = await axios.get(
    `/market-items/favorites/?limit=${limit}&offset=${offset}`
  );
  const result = MarketItemSchema.array().safeParse(data.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetFavoriteMarketItems',
      "Can't get favorite market items"
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

const LikeMarketItem = async (
  marketItemID: number | string
): Promise<boolean> => {
  try {
    await axios.post('/market-items/likes/' + marketItemID);
    toaster.showToastSuccess('Market item liked');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

const UnlikeMarketItem = async (
  marketItemID: number | string
): Promise<boolean> => {
  try {
    await axios.delete('/market-items/likes/' + marketItemID);
    toaster.showToastSuccess('Market item unliked');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

const GetMarketItem = async (itemID: number | string): Promise<MarketItem> => {
  const response = await axios.get<object>('/market-items/' + itemID);
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
  itemID: number | string,
  data: MarketItemData
): Promise<MarketItemData> => {
  try {
    await axios.put('/market-items/' + itemID, data);
    toaster.showToastSuccess(`Market item updated`);

    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
};

const DeleteMarketItem = async (itemID: number | string): Promise<boolean> => {
  try {
    await axios.delete('/market-items/' + itemID);
    toaster.showToastSuccess('Market item deleted');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

const DeleteImage = async (
  imageID: number | string,
  marketItemID: number | string
): Promise<boolean> => {
  try {
    await axios.delete(`/market-items/images/${marketItemID}/${imageID}`);
    await sleep(1010);
    toaster.showToastSuccess('Image deleted');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

const UploadImage = async (
  image: File,
  sortIndex: string,
  marketItemID: number | string
): Promise<boolean> => {
  try {
    const data = new FormData();
    data.append('file', image);
    data.append('sortIndex', sortIndex);
    await axios.post('/market-items/images/' + marketItemID, data);
    await sleep(1010);
    toaster.showToastSuccess('Image uploaded');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

const UpdateImage = async (
  imageID: number | string,
  marketItemID: number | string,
  data: UpdateImageData
): Promise<boolean> => {
  try {
    await axios.patch(`/market-items/images/${marketItemID}/${imageID}`, data);
    await sleep(1010);
    toaster.showToastSuccess('Image updated');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const marketItemService: MarketItemService = {
  GetMarketItems: GetMarketItems,
  CreateMarketItem: CreateMarketItem,
  GetMarketItemsAuthorized: GetMarketItemsAuthorized,
  GetFavoriteMarketItems: GetFavoriteMarketItems,
  GetLikedItems: GetLikedItems,
  LikeMarketItem: LikeMarketItem,
  UnlikeMarketItem: UnlikeMarketItem,
  GetMarketItem: GetMarketItem,
  UpdateMarketItem: UpdateMarketItem,
  DeleteMarketItem: DeleteMarketItem,
  DeleteImage: DeleteImage,
  UploadImage: UploadImage,
  UpdateImage: UpdateImage,
};
