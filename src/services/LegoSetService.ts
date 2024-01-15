import { LegoSet, LegoSetSchema } from '../types/LegoSetType.ts';
import axios from 'axios';
import { handleIncorrectParse } from './ErrorHandlers.ts';
import { GetConfig, SetConfig } from '../configs';

interface LegoSetService {
  GetLegoSets: () => Promise<LegoSet[]>;
  CacheLegoSets: () => void;
  GetLegoSet: (id: string) => Promise<LegoSet>;
}

const GetLegoSets = async (): Promise<LegoSet[]> => {
  const config = GetConfig();
  !config.legoSets && (await CacheLegoSets());

  const result = LegoSetSchema.array().safeParse(config.legoSets);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetLegoSets',
      "Can't get lego sets"
    );

  return result.data;
};

const CacheLegoSets = async () => {
  const config = GetConfig();
  const response = await axios.get<object[]>('/sets/');
  config.legoSets = response.data;

  SetConfig(config);
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
  CacheLegoSets: CacheLegoSets,
  GetLegoSet: GetLegoSet,
};
