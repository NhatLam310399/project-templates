import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, Heading } from "./styles";

interface IChartProps {}

const data: any[] = [
  {
    name: "Page A",
    click: 4000,
    sign: 2400,
    commission: 2000,
    amt: 2400,
  },
  {
    name: "Page B",
    click: 3000,
    sign: 1398,
    commission: 2000,
    amt: 2210,
  },
  {
    name: "Page C",
    click: 2000,
    sign: 9800,
    commission: 2000,
    amt: 2290,
  },
  {
    name: "Page D",
    click: 2780,
    sign: 3908,
    commission: 2000,
    amt: 2000,
  },
  {
    name: "Page E",
    click: 1890,
    sign: 4800,
    commission: 2000,
    amt: 2181,
  },
  {
    name: "Page F",
    click: 2390,
    sign: 3800,
    commission: 2000,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    sign: 4300,
    commission: 2000,
    amt: 2100,
  },
];

const Chart: React.FC<IChartProps> = props => {
  return (
    <ChartContainer>
      <Heading.Wrapper>
        <Heading.Title>Statistics for last 7 days</Heading.Title>
        <Heading.Desc>View full statistics</Heading.Desc>
      </Heading.Wrapper>
      <div className="mt-2 w-[1440px] overflow-auto">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="click" fill="#FFCF5C" background={{ fill: "#eee" }} />
          <Bar dataKey="sign" fill="#E40F0A" />
          <Bar dataKey="commission" fill="#33CCCC" />
        </BarChart>
      </div>
    </ChartContainer>
  );
};

export default Chart;
