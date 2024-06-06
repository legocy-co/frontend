import './PieChart.scss';
import { Button } from '../../shared/ui/button.tsx';
import { Cell, Pie, PieChart } from 'recharts';

const RingChart = () => {
  const data = [
    { name: 'Group A', value: 10 },
    { name: 'Group B', value: 9 },
    { name: 'Group C', value: 9 },
    { name: 'Group D', value: 8 },
    { name: 'Group E', value: 7 },
    { name: 'Group E', value: 6 },
    { name: 'Group E', value: 5 },
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

  //TODO: layout pie chart
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
          fill="#8884d8"
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
      </PieChart>
    </div>
  );
};

export default RingChart;
