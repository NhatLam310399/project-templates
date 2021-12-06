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
import { ChartOverallContainer, Title } from "./styles";

const data: any[] = [
  {
    name: "Page A",
    click: 0,
    sign: 0,
    connectStores: 0,
    amt: 2400,
  },
  {
    name: "Page B",
    click: 0,
    sign: 0,
    connectStores: 0,
    amt: 2210,
  },
  {
    name: "Page C",
    click: 0,
    sign: 0,
    connectStores: 0,
    amt: 2290,
  },
  {
    name: "Page D",
    click: 0,
    sign: 0,
    connectStores: 0,
    amt: 2000,
  },
  {
    name: "Page E",
    click: 0,
    sign: 0,
    connectStores: 0,
    amt: 2181,
  },
  {
    name: "Page F",
    click: 0,
    sign: 0,
    connectStores: 0,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    sign: 0,
    connectStores: 0,
    amt: 2100,
  },
];
interface IChartOverallProps {}

const ChartOverall: React.FC<IChartOverallProps> = props => {
  return (
    <ChartOverallContainer>
      <Title>Overall</Title>
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
          <Bar dataKey="connectStores" fill="#33CCCC" />
        </BarChart>
      </div>
    </ChartOverallContainer>
  );
};

export default ChartOverall;
