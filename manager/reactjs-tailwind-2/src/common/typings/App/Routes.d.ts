import React from "react";

import { IIconSVGProps } from "./Icons";

export interface IRoute {
  name: string;
  path: string;
  isPrivate: boolean;
  isShare?: boolean;
  exact?: boolean;
  Component?: JSX.Element<any, any>;
  Icon?: React.FC<IIconSVGProps>;
}

export interface IRoutes extends IRoute {
  children?: IRoutes[];
}
