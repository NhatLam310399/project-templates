import { useMemo } from "react";
import faker from "faker";
import { string } from "yup/lib/locale";
import { TableContainer } from "./styles";
import Search from "./SearchBox";
import Table, { IColumns } from "designs/Table";

interface ITableProps {}

interface IOrderDataOColumn {
  payment: string;
  status: string;
  date: string;
  amount: number;
}

const TOTAL_SIZE = 10;
const Tables: React.FC<ITableProps> = props => {
  const columns: IColumns = useMemo(() => {
    return [
      {
        text: "Payment",
        dataField: "payment",
      },
      {
        text: "Status",
        dataField: "status",
      },
      {
        text: "Amount",
        dataField: "amount",
        formatter: (cell: number, record: IOrderDataOColumn) => (
          <p className={cell > 0 ? "text-sematic-3" : "text-sematic-1"}>
            {cell > 0 ? `+$${cell}` : `-$${-cell}`}
          </p>
        ),
      },
      {
        text: "Date",
        dataField: "date",
      },
    ];
  }, []);
  return (
    <TableContainer>
      <Search />
      <Table
        columns={columns}
        data={fakeData}
        totalSize={TOTAL_SIZE}
        page={1}
      />
    </TableContainer>
  );
};

const fakeData: IOrderDataOColumn[] = [];

for (let i = 0; i < 10; i++) {
  fakeData.push({
    payment: "Order #KF12345437",
    status: "Completed",
    date: "30/07/2021",
    amount: i % 2 === 0 ? -100 : 100,
  });
}
export default Tables;
