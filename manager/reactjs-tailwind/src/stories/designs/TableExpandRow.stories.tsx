import { useMemo } from "react";
import { randomId } from "common/functions";
import Table, { IColumns } from "designs/TableExpandRow";
import { ITypeAccount, IIconSVGProps } from "typings";
import Checkbox from "designs/Checkbox";

export default {
  title: "Designs/TableExpandRow",
  component: Table,
};

export const Demo: React.FC = () => {
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
      <div className="py-1 ml-1">
        <p className="text-lg">{record?.name}</p>
      </div>
    );
  };
  const renderColumnExpand = (isExpand: boolean) => {
    return (
      <div className="ml-2">
        <div className="w-2.5 flex items-center justify-center min-w-max">
          <ArrowIcon />
        </div>
      </div>
    );
  };
  const renderRow = (row: ITypeAccount) => {
    return row?.children?.map(value => (
      <p className="py-1 text-sm">{value?.name}</p>
    ));
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "",
        dataField: "name",
        formatter: (cell: string, record: ITypeAccount) => renderName(record),
      },
      {
        text: "",
        dataField: "options",
      },
      {
        text: "Email",
        dataField: "email",
        headerStyle: () => ({
          width: "13%",
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
          width: "13%",
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
    <Table
      className="mt-5 max-w-laptop"
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
  );
};
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

const ArrowIcon: React.FC<IIconSVGProps> = props => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.8805 9.79006L12.0005 13.6701L8.12047 9.79006C7.73047 9.40006 7.10047 9.40006 6.71047 9.79006C6.32047 10.1801 6.32047 10.8101 6.71047 11.2001L11.3005 15.7901C11.6905 16.1801 12.3205 16.1801 12.7105 15.7901L17.3005 11.2001C17.6905 10.8101 17.6905 10.1801 17.3005 9.79006C16.9105 9.41006 16.2705 9.40006 15.8805 9.79006Z"
        fill="currentColor"
      />
    </svg>
  );
};
