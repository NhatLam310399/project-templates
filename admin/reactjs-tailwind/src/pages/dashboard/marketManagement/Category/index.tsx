/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";

import {
  ICustomSizeImages,
  IRootState,
  IGetTypesByCode,
  ITypes,
} from "common/typings";
import {
  getQueryFromLocation,
  shouldDecreasePageIndex,
} from "common/functions";
import { usePage } from "common/hooks/usePage";

import { PRODUCT_TYPE_CODE } from "constants/types";

import { AddButton } from "components/Dialog/components/AddButton";
import AlertDialog from "components/AlertDialog";

import Table, { IColumns } from "designs/Table";
import IconButton from "designs/IconButton";
import { SkeletonLogo } from "designs/Logo";

import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import { getTypesByCode, removeTypes } from "redux/actions/types";

import ProductCategoryDialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const ProductCategory: React.FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useDispatch();

  const {
    listTypes: { results, totalCount },
  } = useSelector((state: IRootState) => state.types);

  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);

  const getTypesByCodeApi = () => {
    const payload: IGetTypesByCode = {
      code: PRODUCT_TYPE_CODE,
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getTypesByCode(payload));
  };

  useEffect(() => {
    getTypesByCodeApi();
  }, []);

  useEffect(() => {
    getTypesByCodeApi();
  }, [page]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
        setPage(page - 1);
        return;
      }
      getTypesByCodeApi();
    }
  }, [actionSuccess]);

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleDelete = (record: ITypes) => {
    dispatch(removeTypes({ id: record._id! }));
  };

  const renderAction = (record: ITypes) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <ProductCategoryDialog
          editField={record}
          ButtonMenu={
            <IconButton
              title="Ch???nh s???a"
              svgName="common/edit"
              className="block leading-none"
            />
          }
        />
        <AlertDialog
          className="block leading-none"
          ButtonMenu={<IconButton title="Xo??" svgName="common/delete" />}
          title="X??a danh m???c s???n ph???m"
          content={`B???n c?? ch???c ch???n mu???n x??a danh m???c s???n ph???m ${record.name} kh??ng?`}
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "H??nh ???nh",
        dataField: "image",
        formatter: (image: ICustomSizeImages) => {
          return (
            <img
              src={image.small || image.default || SkeletonLogo}
              alt="H??nh ???nh"
              className="block object-cover w-10 h-4 rounded"
            />
          );
        },
      },
      {
        text: "T??n danh m???c",
        dataField: "name",
      },
      {
        text: "H??nh ?????ng",
        dataField: "actions",
        formatter: (text: string, record: ITypes) => renderAction(record),
      },
    ],
    [],
  );

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Qu???n l?? ch???",
        },
        {
          name: "Danh m???c s???n ph???m",
        },
      ]),
    );
  };

  useEffect(() => {
    setupBreadcrumb();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-2 mb-3 phone:gap-0 phone:flex-row phone:items-center phone:space-x-1">
        <ProductCategoryDialog
          ButtonMenu={<AddButton>Th??m danh m???c</AddButton>}
        />
      </div>
      <Table
        data={results}
        columns={columns}
        isEmptyData={!isLoading && totalCount === 0}
        page={page}
        onPageChange={handleChangePage}
        totalSize={totalCount}
        sizePerPage={SIZE_PER_PAGE}
        isRemote
      />
    </div>
  );
};
export default ProductCategory;
