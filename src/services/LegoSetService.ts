import { LegoSet, LegoSetSchema } from '../types/LegoSetType.ts';
import axios from 'axios';
import { handleIncorrectParse } from './ErrorHandlers.ts';

interface LegoSetService {
  GetLegoSets: () => Promise<LegoSet[]>;
  GetLegoSet: (id: string) => Promise<LegoSet>;
}

const GetLegoSets = async (): Promise<LegoSet[]> => {
  const response = await axios.get<object[]>('/sets/');
  const result = LegoSetSchema.array().safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetLegoSets',
      "Can't get lego sets"
    );

  return result.data;
};

const GetLegoSet = async (id: string): Promise<LegoSet> => {
  const response = await axios.get<object>('/sets/' + id);
  const result = LegoSetSchema.safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetLegoSet',
      "Can't get lego set"
    );

  return result.data;
};

export const legoSetService: LegoSetService = {
  GetLegoSets: GetLegoSets,
  GetLegoSet: GetLegoSet,
};
