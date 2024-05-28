import { PaginationData } from '../../../types/pagination.ts';
import { LegoSet } from '../../../types/LegoSetType.ts';

export type SetRow = {
  id: number;
  image?: string;
  name: string;
  number: number;
  pieces: number;
  series: string;
};

export const columns = [
  {
    id: 'number',
    size: 250,
    title: 'Set number',
  },
  {
    id: 'name',
    size: 500,
    title: 'Set name',
  },
  {
    id: 'pieces',
    size: 300,
    title: 'Pieces',
  },
  {
    id: 'image',
    size: 300,
    title: 'Image',
  },
  {
    id: 'series',
    size: 500,
    title: 'Series',
  },
];

export function toSetRows(response: PaginationData<LegoSet[]>): SetRow[] {
  return response.data.map((set) => ({
    id: set.id,
    image: set.images
      ?.sort((current, next) => Number(current.isMain) - Number(next.isMain))
      .map((img) => 'https://' + img.imageURL)[0],
    name: set.name,
    number: set.number,
    pieces: set.nPieces,
    series: set.series.name,
  }));
}
