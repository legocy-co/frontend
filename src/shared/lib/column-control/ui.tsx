import * as Popover from '@radix-ui/react-popover';
import { ColumnControlModel } from './model';
import ColumnsIcon from '../../icons/columns.svg?react';
import { useList, useStoreMap, useUnit } from 'effector-react';
import { Toggle } from '../../ui/toggle';
import { useDrag, useDrop } from 'react-dnd';
import clsx from 'clsx';
import { BsChevronDown } from 'react-icons/bs';
import { Button } from '../../ui/button.tsx';

type Props = {
  model: ColumnControlModel;
};

export const ColumnControl = ({ model }: Props) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button className="!w-[152px] text-[1rem] font-semibold dark:text-white !h-9 bg-pagesize dark:bg-dark flex items-center gap-3 justify-center">
          <ColumnsIcon className="iconfills" />
          <span className="text-primary text-base">Columns</span>
          <BsChevronDown className="iconfills w-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          className="w-[309px] py-5 mt-5 bg-pagesize dark:bg-celllink p-2 rounded-md will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade z-10"
          sideOffset={5}
        >
          {useList(model.$columnOrder, (id) => (
            <Column key={id} id={id} model={model} />
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const Column = ({ model, id }: { id: string; model: ColumnControlModel }) => {
  const title = useStoreMap({
    store: model.$titles,
    keys: [id],
    fn: (titles, [id]) => titles[id],
  });
  const checked = useStoreMap({
    store: model.$visibility,
    keys: [id],
    fn: (visibility, [id]) => visibility[id],
  });
  const hidden = useStoreMap({
    store: model.$hiddenColumns,
    keys: [id],
    fn: (hidden, [id]) => hidden[id],
  });
  const order = useUnit(model.$columnOrder);

  const [{ isOver }, dropRef] = useDrop({
    accept: 'column',
    drop: (item: { id: string }) => {
      const newColumnOrder = reorderColumn(item.id, id, order);

      model.columnOrderChanged(newColumnOrder);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ opacity, isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      isDragging: monitor.isDragging(),
    }),
    item: () => ({ id }),
    type: 'column',
  });

  if (hidden) {
    return null;
  }

  return (
    <div className="w-full" ref={previewRef}>
      <div
        ref={dropRef}
        className={clsx(
          'w-full flex items-center space-x-2 px-5 transition-all',
          {
            '!bg-neutral-60': isOver,
          },
          {
            'cursor-grab': !isDragging,
            'cursor-grabbing': isDragging,
          }
        )}
        style={{
          opacity,
        }}
      >
        <div
          ref={dragRef}
          className="flex-1 py-4 flex items-center justify-between"
        >
          <span>{title}</span>
          <Toggle
            checked={checked}
            onChange={() => model.visibilityChanged(id)}
            className="!w-[50px] !h-6"
            thumbClassName="!w-[19px] !h-[19px] data-[state=checked]:!translate-x-[24px] data-[state=checked]:bg-legocy"
          />
        </div>
      </div>
    </div>
  );
};

function reorderColumn(
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
) {
  const copy = [...columnOrder];

  copy.splice(
    copy.indexOf(targetColumnId),
    0,
    copy.splice(copy.indexOf(draggedColumnId), 1)[0] as string
  );
  return copy;
}
