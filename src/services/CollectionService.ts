import {
  Collection,
  CollectionSchema,
  CollectionSetData,
} from '../types/CollectionType.ts';
import axios from 'axios';
import { handleSetError, handleIncorrectParse } from './ErrorHandlers.ts';
import { history } from '../routes/history.ts';
import toaster from '../shared/lib/react-toastify.ts';
import { csf } from '../features/collection/index.tsx';

interface CollectionService {
  GetCollection: () => Promise<Collection>;
  AddCollectionSet: (collectionSet: CollectionSetData) => Promise<boolean>;
  UpdateCollectionSet: (
    id: number | string,
    collectionSet: CollectionSetData
  ) => Promise<boolean>;
  DeleteCollectionSet: (id: number | string) => Promise<boolean>;
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
    await axios.put('/collections/' + id, collectionSet);
    toaster.showToastSuccess('Collection set updated');

    return Promise.resolve(true);
  } catch (e) {
    return handleSetError(e, 'CollectionSet', csf.form);
  }
};

const DeleteCollectionSet = async (id: number | string): Promise<boolean> => {
  try {
    await axios.delete('/collections/' + id);
    toaster.showToastSuccess('Collection set deleted');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const collectionService: CollectionService = {
  GetCollection: GetCollection,
  AddCollectionSet: AddCollectionSet,
  UpdateCollectionSet: UpdateCollectionSet,
  DeleteCollectionSet: DeleteCollectionSet,
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    error?.response?.data.error === 'No sets found for user' &&
      history.navigate('/collection/intro/');
    return Promise.reject(error);
  }
);
