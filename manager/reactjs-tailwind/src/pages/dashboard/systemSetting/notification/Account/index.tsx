import { useMemo, useState } from "react";

import {
  AccountContainer,
  Container,
  ChildrenName,
  Name,
  Icon,
  ResetDefault,
  Text,
} from "./styles";
import { randomId } from "common/functions";
import Checkbox from "designs/Checkbox";
import Table, { IColumns } from "designs/TableExpandRow";
import ArrowDown from "icons/Arrows/SelectArrow";
import { ITypeAccount, IChildren } from "typings";

interface IAccountProps {}

const Account: React.FC<IAccountProps> = props => {
  const handleReset = () => {
    console.log("reset");
  };
  const handleUpdateEmail = (isChecked: boolean, record: ITypeAccount) => {
    console.log("update", record);
    console.log("isChecked", isChecked);
  };
  const handleUpdateDashboard = (isChecked: boolean, record: ITypeAccount) => {
    console.log("update", record);
    console.log("isChecked", isChecked);
  };
  const renderName = (record: ITypeAccount) => {
    return (
      <Container>
        <Name>{record?.name}</Name>
      </Container>
    );
  };
  const renderColumnExpand = (isExpand: boolean) => {
    return (
      <Container>
        <Icon>
          <ArrowDown />
        </Icon>
      </Container>
    );
  };
  const renderRow = (row: ITypeAccount) => {
    return row?.children?.map(value => (
      <ChildrenName>{value?.name}</ChildrenName>
    ));
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "",
        dataField: "name",
        formatter: (cell: string, record: ITypeAccount) => renderName(record),
        headerStyle: () => ({
          width: "300px",
        }),
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
        formatter: (_: string, record: ITypeAccount) => {
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
        formatter: (_: string, record: ITypeAccount) => {
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
    ],
    [],
  );
  const columnsSecond: IColumns = useMemo(
    () => [
      {
        text: "",
        dataField: "name",
        formatter: (cell: string, record: ITypeAccount) => renderName(record),
        headerStyle: () => ({
          width: "300px",
        }),
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
        formatter: (_: string, record: ITypeAccount) => {
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
        formatter: (_: string, record: ITypeAccount) => {
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
    ],
    [],
  );
  return (
    <AccountContainer>
      <ResetDefault>
        <Text type="button" onClick={handleReset}>
          Reset to defaults
        </Text>
      </ResetDefault>
      <Table
        expandRowProps={{
          expandByColumnOnly: true,
          expandColumnRenderer: renderColumnExpand,
          expandHeaderColumnRenderer: () => "Billing & Tax",
          renderRow: renderRow,
          showExpandColumn: true,
        }}
        isRemote
        columns={columns}
        data={billingAndTaxs}
      />
      <Table
        className="mt-2.5"
        expandRowProps={{
          expandByColumnOnly: true,
          expandColumnRenderer: renderColumnExpand,
          expandHeaderColumnRenderer: () => "Services & Programs",
          renderRow: renderRow,
          showExpandColumn: true,
        }}
        isRemote
        columns={columnsSecond}
        data={servicePrograms}
      />
      <Table
        className="mt-2.5"
        expandRowProps={{
          expandByColumnOnly: true,
          expandColumnRenderer: renderColumnExpand,
          expandHeaderColumnRenderer: () => "Feedback",
          renderRow: renderRow,
          showExpandColumn: true,
        }}
        isRemote
        columns={columnsSecond}
        data={feedback}
      />
    </AccountContainer>
  );
};

export default Account;
const billingAndTaxs: ITypeAccount[] = [
  {
    _id: randomId(),
    name: "Payment Error",
    dashboard: true,
    email: true,
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
    name: "Deposit to Kingnify Wallet",
    dashboard: true,
    email: true,
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
    name: "Resale certificate status",
    dashboard: true,
    email: false,
    options: "Email mandatory",
    children: [
      {
        name: "Email mandatory children",
      },
      {
        name: "Email mandatory children",
      },
    ],
  },
  {
    _id: randomId(),
    name: "Warehousing & Fulfillment alerts",
    dashboard: true,
    email: false,
    options: "Email or Dashboard",
    children: [
      {
        name: "Email or Dashboard children",
      },
      {
        name: "Email or Dashboard children",
      },
    ],
  },
];
const servicePrograms: ITypeAccount[] = [
  {
    _id: randomId(),
    name: "Warehousing & Fulfillment alerts",
    dashboard: true,
    email: true,
    options: "Email or Dashboard",
    children: [
      {
        name: "Email or Dashboard children",
      },
      {
        name: "Email or Dashboard children",
      },
    ],
  },
  {
    _id: randomId(),
    name: "Affiliate program alerts",
    dashboard: true,
    email: true,
    options: "Optional",
  },
];
const feedback: ITypeAccount[] = [
  {
    _id: randomId(),
    name: "Product and featured reviews",
    dashboard: true,
    email: false,
    options: "Optional",
  },
  {
    _id: randomId(),
    name: "Affiliate program alerts",
    dashboard: false,
    email: true,
    options: "Optional",
  },
];
