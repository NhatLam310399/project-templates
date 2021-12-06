import { useMemo, useState } from "react";
import { Formik } from "formik";

import {
  OrderAndProductContainer,
  Container,
  ChildrenName,
  Name,
  Icon,
  ResetDefault,
  Text,
  Form,
  TopContainer,
  Img,
  Logo,
  Option,
} from "./styles";
import { randomId } from "common/functions";

import Checkbox from "designs/Checkbox";
import Select from "designs/Select";
import Table, { IColumns } from "designs/TableExpandRow";

import ArrowDown from "icons/Arrows/SelectArrow";
import { ITypeOrderProduct } from "typings";
interface IOrderAndProductProps {}
interface IStore {
  _id?: string;
  name?: string;
  image?: string;
  brand?: string;
}
const OrderAndProduct: React.FC<IOrderAndProductProps> = props => {
  const [storeSelected, setStoreSelected] = useState<IStore>({});

  const handleReset = () => {
    console.log("reset");
  };

  const handleSetForAll = () => {
    console.log("set for all");
  };

  const handleUpdateEmail = (isChecked: boolean, record: ITypeOrderProduct) => {
    console.log("update", record);
    console.log("isChecked", isChecked);
  };

  const handleUpdateDashboard = (
    isChecked: boolean,
    record: ITypeOrderProduct,
  ) => {
    console.log("update", record);
    console.log("isChecked", isChecked);
  };

  const handleUpdateApp = (isChecked: boolean, record: ITypeOrderProduct) => {
    console.log("update", record);
    console.log("isChecked", isChecked);
  };

  const handleSelectedStore = (option: IStore) => {
    console.log("option", option);
    setStoreSelected(option);
  };

  const renderName = (record: ITypeOrderProduct) => {
    return (
      <Container>
        <Name>{record?.name}</Name>
      </Container>
    );
  };

  const renderColumnExpand = (isExpand: boolean) => {
    return (
      <Icon>
        <ArrowDown />
      </Icon>
    );
  };
  const renderRow = (row: ITypeOrderProduct) => {
    return row?.children?.map(value => (
      <ChildrenName>{value?.name}</ChildrenName>
    ));
  };
  const renderOption = (option: IStore) => {
    return (
      <Option>
        <Logo>
          <Img src={option?.image} />
        </Logo>
        <Name>{option?.name}</Name>
      </Option>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "",
        dataField: "name",
        headerStyle: () => ({
          width: "300px",
        }),
        formatter: (cell: string, record: ITypeOrderProduct) =>
          renderName(record),
      },
      {
        text: "",
        dataField: "options",
        headerStyle: () => ({
          width: "300px",
        }),
      },
      {
        text: "Email",
        dataField: "email",
        headerStyle: () => ({
          width: "100px",
        }),
        formatter: (_: string, record: ITypeOrderProduct) => {
          if (record?.options === "Email mandatory") {
            return <Checkbox primary disabled={true} initialCheck={true} />;
          } else {
            const handleChangEmail = (isChecked: boolean) => {
              handleUpdateEmail && handleUpdateEmail(isChecked, record);
            };
            return (
              <Checkbox
                primary
                initialCheck={record?.email || false}
                onChange={handleChangEmail}
              />
            );
          }
        },
      },
      {
        text: "Dashboard",
        dataField: "dashboard",
        headerStyle: () => ({
          width: "100px",
        }),
        formatter: (_: string, record: ITypeOrderProduct) => {
          if (record?.options === "Email or Dashboard mandatory") {
            return <Checkbox primary disabled={true} initialCheck={true} />;
          } else {
            const handleDashboard = (isChecked: boolean) => {
              handleUpdateDashboard && handleUpdateDashboard(isChecked, record);
            };
            return (
              <Checkbox
                primary
                initialCheck={record?.dashboard || false}
                onChange={handleDashboard}
              />
            );
          }
        },
      },
      {
        text: "App",
        dataField: "app",
        headerStyle: () => ({
          width: "100px",
        }),
        formatter: (_: string, record: ITypeOrderProduct) => {
          const handleChangeApp = (isChecked: boolean) => {
            handleUpdateApp && handleUpdateApp(isChecked, record);
          };
          return (
            <Checkbox
              primary
              initialCheck={record?.app || false}
              onChange={handleChangeApp}
            />
          );
        },
      },
    ],
    [],
  );
  const columnsSecond: IColumns = useMemo(
    () => [
      {
        text: "",
        dataField: "name",
        headerStyle: () => ({
          width: "300px",
        }),
        formatter: (cell: string, record: ITypeOrderProduct) =>
          renderName(record),
      },
      {
        text: "",
        dataField: "options",
        headerStyle: () => ({
          width: "300px",
        }),
      },
      {
        text: "",
        dataField: "email",
        headerStyle: () => ({
          width: "100px",
        }),
        formatter: (_: string, record: ITypeOrderProduct) => {
          if (record?.options === "Email mandatory") {
            return <Checkbox primary disabled={true} initialCheck={true} />;
          } else {
            const handleChangEmail = (isChecked: boolean) => {
              handleUpdateEmail && handleUpdateEmail(isChecked, record);
            };
            return (
              <Checkbox
                primary
                initialCheck={record?.email || false}
                onChange={handleChangEmail}
              />
            );
          }
        },
      },
      {
        text: "",
        dataField: "dashboard",
        headerStyle: () => ({
          width: "100px",
        }),
        formatter: (_: string, record: ITypeOrderProduct) => {
          if (record?.options === "Email or Dashboard mandatory") {
            return <Checkbox primary disabled={true} initialCheck={true} />;
          } else {
            const handleDashboard = (isChecked: boolean) => {
              handleUpdateDashboard && handleUpdateDashboard(isChecked, record);
            };
            return (
              <Checkbox
                primary
                initialCheck={record?.dashboard || false}
                onChange={handleDashboard}
              />
            );
          }
        },
      },
      {
        text: "",
        dataField: "app",
        headerStyle: () => ({
          width: "100px",
        }),
        formatter: (_: string, record: ITypeOrderProduct) => {
          const handleChangeApp = (isChecked: boolean) => {
            handleUpdateApp && handleUpdateApp(isChecked, record);
          };
          return (
            <Checkbox
              primary
              initialCheck={record?.app || false}
              onChange={handleChangeApp}
            />
          );
        },
      },
    ],
    [],
  );
  return (
    <OrderAndProductContainer>
      <TopContainer>
        <Formik
          initialValues={storeSelected}
          onSubmit={() => {
            null;
          }}
        >
          <Form method="post">
            <Select
              renderOption={renderOption}
              placeholder="Choose store"
              name="store"
              options={stores}
              optionSelected={storeSelected}
              onSelect={handleSelectedStore}
            />
          </Form>
        </Formik>
        <ResetDefault>
          <Text type="button" onClick={handleSetForAll}>
            Set for all stores
          </Text>
          <Text type="button" onClick={handleReset}>
            Reset to defaults
          </Text>
        </ResetDefault>
      </TopContainer>

      <Table
        expandRowProps={{
          expandByColumnOnly: true,
          expandColumnRenderer: renderColumnExpand,
          expandHeaderColumnRenderer: () => "Orders",
          renderRow: renderRow,
          showExpandColumn: true,
        }}
        isRemote
        columns={columns}
        data={orders}
      />
      <Table
        className="mt-2.5"
        expandRowProps={{
          expandByColumnOnly: true,
          expandColumnRenderer: renderColumnExpand,
          expandHeaderColumnRenderer: () => "Shipments",
          renderRow: renderRow,
          showExpandColumn: true,
        }}
        isRemote
        columns={columnsSecond}
        data={shipments}
      />
      <Table
        className="mt-2.5"
        expandRowProps={{
          expandByColumnOnly: true,
          expandColumnRenderer: renderColumnExpand,
          expandHeaderColumnRenderer: () => "Products",
          renderRow: renderRow,
          showExpandColumn: true,
        }}
        isRemote
        columns={columnsSecond}
        data={products}
      />
    </OrderAndProductContainer>
  );
};

