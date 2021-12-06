/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
  IGetAllKaraokeHighlight,
  IPlace,
  ISetPlaceHighlight,
  IUser,
  ICustomSizeImages,
} from "common/typings";

import {
  renderLocation,
  shouldDecreasePageIndex,
  getQueryFromLocation,
} from "common/functions";
import { usePage } from "common/hooks/usePage";

import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog/components/AddButton";

import Table, { IColumns } from "designs/Table";
import Logo from "designs/Logo";
import IconButton from "designs/IconButton";

import { setBreadcrumb } from "redux/actions/_config";
import { resetAction } from "redux/actions/common";
import { setIsPlaceHighlight } from "redux/actions/company";
import { getAllKaraokeHighlight } from "redux/actions/karaoke";
import { IRootState } from "redux/reducers";

import Dialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const HotKaraokesPages: React.FC<RouteComponentProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);

  const dispatch = useDispatch();
  const {
    allKaraokeHighlight: { results = [], totalCount = 0 },
  } = useSelector((state: IRootState) => state.karaoke);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  useEffect(() => {
    setupBreadcrumb();
  }, []);

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Cài đặt hệ thống",
        },
        {
          name: "Quán Karaoke nổi bật",
        },
      ]),
    );
  };

  useEffect(() => {
    getAllKaraokeAPI();
  }, [location]);

  useEffect(() => {
    if (!actionSuccess) return;
    dispatch(resetAction());
    setIsRemoveAction(false);
    if (
      isRemoveAction &&
      shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)
    ) {
      setPage(page - 1);
      // Because of when you setPage, location will be changed
      // so useEffect has Api caller in top will be call
      return;
    }
    getAllKaraokeAPI();
  }, [actionSuccess]);

  const getAllKaraokeAPI = () => {
    const payload: IGetAllKaraokeHighlight = {
      page: page - 1,
      size: SIZE_PER_PAGE,
      filterPlace: {
        highlight: true,
      },
    };
    dispatch(getAllKaraokeHighlight(payload));
  };

  const handleDelete = (record: IPlace) => {
    const payload: ISetPlaceHighlight = {
      id: record?._id || "",
      isHighlight: false,
    };
    dispatch(setIsPlaceHighlight(payload));
    setIsRemoveAction(true);
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const renderAction = (record: IPlace) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <AlertDialog
          ButtonMenu={
            <IconButton
              svgName="common/delete"
              title="Xoá khỏi danh sách nổi bật"
            />
          }
          title="Xoá quán karaoke nổi bật"
          content="Bạn có chắc chắn muốn xoá quán karaoke nổi bật này không?"
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "Logo",
        dataField: "logo",
        headerStyle: () => ({
          width: "70px",
        }),
        formatter: (logo: ICustomSizeImages) => (
          <Logo src={logo?.small || logo?.default} />
        ),
      },
      {
        text: "Tên quán",
        dataField: "name",
      },

      {
        text: "Địa chỉ",
        dataField: "street",
        formatter: (_, field: IPlace) => {
          const { province, district, ward, street } = field;
          return renderLocation([
            street,
            ward?.name,
            district?.name,
            province?.name,
          ]);
        },
      },
      {
        text: "Chủ quán",
        dataField: "user",
        formatter: (user: IUser) => user?.displayName || "",
      },
      {
        text: "Hành động ",
        dataField: "actions",
        formatter: (cell: null, record: IPlace) => renderAction(record),
      },
    ],
    [],
  );

  return (
    <div>
      <div className="grid grid-cols-1 mb-3 laptop:grid-cols-12 phone:grid-cols-6">
        <div className="col-span-2">
          <Dialog ButtonMenu={<AddButton>Thêm quán karaoke</AddButton>} />
        </div>
      </div>
      <Table
        isEmptyData={totalCount === 0}
        isRemote
        data={results}
        columns={columns}
        totalSize={totalCount}
        page={page}
        onPageChange={handleChangePage}
        sizePerPage={SIZE_PER_PAGE}
      />
    </div>
  );
};
export default withRouter(HotKaraokesPages);
