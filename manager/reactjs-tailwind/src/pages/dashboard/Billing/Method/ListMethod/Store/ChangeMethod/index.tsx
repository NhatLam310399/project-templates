import { useMemo } from "react";
import { ChangeMethodContainer } from "./styles";
import Table, { IColumns } from "designs/Table";
import SVG from "designs/SVG";

interface IChangeMethodProps {}

interface IDataColumn {
  account: string;
  oldMethod: {
    image: string;
    stk: string;
    title: string;
  };
  newMethod: {
    image: string;
    stk: string;
    title: string;
  };
  changeBy: {
    name: string;
    email: string;
  };
  date: string;
}
const TOTAL_SIZE = 10;
const ChangeMethod: React.FC<IChangeMethodProps> = props => {
  const columns: IColumns = useMemo(() => {
    return [
      {
        text: "Account/Store",
        dataField: "account",
        formatter: (cell: string, record: IDataColumn) => (
          <div className="flex gap-1 items-center">
            <SVG name="billing/account" width={50} height={50} />
            <p>{cell}</p>
          </div>
        ),
      },
      {
        text: "Old Method",
        dataField: "oldMethod",
        formatter: (
          cell: {
            image: string;
            stk: string;
            title: string;
          },
          record: IDataColumn,
        ) => (
          <div>
            <div className="flex gap-1 items-center">
              <SVG name={cell.image} width={50} height={50} />
              <p>{cell.stk}</p>
            </div>
            <p className="mt-1">{cell.title}</p>
          </div>
        ),
      },
      {
        text: "New method",
        dataField: "newMethod",
        formatter: (
          cell: {
            image: string;
            stk: string;
            title: string;
          },
          record: IDataColumn,
        ) =>
          cell.stk ? (
            <div>
              <div className="flex gap-1 items-center">
                <SVG name={cell.image} width={50} height={50} />
                <p>{cell.stk}</p>
              </div>
              <p className="mt-1">{cell.title}</p>
            </div>
          ) : (
            <div className="flex gap-1 items-center">
              <SVG name="billing/none" width={50} height={50} />
              <p>None</p>
            </div>
          ),
      },
      {
        text: "Changed By",
        dataField: "changeBy",
        formatter: (
          cell: {
            name: string;
            email: string;
          },
          record: IDataColumn,
        ) => (
          <div>
            <p className="uppercase">{cell.name}</p>
            <p className="mt-1">{cell.email}</p>
          </div>
        ),
      },
      {
        text: "Date",
        dataField: "date",
      },
    ];
  }, []);
  return (
    <ChangeMethodContainer>
      <Table
        page={1}
        totalSize={TOTAL_SIZE}
        columns={columns}
        data={listData}
      />
    </ChangeMethodContainer>
  );
};

const listData: IDataColumn[] = [
  {
    account: "Account",
    oldMethod: {
      image: "billing/visa",
      stk: "****1111",
      title: "NY NY CA 10044",
    },
    newMethod: {
      image: "billing/none",
      stk: "",
      title: "",
    },
    changeBy: {
      name: "NGUYEN VAN A",
      email: "annv@sotechcom.com",
    },
    date: "Nov 28, 2020",
  },
];
export default ChangeMethod;
