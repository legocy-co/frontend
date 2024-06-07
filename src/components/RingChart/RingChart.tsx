import './PieChart.scss';
import { Button } from '../../shared/ui/button.tsx';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

const RingChart = () => {
  const data = [
    { name: 'The LEGO Ninjago Movie', value: 10 },
    { name: 'Botanical Collection', value: 9 },
    { name: 'BrickHeadz', value: 9 },
    { name: 'Architecture', value: 8 },
    { name: 'Group E', value: 7 },
    { name: 'Group F', value: 6 },
    { name: 'Group G', value: 5 },
    { name: 'Group G', value: 4 },
    { name: 'Group G', value: 3 },
  ];

  const colors = Array.from({ length: data.length }, (_, i) => {
    const findColor = (left: number, right: number): number =>
      // left + (right - left) * (i / (data.length - 1));
      left + (i * (right - left)) / (data.length - 1);

    return `rgb(${findColor(215, 255)}, ${findColor(77, 228)}, ${findColor(
      33,
      133
    )})`;
  });

  console.log(colors);

  return (
    <div className="pie-chart">
      <div className="pie-chart__header">
        <h1>Themes Overview</h1>
        <Button>Expand</Button>
      </div>
      <PieChart width={208} height={208}>
        <Pie
          data={data}
          innerRadius={60}
          startAngle={180}
          endAngle={-180}
          cornerRadius={9999}
          paddingAngle={-15}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              stroke={colors[index]}
              fill={colors[index]}
            />
          ))}
        </Pie>
        <Tooltip content={<RingTooltip />} />
      </PieChart>
    </div>
  );
};

//TODO: black tooltip shadow
const RingTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="py-1 px-1.5 shadow-tooltip rounded-md bg-tooltip dark:bg-tooltipdark text-xs">
        {`${label}`}
      </div>
    );
  }
};

export default RingChart;
