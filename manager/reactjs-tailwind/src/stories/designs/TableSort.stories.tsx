import { ComponentMeta } from "@storybook/react";
import { useMemo } from "react";
import Chip from "designs/Chip";
import Table, { IColumns } from "designs/TableSort";
import { IUser } from "typings/Users";

export default {
  title: "Designs/TableSort",
  component: Table,
} as ComponentMeta<typeof Chip>;

export const Demo: React.FC = () => {
  const renderColumnUsers = (record: IUser) => {
    return (
      <div>
        <h1>{record?.displayName}</h1>
        <p>{record?.email}</p>
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "Users",
        dataField: "displayName",
        sort: true,
        headerStyle: () => ({
          width: "230px",
        }),
        formatter: (_: string, record: IUser) => renderColumnUsers(record),
      },
      {
        text: "Role",
        dataField: "role",
        sort: true,
        headerStyle: () => ({
          width: "130px",
        }),
      },
      {
        text: "Store access ",
        dataField: "access",
        sort: true,
        headerStyle: () => ({
          width: "170px",
        }),
        formatter: (value: string, record: IUser) => {
          return record?.access ? `${record?.access} stores` : "";
        },
      },
      {
        text: "Last login",
        dataField: "lastLogin",
        sort: true,
        headerStyle: () => ({
          width: "170px",
        }),
        formatter: (value: string, record: IUser) => {
          return record?.lastLogin ? `${record?.lastLogin}d ago` : "";
        },
      },
    ],
    [],
  );
  return (
    <Table className="m-5 max-w-laptop" columns={columns} data={fakeUsers} />
  );
};
const fakeUsers = [
  {
    _id: "1",
    displayName: "Nguyễn nhật Lâm",
    email: "lamdeptrai@gmail.com",
    role: "Admin/Owner",
    access: "All",
    lastLogin: 1,
  },
  {
    _id: "2",
    displayName: "Nguyễn Thanh Tùng",
    email: "tungdeptrai@gmail.com",
    role: "Owner",
    access: "5",
    lastLogin: 2,
  },
  {
    _id: "3",
    displayName: "Trịnh Trần Phương Tuấn",
    email: "tuandeptrai@gmail.com",
    role: "Admin",
    access: "8",
    lastLogin: 3,
  },
  {
    _id: "4",
    displayName: "Midu",
    email: "midu@gmail.com",
    role: "Admin",
    // access: "12",
    lastLogin: 10,
  },
];
