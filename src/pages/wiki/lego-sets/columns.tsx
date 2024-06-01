import { createColumnHelper } from '@tanstack/table-core';
import * as lib from './lib.ts';

const columnHelper = createColumnHelper<lib.SetRow>();

export const useColumns = () => {
  return [
    columnHelper.accessor('number', {
      header: () => 'Set number',
      cell: (info) => <span>{info.getValue()}</span>,
      id: 'number',
      size: 200,
      meta: {
        title: 'Set number',
      },
    }),

    columnHelper.accessor('name', {
      header: () => 'Set name',
      cell: (info) => <span>{info.getValue()}</span>,
      id: 'name',
      size: 400,
      meta: {
        title: 'Set name',
      },
    }),

    columnHelper.accessor('pieces', {
      header: () => 'Pieces',
      cell: (info) => <span>{info.getValue()}</span>,
      id: 'pieces',
      size: 200,
      meta: {
        title: 'Image',
      },
    }),

    columnHelper.accessor('series', {
      header: () => 'Series',
      cell: (info) => <span>{info.getValue()}</span>,
      id: 'series',
      size: 400,
      meta: {
        title: 'Series',
      },
    }),

    columnHelper.accessor('image', {
      header: () => 'Image',
      cell: (info) => (
        <img
          src={info.getValue()}
          className={`w-10 h-10 object-center object-cover ${
            !info.getValue() && 'hidden'
          }`}
          alt=""
        />
      ),
      id: 'image',
      size: 200,
      meta: {
        title: 'Image',
      },
    }),
  ];
};
