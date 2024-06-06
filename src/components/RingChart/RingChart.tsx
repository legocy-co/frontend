import './PieChart.scss';
import { Button } from '../../shared/ui/button.tsx';
import { Cell, Pie, PieChart } from 'recharts';

const RingChart = () => {
  const data = [
    { name: 'Group A', value: 30 },
    { name: 'Group B', value: 20 },
    { name: 'Group C', value: 25 },
    { name: 'Group D', value: 10 },
    { name: 'Group E', value: 5 },
  ];
  const COLORS = ['#FFD540', '#FFB340', '#DF5F36', '#832222', '#691313'];

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
          rotate={-150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              stroke={COLORS[index % COLORS.length]}
              fill={COLORS[index % COLORS.length]}
              z={index}
              opacity={0.9}
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default RingChart;
