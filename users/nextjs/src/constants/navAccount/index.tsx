import { SVG } from "@designs/SVG";
import { PATH } from "@routes/index";

export type IEmployerNavItems = {
  type?: string;
  name?: string;
  href?: string;
  icon?: React.ReactNode;
};

export interface IEmployerNav extends IEmployerNavItems {
  children?: IEmployerNavItems[];
}

export const userNavItems: IEmployerNav[] = [
  {
    type: "PROFILE",
    name: "Quản lý tài khoản",
    icon: <SVG name="employer/user" width="16" />,
  },
  {
    type: "COMPANY",
    name: "Thông tin công ty",
    icon: <SVG name="employer/paper" width="16" />,
  },
];
