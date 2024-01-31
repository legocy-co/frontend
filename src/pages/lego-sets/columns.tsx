import { createColumnHelper } from '@tanstack/table-core';
import { Link } from 'react-router-dom';
import { Button } from '../../shared/ui/button.tsx';
import * as lib from './lib';

const columnHelper = createColumnHelper<lib.SetRow>();

export const useColumns = () => {
  return [
    columnHelper.accessor('id', {
      header: () => 'ID',
      cell: (info) => <span>{info.getValue()}</span>,
      id: 'id',
      size: 50,
      meta: {
        title: 'ID',
      },
    }),

    columnHelper.accessor('pieces', {
      header: () => 'Pieces',
      cell: (info) => <span>{info.getValue()}</span>,
      id: 'pieces',
      size: 200,
      meta: {
        title: 'Pieces',
      },
    }),

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
      header: () => 'Set',
      cell: (info) => <span>{info.getValue()}</span>,
      id: 'name',
      size: 400,
      meta: {
        title: 'Set',
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

    columnHelper.display({
      id: 'actions',
      cell: (info) => (
        <div className="flex flex-col">
          <Link
            to={info.row.original.id.toString()}
            onClick={(e) => e.stopPropagation()}
          >
            <Button className="px-3">
              icon
              {/*<MdModeEditOutline className="fill-primary-default h-5 w-5" />*/}
            </Button>
          </Link>
        </div>
      ),
    }),
  ];
};