export default OrderAndProduct;
const orders: ITypeOrderProduct[] = [
  {
    _id: randomId(),
    name: "Print file issues",
    dashboard: true,
    email: true,
    app: false,
    options: "Email or Dashboard mandatory",
    children: [
      {
        name: "Email or Dashboard mandatory children",
      },
      {
        name: "Email or Dashboard mandatory children",
      },
    ],
  },
  {
    _id: randomId(),
    name: "Active order errors",
    dashboard: true,
    email: true,
    app: true,
    options: "Optional",
    children: [
      {
        name: "Optional children",
      },
      {
        name: "Optional children",
      },
    ],
  },
  {
    _id: randomId(),
    name: "Unfinished order reminders",
    dashboard: true,
    email: false,
    app: true,
    options: "Optional",
    children: [
      {
        name: "Optional children",
      },
      {
        name: "Optional children",
      },
    ],
  },
  {
    _id: randomId(),
    name: "Confirmations and status updates",
    dashboard: true,
    email: false,
    app: false,
    options: "Optional",
    children: [
      {
        name: "Optional children",
      },
      {
        name: "Optional children",
      },
    ],
  },
];
const shipments: ITypeOrderProduct[] = [
  {
    _id: randomId(),
    name: "Shipment alerts",
    dashboard: true,
    email: true,
    app: true,
    options: "Email or Dashboard mandatory",
    children: [
      {
        name: "Email or Dashboard mandatory children",
      },
      {
        name: "Email or Dashboard mandatory children",
      },
    ],
  },
  {
    _id: randomId(),
    name: "HQ pickup notices",
    dashboard: true,
    email: true,
    app: false,
    options: "Optional",
  },
  {
    _id: randomId(),
    name: "Return address change status",
    dashboard: true,
    email: true,
    app: true,
    options: "Email mandatory",
  },
];
const products: ITypeOrderProduct[] = [
  {
    _id: randomId(),
    name: "Sync issues",
    dashboard: true,
    email: false,
    app: true,
    options: "Optional",
  },
  {
    _id: randomId(),
    name: "Discontinuous alerts",
    dashboard: false,
    email: true,
    app: true,
    options: "Email or Dashboard mandatory",
  },
  {
    _id: randomId(),
    name: "Out of stock alerts",
    dashboard: false,
    email: true,
    app: true,
    options: "Email or Dashboard mandatory",
  },
];
const stores: IStore[] = [
  {
    _id: randomId(),
    image: "/",
    name: "Kingify",
    brand: "brand Kingify",
  },
  {
    _id: randomId(),
    image: "/",
    name: "VinMart",
    brand: "brand VinMart",
  },
  {
    _id: randomId(),
    image: "/",
    name: "Phuc Long",
    brand: "brand Phuc Long",
  },
];
