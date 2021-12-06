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
import { ChartCommissionContainer, Title } from "./styles";

interface IChartCommissionProps {}

const data: any[] = [
  {
    name: "Page A",
    commission: 0,
    amt: 2400,
  },
  {
    name: "Page B",
    commission: 0,
    amt: 2210,
  },
  {
    name: "Page C",
    commission: 0,
    amt: 2290,
  },
  {
    name: "Page D",

    commission: 0,
    amt: 2000,
  },
  {
    name: "Page E",

    commission: 0,
    amt: 2181,
  },
  {
    name: "Page F",

    commission: 0,
    amt: 2500,
  },
  {
    name: "Page G",
    commission: 0,
    amt: 2100,
  },
];
const ChartCommission: React.FC<IChartCommissionProps> = props => {
  return (
    <ChartCommissionContainer>
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
          <Bar dataKey="Commissions" fill="#33CCCC" />
        </BarChart>
      </div>
    </ChartCommissionContainer>
  );
};

export default ChartCommission;
