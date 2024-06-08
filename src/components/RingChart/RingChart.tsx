import './RingChart.scss';
import { Button } from '../../shared/ui/button.tsx';
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
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
      <Stats
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
          className={clsx(
            '!p-0 dark:!bg-dark max-h-[550px] !top-12 overflow-auto'
          )}
          show={showExpanded}
          onClose={() => setShowExpanded(false)}
          showYes={false}
        >
          <Stats
            onClick={() => setShowExpanded(false)}
            data={data}
            colors={colors}
            total={total}
            label="Theme overview"
            expanded
          />
        </ConfirmationModal>
      )}
    </>
  );
};

interface StatsProps {
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
  barChart?: boolean;
}

const Stats = ({
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
  barChart = false,
}: StatsProps) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const max = Math.max(...data.map((o) => o.value));

  const isDesktop = windowWidth > 640;

  function toPercentage(value: number) {
    return setTwoDecimals((value / total) * 100);
  }

  window.addEventListener(
    'resize',
    function () {
      setWindowWidth(window.innerWidth);
    },
    true
  );

  return (
    <div
      className={clsx('ring-chart', {
        '!border-none': expanded,
      })}
    >
      <div
        className={clsx('ring-chart__header', {
          '!justify-start': gluedHeader,
        })}
      >
        <h1>{label}</h1>
        {!hideExpand && (
          <Button onClick={onClick}>{expanded ? 'Go back' : 'Expand'}</Button>
        )}
      </div>
      {barChart ? (
        <BarChart
          width={isDesktop ? 600 : 300}
          height={40 * data.length}
          data={data.sort((a, b) => b.value - a.value)}
          layout="vertical"
          className="textfills"
          margin={{ right: 20, top: 20 }}
        >
          <XAxis
            interval={0}
            tickCount={10}
            allowDecimals={false}
            domain={[1, max]}
            type="number"
            tickLine={{ stroke: 'gray' }}
            axisLine={{ stroke: 'gray' }}
            stroke="#262323"
            fontSize={13}
            fontWeight={500}
          />
          <YAxis
            yAxisId={1}
            dataKey="name"
            type="category"
            stroke="#262323"
            width={isDesktop ? 200 : 100}
            fontSize={isDesktop ? 21 : 14}
            fontWeight={500}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickMargin={20}
            yAxisId={0}
            dataKey="value"
            stroke="#262323"
            tickFormatter={(tick) => `(${tick})`}
            type="category"
            fontSize={isDesktop ? 21 : 14}
            fontWeight={500}
            tickLine={false}
            axisLine={false}
          />
          <Bar dataKey="value" barSize={20} fontWeight={500} radius={6}>
            {data
              .map((_, i) => (
                <Cell
                  className="outline-none"
                  key={`cellbar-${i}`}
                  stroke={colors[i]}
                  strokeWidth={0}
                  fill={colors[i]}
                />
              ))
              .reverse()}
          </Bar>
        </BarChart>
      ) : (
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
      )}
    </div>
  );
};

export default RingChart;
