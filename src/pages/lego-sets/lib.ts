import { PaginationData } from '../../types/pagination.ts';
import { LegoSet } from '../../types/LegoSetType.ts';

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
    id: 'checkbox',
    size: 50,
    title: 'Checkbox',
  },
  {
    id: 'id',
    size: 50,
    title: 'ID',
  },

  {
    id: 'pieces',
    size: 200,
    title: 'Pieces',
  },
  {
    id: 'number',
    size: 200,
    title: 'Set number',
  },
  {
    id: 'image',
    size: 200,
    title: 'Image',
  },
  {
    id: 'name',
    size: 400,
    title: 'Set',
  },
  {
    id: 'series',
    size: 400,
    title: 'Series',
  },
];

export function toSetRows(response: PaginationData<LegoSet[]>): SetRow[] {
  return response.data.map((set) => ({
    id: set.id,
    image: set.images?.map((img) => img.image_url)[0],
    name: set.name,
    number: set.number,
    pieces: set.n_pieces,
    series: set.series.name,
  }));
}
