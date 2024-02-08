import { Collection, CollectionSchema } from '../types/CollectionType.ts';
import {
  CollectionValuation,
  CollectionValuationSchema,
} from '../types/CollectionValuationType.ts';
import axios from 'axios';
import { handleSetError, handleIncorrectParse } from './ErrorHandlers.ts';
import { history } from '../routes/history.ts';
import toaster from '../shared/lib/react-toastify.ts';
import { CollectionSetData } from '../types/CollectionSetType.ts';
import { csf } from '../features/collections/index.tsx';

interface CollectionService {
  GetCollection: () => Promise<Collection>;
  GetCollectionValuation: () => Promise<CollectionValuation>;
  AddCollectionSet: (collectionSet: CollectionSetData) => Promise<boolean>;
  UpdateCollectionSet: (
    id: number | string,
    collectionSet: CollectionSetData
  ) => Promise<boolean>;
}

const GetCollection = async (): Promise<Collection> => {
  const response = await axios.get('/collections/');
  const result = CollectionSchema.safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetCollection',
      "Can't get collection"
    );

  return result.data;
};

const GetCollectionValuation = async (): Promise<CollectionValuation> => {
  const response = await axios.get('/collections/calculator/');
  const result = CollectionValuationSchema.safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetCollectionValuation',
      "Can't get collection valuation"
    );

  return result.data;
};

const AddCollectionSet = async (
  collectionSet: CollectionSetData
): Promise<boolean> => {
  try {
    await axios.post('/collections/', collectionSet);
    toaster.showToastSuccess('Collection set created');

    return Promise.resolve(true);
  } catch (e) {
    return handleSetError(e, 'CollectionSet', csf.form);
  }
};

const UpdateCollectionSet = async (
  id: number | string,
  collectionSet: CollectionSetData
): Promise<boolean> => {
  try {
    await axios.patch('/collections/' + id, collectionSet);
    toaster.showToastSuccess('Collection set created');

    return Promise.resolve(true);
  } catch (e) {
    return handleSetError(e, 'CollectionSet', csf.form);
  }
};

export const collectionService: CollectionService = {
  GetCollection: GetCollection,
  GetCollectionValuation: GetCollectionValuation,
  AddCollectionSet: AddCollectionSet,
  UpdateCollectionSet: UpdateCollectionSet,
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    error?.response?.status === 404 && history.navigate('/collection/intro/');
    return Promise.reject(error);
  }
);
