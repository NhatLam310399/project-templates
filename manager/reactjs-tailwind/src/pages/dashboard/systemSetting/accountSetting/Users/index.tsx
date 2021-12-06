import { useMemo, useState } from "react";
import { Formik } from "formik";

import Dialog from "./components/Dialog";
import {
  UsersContainer,
  Button,
  ContainerTitle,
  Description,
  Link,
  ContainerFilter,
  Form,
  DisplayName,
  Email,
  UserWrapper,
} from "./styles";
import SearchBox from "components/SearchBoxTable";

import { Title } from "designs/Title";
import { Wrapper } from "designs/PageLayout";
import Select from "designs/Select";
import Table, { IColumns } from "designs/TableSort";

import { IUser } from "typings/Users";

interface IUsersProps {}

const Users: React.FC<IUsersProps> = props => {
  const [userSelected, setUserSelected] = useState<IUser>({});
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickInvite = () => {
    setOpenDialog(true);
  };
  const handleSelect = (option: IUser) => {
    setUserSelected(option);
    console.log("select", option);
  };
  const fetchData = (text: string) => {};
  const renderColumnUsers = (record: IUser) => {
    return (
      <UserWrapper>
        <DisplayName>{record?.displayName}</DisplayName>
        <Email>{record?.email}</Email>
      </UserWrapper>
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
    <Wrapper>
      <ContainerTitle>
        <Title>Settings: Users</Title>
        <Button size="lg" type="button" onClick={handleClickInvite}>
          Invite others
        </Button>
      </ContainerTitle>
      <UsersContainer>
        <Description>
          <Link to="/">Permissions for user roles</Link> apply to those stores
          that the Admin/Owner has granted access to
        </Description>
        <ContainerFilter>
          <SearchBox
            className="col-span-1 phone:col-span-6"
            onFetchData={fetchData}
            placeholder="Search by users"
          />
          <Formik
            initialValues={userSelected}
            onSubmit={() => {
              null;
            }}
          >
            <Form method="post">
              <Select
                placeholder="All users"
                optionTarget="displayName"
                optionSelected={userSelected}
                options={fakeUsers}
                onSelect={handleSelect}
                name="user"
              />
            </Form>
          </Formik>
        </ContainerFilter>
        <Table columns={columns} data={fakeUsers} className="my-2.5" />
      </UsersContainer>
      <Dialog isOpen={openDialog} onClose={() => setOpenDialog(false)} />
    </Wrapper>
  );
};

export default Users;
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
