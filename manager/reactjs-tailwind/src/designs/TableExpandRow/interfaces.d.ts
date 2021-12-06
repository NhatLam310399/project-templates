import React from "react";
import { IColumns } from "./index";

export interface ITableProps {
  /**
   * @description You have to pass data here
   */
  className?: string;
  data: Array<any>;
  columns: IColumns;
  headerElement?: React.FC | string;
  sizePerPage?: number;
  onPageChange?: (page: number) => void;
  page?: number;

  /**
   * @description You have to enable this prop if you want to call API whenever page index changed
   */
  isRemote?: boolean; // when you call api with a part load, use this
  /**
   * @description Total items of response data (or length of array)
   */
  totalSize?: number;
  onClickRow?: (rowIndex: number) => void;
  onTableChange?: (page: number) => void;
  /**
   * @description if you want click only first column to expand so you set useIndicatorColumn = true and use headerHasExpand replace text of first column
   *
   */
  expandRowProps: IExpandRowProps;
  renderRow?: (row: any, headerHasExpand?: string, isExpand?: boolean) => void;
}
interface IExpandRowProps {
  /**
   * @description if you want click only first column to expand so you set showExpandColumn = true, expandByColumnOnly = true and use expandHeaderColumnRenderer render to text replace text of first column
   *
   */
  showExpandColumn: boolean;
  expandHeaderColumnRenderer: (isAnyExpands: boolean) => void;
  expandByColumnOnly: boolean;

  renderRow: (row: any) => void;
  expandColumnRenderer: (expanded: boolean) => void;
}
