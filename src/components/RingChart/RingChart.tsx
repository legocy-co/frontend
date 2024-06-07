import './PieChart.scss';
import { Button } from '../../shared/ui/button.tsx';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

const RingChart = () => {
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

  // props
  const totalCount = 36;

  // layout expand modal
  return (
    <div className="pie-chart">
      <div className="pie-chart__header">
        <h1>Themes Overview</h1>
        <Button>Expand</Button>
      </div>
      <div className="pie-chart__body">
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
                key={`cell-${i}`}
                stroke={colors[i]}
                strokeWidth={0.5}
                fill={colors[i]}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ payload }) =>
              payload &&
              payload.length && (
                <div className="pie-chart__tooltip">
                  {payload[0].name} (
                  {Math.round((Number(payload[0].value) / totalCount) * 10000) /
                    100}
                  %)
                </div>
              )
            }
          />
        </PieChart>
        <ul>
          {data
            .map((item, i) => (
              <li style={{ color: colors[i] }}>
                <p>{item.name}</p>
              </li>
            ))
            .reverse()
            .slice(0, 4)}
        </ul>
      </div>
    </div>
  );
};

export default RingChart;
