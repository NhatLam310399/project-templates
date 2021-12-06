import { useMemo } from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { TableStoreContainer } from "./styles";
import Table, { IColumns } from "designs/Table";
import SVG from "designs/SVG";
import Select from "designs/Select";
interface ITableStoreProps {}
interface IDataColumn {
  image: string;
  nameStore: string;
  method: {
    image: string;
    name: string;
  };
  storeCurreny: {
    name: string;
  };
}

import { nextStepBillingMethod } from "redux/actions/billingMethod";
const TOTAL_SIZE = 10;

const TableStore: React.FC<ITableStoreProps> = props => {
  const dispatch = useDispatch();

  const onAddMethod = (record: IDataColumn) => {
    console.log(record);
    dispatch(nextStepBillingMethod());
  };
  const columns: IColumns = useMemo(() => {
    return [
      {
        text: "Store",
        dataField: "nameStore",
        formatter: (cell: string, record: IDataColumn) => (
          <div className="flex gap-1 items-center">
            <SVG name={record.image} />
            <p>{record.nameStore}</p>
          </div>
        ),
      },
      {
        text: "Billing Method",
        dataField: "method",
        formatter: (
          cell: {
            name: string;
            image: string;
          },
          record: IDataColumn,
        ) =>
          cell.name.trim() !== "" ? (
            <div className="flex items-center gap-1 w-full">
              <SVG name={cell.image} height={30} width={30} />
              <div className="flex-1">
                <div className="w-3/5">
                  <Formik initialValues={{ method: "" }} onSubmit={() => {}}>
                    <Select
                      disabled={true}
                      placeholder="Number account"
                      optionSelected={cell}
                      options={[]}
                      name="method"
                      onSelect={option => console.log(option)}
                    />
                  </Formik>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={e => onAddMethod(record)}
            >
              <SVG name="billing/add" />
              <p className="text-primary-1">Add a billing method</p>
            </div>
          ),
      },
      {
        text: "Store currency",
        dataField: "storeCurreny",
        formatter: (cell: string, record: IDataColumn) => (
          <Formik initialValues={{ storeCurreny: "" }} onSubmit={() => {}}>
            <Select
              disabled={true}
              placeholder="Store currency"
              optionSelected={cell}
              options={[]}
              name="method"
              onSelect={option => console.log(option)}
            />
          </Formik>
        ),
      },
    ];
  }, []);
  return (
    <TableStoreContainer>
      <Table
        page={1}
        totalSize={TOTAL_SIZE}
        columns={columns}
        data={listData}
      />
    </TableStoreContainer>
  );
};

const listData: IDataColumn[] = [
  {
    image: "billing/woo",
    nameStore: "Woo test",
    method: {
      image: "billing/visa",
      name: "411111********1111",
    },
    storeCurreny: {
      name: "EUR",
    },
  },
  {
    image: "billing/amazon",
    nameStore: "Amazon test",
    method: {
      image: "billing/visa",
      name: "411111********1111",
    },
    storeCurreny: {
      name: "USD",
    },
  },
];
export default TableStore;
