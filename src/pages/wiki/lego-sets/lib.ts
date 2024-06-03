import { PaginationData } from '../../../types/pagination.ts';
import { LegoSet } from '../../../types/LegoSetType.ts';

export type SetRow = {
  id: number;
  image?: string;
  name: string;
  number: number;
  pieces: number;
  series: string;
  year?: number;
};

export const columns = [
  {
    id: 'number',
    size: 200,
    title: 'Set number',
  },
  {
    id: 'name',
    size: 400,
    title: 'Set name',
  },
  {
    id: 'pieces',
    size: 200,
    title: 'Pieces',
  },
  {
    id: 'series',
    size: 400,
    title: 'Series',
  },
  {
    id: 'year',
    size: 200,
    title: 'Year of release',
  },
  {
    id: 'image',
    size: 200,
    title: 'Image',
  },
];

export function toSetRows(response: PaginationData<LegoSet[]>): SetRow[] {
  return response.data.map((set) => ({
    id: set.id,
    image: set.images
      ?.sort((current, next) => Number(current.isMain) - Number(next.isMain))
      .map((img) => img.imageURL)[0],
    name: set.name,
    number: set.number,
    pieces: set.nPieces,
    series: set.series.name,
    year: set.releaseYear ?? undefined,
  }));
}
