import './RingChart.scss';
import { Button } from '../../shared/ui/button.tsx';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import ConfirmationModal from '../ConfirmationModal';
import React, { useState } from 'react';
import clsx from 'clsx';
import { setTwoDecimals } from '../../services/utils.ts';

const RingChart = () => {
  const [showExpanded, setShowExpanded] = useState(false);

  const data = [
    { name: 'Botanical Collection', value: 9 },
    { name: 'The LEGO Ninjago Movie', value: 10 },
    { name: 'BrickHeadz', value: 9 },
    { name: 'Architecture', value: 8 },
    { name: 'DC Cosmic Super Heroes', value: 7 },
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
        label="Series statistics"
        legendPercentage
        gluedHeader
      />
      {showExpanded && (
        <ConfirmationModal
          className="!p-0 dark:!bg-dark !top-[10%]"
          show={showExpanded}
          onClose={() => setShowExpanded(false)}
          showYes={false}
        >
          <RingStats
            onClick={() => setShowExpanded(false)}
            data={data}
            colors={colors}
            total={total}
            label="Series statistics"
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
  label: string;
  hideExpand?: boolean;
  gluedHeader?: boolean;
  customUnits?: string;
  legendPercentage?: boolean;
}

// TODO: large collection expanded
const RingStats = ({
  onClick,
  data,
  colors,
  expanded = false,
  hideExpand = false,
  total,
  label,
  gluedHeader = false,
  legendPercentage = false,
  customUnits,
}: RingStatsProps) => {
  function toPercentage(value: number) {
    return setTwoDecimals((value / total) * 100);
  }

  return (
    <div
      className={clsx('ring-chart', {
        '!border-none': expanded,
      })}
    >
      <div
        className={clsx('ring-chart__header', {
          '!justify-start gap-5': gluedHeader,
        })}
      >
        <h1>{label}</h1>
        {!hideExpand && (
          <Button onClick={onClick}>{expanded ? 'Go back' : 'Expand'}</Button>
        )}
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
                  {customUnits
                    ? `${payload[0].value} ${customUnits}`
                    : `${payload[0].name}`}{' '}
                  ({toPercentage(Number(payload[0].value))}%)
                </div>
              )
            }
          />
        </PieChart>
        <ul>
          {data
            .map((item, i) => (
              <li key={'li-' + i} style={{ color: colors[i] }}>
                <p>
                  {item.name}
                  {customUnits && `: ${item.value} ${customUnits}`}{' '}
                  {legendPercentage && `(${toPercentage(item.value)}%)`}
                </p>
              </li>
            ))
            .reverse()
            .slice(0, expanded ? data.length : 5)}
        </ul>
      </div>
    </div>
  );
};

export default RingChart;
