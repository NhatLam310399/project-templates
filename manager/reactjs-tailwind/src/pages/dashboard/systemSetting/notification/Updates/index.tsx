import { useMemo, useState } from "react";
import { Formik } from "formik";

import {
  UpdatesContainer,
  Container,
  ChildrenName,
  Name,
  Icon,
  ResetDefault,
  Text,
} from "./styles";
import { randomId } from "common/functions";

import Checkbox from "designs/Checkbox";
import Select from "designs/Select";
import Table, { IColumns } from "designs/TableExpandRow";

import ArrowDown from "icons/Arrows/SelectArrow";
import { ITypeOrderProduct } from "typings";

interface IUpdatesProps {}

const Updates: React.FC<IUpdatesProps> = props => {
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
          if (!record?.options) {
            return "";
          } else if (record?.options === "Email or Dashboard mandatory") {
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
    <UpdatesContainer>
      <ResetDefault>
        <Text type="button" onClick={handleReset}>
          Reset to defaults
        </Text>
      </ResetDefault>
      <Table
        expandRowProps={{
          expandByColumnOnly: true,
          expandColumnRenderer: renderColumnExpand,
          expandHeaderColumnRenderer: () => "Newsletters",
          renderRow: renderRow,
          showExpandColumn: true,
        }}
        isRemote
        columns={columns}
        data={newsLetters}
      />
      <Table
        className="mt-2.5"
        expandRowProps={{
          expandByColumnOnly: true,
          expandColumnRenderer: renderColumnExpand,
          expandHeaderColumnRenderer: () => "Guides",
          renderRow: renderRow,
          showExpandColumn: true,
        }}
        isRemote
        columns={columnsSecond}
        data={guides}
      />
      <Table
        className="mt-2.5"
        expandRowProps={{
          expandByColumnOnly: true,
          expandColumnRenderer: renderColumnExpand,
          expandHeaderColumnRenderer: () => "Personalized content",
          renderRow: renderRow,
          showExpandColumn: true,
        }}
        isRemote
        columns={columnsSecond}
        data={products}
      />
    </UpdatesContainer>
  );
};

export default Updates;
const newsLetters: ITypeOrderProduct[] = [
  {
    _id: randomId(),
    name: "Warehousing & fulfillment newsletter",
    dashboard: true,
    email: true,
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
  {
    _id: randomId(),
    name: "Affiliate newsletter",
    dashboard: true,
    email: true,
    app: true,
    options: "Optional",
  },
];
const guides: ITypeOrderProduct[] = [
  {
    _id: randomId(),
    name: "Getting started with Printful",
    dashboard: true,
    email: true,
    app: true,
    options: "Optional",
  },
  {
    _id: randomId(),
    name: "Affiliate guide",
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
    options: "Optional",
  },
];
const products: ITypeOrderProduct[] = [
  {
    _id: randomId(),
    name: "Product recommendations",
    dashboard: true,
    email: false,
    app: true,
  },
  {
    _id: randomId(),
    name: "Printful features",
    dashboard: false,
    email: true,
    app: true,
  },
  {
    _id: randomId(),
    name: "Educational tips",
    dashboard: false,
    email: true,
    app: true,
  },
  {
    _id: randomId(),
    name: "Monthly satistics roundup",
    dashboard: false,
    email: true,
    app: true,
    options: "Optional",
  },
];
