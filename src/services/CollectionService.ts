import { Collection, CollectionSchema } from '../types/CollectionType.ts';
import {
  CollectionValuation,
  CollectionValuationSchema,
} from '../types/CollectionValuationType.ts';
import axios from 'axios';
import {
  handleCollectionError,
  handleIncorrectParse,
} from './ErrorHandlers.ts';
import { history } from '../routes/history.ts';
import toaster from '../shared/lib/react-toastify.ts';
import {
  CollectionSetData,
  CollectionSetSchema,
} from '../types/CollectionSetType.ts';
import { csf } from '../features/collections/index.tsx';

interface CollectionService {
  GetCollection: () => Promise<Collection>;
  GetCollectionValuation: () => Promise<CollectionValuation>;
  AddCollectionSet: (collectionSet: CollectionSetData) => Promise<boolean>;
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
    const response = await axios.post('/collections/', collectionSet);
    toaster.showToastSuccess('Collection set created');

    const result = CollectionSetSchema.safeParse(response.data);
    if (!result.success)
      return handleIncorrectParse(
        result.error,
        'Add Collection Set',
        'Incorrect parse'
      );

    return Promise.resolve(true);
  } catch (e) {
    return handleCollectionError(e, 'CollectionSet', csf.form);
  }
};

export const collectionService: CollectionService = {
  GetCollection: GetCollection,
  GetCollectionValuation: GetCollectionValuation,
  AddCollectionSet: AddCollectionSet,
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    error?.response?.status === 404 && history.navigate('/collection/intro/');
    return Promise.reject(error);
  }
);
