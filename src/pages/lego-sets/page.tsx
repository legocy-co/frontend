import { ColumnControl } from '../../shared/lib/column-control';
import { Pagination } from '../../shared/lib/pagination';
import { useGate } from 'effector-react';
import * as model from './model.ts';

export const LegoSetsPage = () => {
  useGate(model.gate);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-end space-x-6">
          <p className="text-xl">Lego sets</p>
        </div>
        <ColumnControl model={model.columnControlModel} />
      </div>
      <div className="flex-grow w-full overflow-y-auto">{/*<Content />*/}</div>
      <Pagination.View model={model.paginationModel} />
    </div>
  );
};
