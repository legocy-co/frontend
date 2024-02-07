import { Collection, CollectionSchema } from '../types/CollectionType.ts';
import {
  CollectionValuation,
  CollectionValuationSchema,
} from '../types/CollectionValuationType.ts';
import axios from 'axios';
import { handleIncorrectParse } from './ErrorHandlers.ts';

interface CollectionService {
  GetCollection: () => Promise<Collection>;
  GetCollectionValuation: () => Promise<CollectionValuation>;
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

export const collectionService: CollectionService = {
  GetCollection: GetCollection,
  GetCollectionValuation: GetCollectionValuation,
};
