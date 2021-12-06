/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import {
  ICustomSizeImages,
  IGetAllKaraoke,
  IPlace,
  IRootState,
  IUpdateUserByAdminInput,
} from "common/typings";
import { usePage } from "common/hooks/usePage";
import {
  getQueryFromLocation,
  renderLocation,
  shouldDecreasePageIndex,
} from "common/functions";
import { PATH } from "constants/routes";

import AlertDialog from "components/AlertDialog";
import SearchBoxTable from "components/SearchboxTable";

import Logo from "designs/Logo";
import Table, { IColumns } from "designs/Table";
import Tag from "designs/Tag";
import IconButton from "designs/IconButton";

import {
  changeKaraokeToCompany,
  deleteKaraokeById,
  getAllKaraoke,
} from "redux/actions/karaoke";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import { deleteUser } from "redux/actions/users";

import { deleteUserById, updateUserByAdmin } from "services/users";

const SIZE_PER_PAGE = 10;

const KaraokePage: React.FC<RouteComponentProps> = ({ location, history }) => {
  const dispatch = useDispatch();
  const {
    allKaraoke: { results = [], totalCount },
  } = useSelector((state: IRootState) => state.karaoke);

  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );

  const [keyword, setKeyword] = useState<string>("");
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);

  useEffect(() => {
    if (!actionSuccess) return;
    dispatch(resetAction());
    setIsRemoveAction(false);
    if (
      isRemoveAction &&
      shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)
    ) {
      setPage(page - 1);
      return;
    }
    getAllKaraokeAPI();
  }, [actionSuccess]);

  useEffect(() => {
    setupBreadcrumb();
  }, []);

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Quản lý doanh nghiệp",
        },
        {
          name: "Quán karaoke",
        },
      ]),
    );
  };

  useEffect(() => {
    getAllKaraokeAPI(keyword);
  }, [page]);

  const getAllKaraokeAPI = (name = "") => {
    const payload: IGetAllKaraoke = {
      filterPlace: { name },
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllKaraoke(payload));
  };

  const handleFetchData = (text: string) => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getAllKaraokeAPI(text);
    }
  };

  const handleDelete = (record: IPlace) => {
    dispatch(deleteKaraokeById({ id: record._id || null }));
    const { user } = record;
    deleteUserById({ id: user!._id! });
  };

  const handleConvertBusinessType = (record: IPlace) => {
    dispatch(changeKaraokeToCompany({ id: record._id || null }));
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const renderAction = (record: IPlace) => {
    return (
      <div className="flex flex-row justify-end gap-1">
        <AlertDialog
          ButtonMenu={
            <IconButton
              svgName="common/convert"
              title="Chuyển loại hình doanh nghiệp"
            />
          }
          title="Chuyển loại hình doanh nghiệp"
          content={`Bạn có muốn chuyển quán karaoke ${record?.name} sang công ty uy tín không?`}
          onConfirm={() => handleConvertBusinessType(record)}
        />
        <Link to={`${PATH.BUSINESS_MANAGEMENT.KARAOKE}/${record?._id}`}>
          <IconButton svgName="common/edit" title="Chỉnh sửa" />
        </Link>
        <AlertDialog
          ButtonMenu={<IconButton svgName="common/delete" title="Xoá" />}
          title="Xóa quán karaoke"
          content={`Bạn có chắc chắn muốn xoá quán: ${record.name} không?`}
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };

  const columns: IColumns = useMemo(() => {
    return [
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
        text: "Tên cơ sở",
        dataField: "name",
      },
      {
        text: "Số điện thoại",
        dataField: "phoneNumber",
      },
      {
        text: "Địa chỉ",
        dataField: "location",
        formatter: (_: unknown, record: IPlace) =>
          renderLocation([
            record?.ward?.name,
            record?.district?.name,
            record?.province?.name,
          ]),
      },
      {
        text: "Trạng thái",
        dataField: "enabled",
        formatter: (enabled: boolean) => {
          return enabled ? (
            <Tag active>Hoạt động</Tag>
          ) : (
            <Tag active={false}>Bị khoá</Tag>
          );
        },
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (cell: null, record: IPlace) => renderAction(record),
      },
    ];
  }, []);

  return (
    <>
      <div className="float-right max-w-full mb-3 w-26">
        <SearchBoxTable
          onFetchData={handleFetchData}
          placeholder="Tìm kiếm theo tên"
        />
      </div>
      <Table
        isRemote
        data={results}
        columns={columns}
        totalSize={totalCount}
        page={page}
        onPageChange={handleChangePage}
        sizePerPage={SIZE_PER_PAGE}
        isEmptyData={!isLoading && totalCount === 0}
      />
    </>
  );
};

export default withRouter(KaraokePage);
