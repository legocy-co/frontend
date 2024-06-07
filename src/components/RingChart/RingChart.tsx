import './RingChart.scss';
import { Button } from '../../shared/ui/button.tsx';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import ConfirmationModal from '../ConfirmationModal';
import React, { useState } from 'react';
import clsx from 'clsx';

const RingChart = () => {
  const [showExpanded, setShowExpanded] = useState(false);

  const data = [
    { name: 'Botanical Collection', value: 9 },
    { name: 'The LEGO Ninjago Movie', value: 10 },
    { name: 'BrickHeadz', value: 9 },
    { name: 'Architecture', value: 8 },
  ].sort((a, b) => a.value - b.value);

  const colors = Array.from({ length: data.length }, (_, i) => {
    const findColor = (left: number, right: number): number =>
      right - (i * (right - left)) / (data.length - 1);

    return `rgb(${findColor(215, 255)},${findColor(77, 228)},${findColor(
      33,
      133
    )})`;
  });

  // prop
  const total = data.map((item) => item.value).reduce((sum, a) => sum + a, 0);

  return (
    <>
      <RingStats
        onClick={() => setShowExpanded(true)}
        data={data}
        colors={colors}
        total={total}
      />
      {showExpanded && (
        <ConfirmationModal
          className="!p-0 dark:!bg-dark"
          show={showExpanded}
          onClose={() => setShowExpanded(false)}
          showYes={false}
        >
          <RingStats
            onClick={() => setShowExpanded(false)}
            data={data}
            colors={colors}
            total={total}
            expanded
          />
        </ConfirmationModal>
      )}
    </>
  );
};

interface RingStatsProps {
  onClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
  data: { name: string; value: number }[];
  colors: string[];
  expanded?: boolean;
  total: number;
}

// TODO: conditional rendering stats
const RingStats = ({
  onClick,
  data,
  colors,
  expanded = false,
  total,
}: RingStatsProps) => {
  return (
    <div
      className={clsx('ring-chart', {
        '!border-none': expanded,
      })}
    >
      <div className="ring-chart__header">
        <h1>Themes Overview</h1>
        <Button onClick={onClick}>{expanded ? 'Go back' : 'Expand'}</Button>
      </div>
      <div className="ring-chart__body">
        <PieChart width={250} height={250}>
          <Pie
            data={data}
            innerRadius={70}
            startAngle={180}
            endAngle={540}
            cornerRadius={9999}
            paddingAngle={-15}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell
                className="outline-none"
                key={`cell-${i}`}
                stroke={colors[i]}
                strokeWidth={0}
                fill={colors[i]}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ payload }) =>
              payload &&
              payload.length && (
                <div className="ring-chart__tooltip">
                  {payload[0].name} (
                  {Math.round((Number(payload[0].value) / total) * 10000) / 100}
                  %)
                </div>
              )
            }
          />
        </PieChart>
        <ul>
          {data
            .map((item, i) => (
              <li key={'li-' + i} style={{ color: colors[i] }}>
                <p>{item.name}</p>
              </li>
            ))
            .reverse()
            .slice(0, expanded ? data.length : 4)}
        </ul>
      </div>
    </div>
  );
};

export default RingChart;
