import { PaginationModel } from './model.ts';
import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import { useUnit } from 'effector-react';
import ReactPaginate from 'react-paginate';
import './style.scss';
import clsx from 'clsx';
import { BsChevronDown } from 'react-icons/bs';

export const Pagination = ({ model }: { model: PaginationModel }) => {
  return (
    <div className="flex w-full items-center justify-between pt-2">
      <PageCountToggler model={model} />
      <PaginateController model={model} />
    </div>
  );
};

const PageCountToggler = ({ model }: { model: PaginationModel }) => {
  const [open, setOpen] = useState(false);

  const { $pageSize, $paginatedInfo, pageSizeChanged, $totalCount } = model;
  const [pageSize, paginatedInfo, totalCount] = useUnit([
    $pageSize,
    $paginatedInfo,
    $totalCount,
  ]);

  if (totalCount === 0) return null;
  return (
    <div className="flex items-center space-x-8 rounded-md">
      <div className="flex items-center space-x-3">
        <p className="hidden lg:block">Items per page</p>
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger
            className={clsx(
              'hidden lg:flex w-12 py-1 px-1.5 justify-between gap-1 rounded-md hover:bg-pagesize hover:text-state transition-colors items-center space-x-2 disabled:hover:!bg-transparent disabled:cursor-not-allowed',
              { 'rounded-b-none bg-pagesize text-state': open },
              { 'w-14': pageSize === 100 }
            )}
          >
            {pageSize}
            <BsChevronDown
              className={clsx(
                'transition-all mt-px -translate-y-[2px] rotate-180',
                {
                  'rotate-[]': open,
                }
              )}
            />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="bg-pagesize flex flex-col rounded-b-md text-state"
              onClick={() => setOpen(false)}
            >
              {Array.from({ length: 4 }, (_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    pageSizeChanged(!index ? 10 : 25 * (2 * (index - 1) || 1))
                  }
                  type="button"
                  className={clsx(
                    ' leading-4 w-12 hover:bg-pagesizehover transition-colors pl-1.5 text-start py-1 px-1.5 rounded-b-md',
                    {
                      hidden:
                        pageSize ===
                        (!index ? 10 : 25 * (2 * (index - 1) || 1)),
                    },
                    { 'w-14': pageSize === 100 },
                    { 'hover:rounded-none': index < 3 }
                  )}
                >
                  {!index ? 10 : 25 * (2 * (index - 1) || 1)}
                </button>
              ))}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
      <span>{paginatedInfo}</span>
    </div>
  );
};

const PaginateController = ({ model }: { model: PaginationModel }) => {
  const { $pagesCount, $page } = model;
  const [page, pagesCount] = useUnit([$page, $pagesCount]);

  if (pagesCount === 0) return null;
  return (
    <ReactPaginate
      nextLabel={<p>&gt;</p>}
      previousLabel={<p>&lt;</p>}
      containerClassName="pagination-container"
      previousClassName={page ? 'pagination-prev-btn' : 'hidden'}
      nextClassName={page + 1 === pagesCount ? 'hidden' : 'pagination-prev-btn'}
      pageClassName="pagination-page mx-[3px]"
      breakClassName="pagination-page-break"
      activeClassName="pagination-active-btn"
      onPageChange={({ selected }) => model.pageChanged(selected)}
      forcePage={page}
      pageCount={pagesCount}
    />
  );
};
