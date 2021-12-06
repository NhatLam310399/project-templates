import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { Tables, TableContainer, Heading } from "./styles";
import { randomId } from "common/functions";
import { IProductStatistic } from "typings";
import Table, { IColumns } from "designs/Table";

interface ITableProductProps {
  filter: string;
}
const SIZE_PER_PAGE = 10;
const TableProduct: React.FC<ITableProductProps> = props => {
  const { filter } = props;
  const [page, setPage] = useState(0);
  const [pageVariant, setPageVariant] = useState(0);

  const columns: IColumns = useMemo(
    () => [
      {
        text: "#",
        dataField: "index",
        headerStyle: () => ({
          width: "15%",
          minWidth: "100px",
        }),
        formatter: (value: string, row: any, rowIndex: number) =>
          String(rowIndex + 1).padStart(3, "0"),
      },
      {
        text: "Product",
        dataField: "name",
        headerStyle: () => ({
          width: "55%",
          minWidth: "400px",
        }),
      },
      {
        text: "Create Date",
        dataField: "createAt",
        headerStyle: () => ({
          width: "15%",
          minWidth: "150px",
        }),
        formatter: (value: string, record: IProductStatistic) => {
          return record?.createAt
            ? dayjs(record?.createAt).format("MM/DD/YYYY")
            : "";
        },
      },
      {
        text: "Revenue",
        dataField: "revenue",
        sort: true,
        headerStyle: () => ({
          width: "15%",
          minWidth: "150px",
        }),
        formatter: (value: string) => {
          return `$${value}.00`;
        },
      },
    ],
    [],
  );
  const columnsVariant: IColumns = useMemo(
    () => [
      {
        text: "#",
        dataField: "index",
        headerStyle: () => ({
          width: "15%",
          minWidth: "100px",
        }),
        formatter: (value: string, row: any, rowIndex: number) =>
          String(rowIndex + 1).padStart(3, "0"),
      },
      {
        text: "Product",
        dataField: "name",
        headerStyle: () => ({
          width: "40%",
          minWidth: "300px",
        }),
      },
      {
        text: "Size",
        dataField: "size",
        headerStyle: () => ({
          width: "10%",
          minWidth: "100px",
        }),
      },
      {
        text: "Color",
        dataField: "color.name",
        headerStyle: () => ({
          width: "10%",
          minWidth: "100px",
        }),
      },
      {
        text: "Create Date",
        dataField: "createAt",
        headerStyle: () => ({
          width: "13%",
          minWidth: "150px",
        }),
        formatter: (value: string, record: IProductStatistic) => {
          return record?.createAt
            ? dayjs(record?.createAt).format("MM/DD/YYYY")
            : "";
        },
      },
      {
        text: "Revenue",
        dataField: "revenue",
        sort: true,
        headerStyle: () => ({
          width: "12%",
          minWidth: "150px",
        }),
        formatter: (value: string) => {
          return `$${value}.00`;
        },
      },
    ],
    [],
  );
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };
  const handleChangePageVariant = (newPage: number) => {
    setPageVariant(newPage);
  };
  return (
    <Tables>
      <TableContainer>
        <Heading>By product</Heading>
        <Table
          isRemote
          sizePerPage={SIZE_PER_PAGE}
          onPageChange={handleChangePage}
          columns={columns}
          data={products}
          page={page}
          usePagination
          totalSize={20}
        />
      </TableContainer>
      <TableContainer>
        <Heading>By variant</Heading>
        <Table
          sizePerPage={SIZE_PER_PAGE}
          isRemote
          usePagination
          onPageChange={handleChangePageVariant}
          columns={columnsVariant}
          data={variants}
          page={pageVariant}
          totalSize={30}
        />
      </TableContainer>
    </Tables>
  );
};

export default TableProduct;
const products: IProductStatistic[] = [
  {
    _id: randomId(),
    name: "Product 1",
    createAt: new Date(),
    revenue: 10,
  },
  {
    _id: randomId(),
    name: "Product 2",
    createAt: new Date(),
    revenue: 20,
  },
  {
    _id: randomId(),
    name: "Product 3",
    createAt: new Date(),
    revenue: 30,
  },
  {
    _id: randomId(),
    name: "Product 4",
    createAt: new Date(),
    revenue: 40,
  },
];
const variants: IProductStatistic[] = [
  {
    _id: randomId(),
    name: "Product 1",
    createAt: new Date(),
    revenue: 10,
    color: {
      hex: "#000",
      name: "Black",
    },
    size: "XL",
  },
  {
    _id: randomId(),
    name: "Product 2",
    createAt: new Date(),
    revenue: 20,
    color: {
      hex: "#fff",
      name: "White",
    },
    size: "XXL",
  },
  {
    _id: randomId(),
    name: "Product 3",
    createAt: new Date(),
    revenue: 30,
    color: {
      hex: "#fff",
      name: "White",
    },
    size: "L",
  },
  {
    _id: randomId(),
    name: "Product 4",
    createAt: new Date(),
    revenue: 40,
    color: {
      hex: "#000",
      name: "Black",
    },
    size: "XL",
  },
];
