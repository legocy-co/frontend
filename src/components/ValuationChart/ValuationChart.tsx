import { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import * as model from './model';
import { setStates } from '../../types/MarketItemType.ts';
import { Bar, BarChart, LabelList, Tooltip, XAxis } from 'recharts';
import { LazySvg } from '../../shared/ui/lazy-svg.tsx';
import NoneIcon from '../../assets/icons/none.svg?react';

export const ValuationChart = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const chartData = useUnit(model.$chartData);

  let barData = { x: 0, y: 0, name: '' };

  const StateTooltip = ({ active, payload }: any) => {
    const tooltip = document.getElementsByClassName(
      'recharts-tooltip-wrapper'
    )[0] as HTMLElement;

    useEffect(() => {
      if (tooltip) {
        tooltip.style.left = `${barData.x}px`;
        tooltip.style.top = `${barData.y - 50}px`;
      }
    }, [barData]);

    if (active && payload && payload.length) {
      return (
        <div className="absolute flex h-4 bg-legocy items-center px-2 rounded-2xl text-[8px] dark:text-black whitespace-nowrap">
          {setStates[barData.name as keyof typeof setStates]}
          <div className="invisible absolute h-2 w-2 top-3 left-1/2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
        </div>
      );
    }
  };

  window.addEventListener(
    'resize',
    function () {
      setWindowWidth(window.innerWidth);
    },
    true
  );

  return chartData.length > 0 ? (
    <div className="w-80 sm:w-[521px] min-h-[281px] flex flex-col items-center justify-around bg-pagesize dark:bg-dark rounded-md text-tab dark:text-white">
      <p className="w-full indent-6 text-lg text-confirmmodal text-start dark:text-white">
        Our Price Evaluation For This Set
      </p>
      <BarChart
        width={windowWidth > 640 ? 500 : 250}
        height={220}
        data={chartData}
        margin={{
          top: 30,
          right:
            (windowWidth > 640 ? 500 : 250) -
            chartData.length * (windowWidth > 640 ? 84 : 41),
        }}
        className="iconfills textfills"
      >
        <Bar
          dataKey="value"
          fill="#2F2F2F"
          radius={3}
          barSize={windowWidth > 640 ? 57 : 28}
          onMouseOver={(data) => (barData = data)}
        >
          <LabelList
            dataKey="name"
            position="top"
            content={({ value, x, y, width }: any) => (
              <LazySvg
                name={value}
                width={28}
                height={28}
                x={width > 50 ? x + width / 4 : x}
                y={y - 30}
              />
            )}
          />
        </Bar>
        <XAxis
          interval={0}
          dataKey="display"
          stroke="#262323"
          axisLine={false}
          tickLine={false}
        />
        <Tooltip cursor={false} content={<StateTooltip />} />
      </BarChart>
    </div>
  ) : (
    <div className="flex w-[300px] sm:w-[521px] text-wrap p-3 border border-solid border-black dark:border-white dark:bg-white dark:bg-opacity-20 rounded-md items-center justify-around gap-2 text-[#2E2626] dark:text-white">
      <NoneIcon className="w-10 iconfills" />
      We currently don&apos;t have enough information to give you our price
      evaluation for this set . We suggest checking out other similar listings
      to determine an appropriate price.
    </div>
  );
};
