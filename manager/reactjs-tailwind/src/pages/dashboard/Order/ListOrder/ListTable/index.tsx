import { useMemo } from "react";

import faker from "faker";
import { FilterBoxContainer } from "./styles";
import FilterBoxTable from "./FilterBox";
import Avatar from "designs/Avatar";
import Table, { IColumns } from "designs/Table";

const TOTAL_SIZE = 100;

interface IListOrderProps {}

interface IOrderDataOColumn {
  avatarStore: string;
  order: number;
  date: string;
  from: string;
  status: string;
  total: number;
}

const ListOrder: React.FC<IListOrderProps> = () => {
  const columns: IColumns = useMemo(() => {
    return [
      {
        text: "Store",
        dataField: "avatarStore",
        formatter: (cell: string, record: IOrderDataOColumn) => (
          <Avatar src={cell} />
        ),
      },
      {
        text: "Order",
        dataField: "order",
      },
      {
        text: "Date",
        dataField: "date",
        headerStye: () => ({
          width: "100%",
        }),
      },
      {
        text: "From",
        dataField: "from",
      },
      {
        text: "Status",
        dataField: "status",
      },
      {
        text: "Total",
        dataField: "total",
        formatter: (cell: number, record: IOrderDataOColumn) => `$${cell}`,
      },
    ];
  }, []);

  return (
    <FilterBoxContainer>
      <FilterBoxTable />
      <Table
        columns={columns}
        data={fakeData}
        totalSize={TOTAL_SIZE}
        page={1}
      />
    </FilterBoxContainer>
  );
};

const fakeData: IOrderDataOColumn[] = [];

for (let i = 0; i < 10; i++) {
  fakeData.push({
    avatarStore: faker.image.avatar(),
    order: 12345,
    date: "Jul 30, 02:10 AM",
    from: faker.name.findName(),
    status: "Draft",
    total: 46.64,
  });
}

export default ListOrder;
