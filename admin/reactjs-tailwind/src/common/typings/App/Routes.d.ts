import React, { ReactComponent } from "react";

import { IIconSVGProps } from "./Icons";

export interface IParams {
  [k: string]: any;
}

export interface IRoute {
  name: string;
  path: string;
  isPrivate: boolean;
  exact?: boolean;
  Component?: JSX.Element<any, any>;
  Icon?: ReactComponent;
  /**
   * this route won't be appear in dashboard drawer.
   * it is just accessed by URL
   */
  hiddenRoute?: boolean;
}

export interface IRoutes extends IRoute {
  children?: IRoutes[];
}
