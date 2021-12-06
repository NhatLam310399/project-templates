/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";

import {
  ICustomSizeImages,
  IPlace,
  IRootState,
  IUpdateUserByAdminInput,
} from "common/typings";
import { shouldDecreasePageIndex } from "common/functions";
import { getQueryFromLocation } from "common/functions/route/getQueryFromLocation";
import { usePage } from "common/hooks/usePage";
import { renderLocation } from "common/functions/string/renderLocation";
import { PATH } from "constants/routes";

import AlertDialog from "components/AlertDialog";
import SearchBoxTable from "components/SearchboxTable";

import Tag from "designs/Tag";
import IconButton from "designs/IconButton";
import Logo from "designs/Logo";
import Table, { IColumns } from "designs/Table";

import { setBreadcrumb } from "redux/actions/_config";
import { resetAction } from "redux/actions/common";
import { deleteCompanyById, getAllCompany } from "redux/actions/company";
import { changeCompanyToKaraoke } from "redux/actions/karaoke";
import { deleteUser, updateUserByAdmin } from "redux/actions/users";

const SIZE_PER_PAGE = 10;

const CompaniesPage: React.FC<RouteComponentProps> = ({
  location,
  history,
}) => {
  const dispatch = useDispatch();
  const {
    allCompany: { results = [], totalCount },
  } = useSelector((state: IRootState) => state.company);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);

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
          name: "Công ty đã được xét duyệt",
        },
      ]),
    );
  };

  useEffect(() => {
    getAllCompanyAPI(keyword);
  }, [page]);

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
    if (keyword) {
      getAllCompanyAPI(keyword);
    } else {
      getAllCompanyAPI();
    }
  }, [actionSuccess]);

  const getAllCompanyAPI = (name = "") => {
    dispatch(
      getAllCompany({
        filterPlace: { name },
        page: page - 1,
        size: SIZE_PER_PAGE,
      }),
    );
  };

  const handleFetchData = (text: string) => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getAllCompanyAPI(text);
    }
  };

  const handleDelete = (record: IPlace) => {
    dispatch(deleteCompanyById({ id: record._id || null }));
    const { user } = record;
    dispatch(deleteUser({ id: user!._id! }));
    setIsRemoveAction(true);
  };

  const handleConvertBusinessType = (record: IPlace) => {
    dispatch(changeCompanyToKaraoke({ id: record._id || null }));
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const renderAction = (record: IPlace) => {
    return (
      <div className="flex items-center justify-end gap-x-1">
        <AlertDialog
          ButtonMenu={
            <IconButton
              svgName="common/convert"
              title="Chuyển loại hình doanh nghiệp"
            />
          }
          title="Chuyển loại hình doanh nghiệp"
          content={`Bạn có muốn chuyển công ty ${record?.name} sang quán karaoke không?`}
          onConfirm={() => handleConvertBusinessType(record)}
        />
        <Link to={`${PATH.BUSINESS_MANAGEMENT.COMPANY}/${record?._id}`}>
          <IconButton svgName="common/edit" title="Chỉnh sửa" />
        </Link>
        <AlertDialog
          ButtonMenu={<IconButton svgName="common/delete" title="Xoá" />}
          title="Xóa "
          content={`Bạn có chắc chắn muốn xoá công ty: ${record.name} không?`}
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
        formatter: (enable: boolean) => {
          return enable ? (
            <Tag active>Hoạt động</Tag>
          ) : (
            <Tag active={false}>Ngường hoạt động</Tag>
          );
        },
      },
      {
        text: "Hành động ",
        dataField: "actions",
        formatter: (_: unknown, record: IPlace) => renderAction(record),
      },
    ],
    [],
  );
  return (
    <div>
      <div className="float-right max-w-full mb-3 w-26">
        <SearchBoxTable
          onFetchData={handleFetchData}
          placeholder="Tìm kiếm theo tên"
        />
      </div>
      <Table
        data={results}
        isRemote
        isEmptyData={totalCount === 0}
        columns={columns}
        totalSize={totalCount}
        page={page}
        onPageChange={handleChangePage}
        sizePerPage={SIZE_PER_PAGE}
      />
    </div>
  );
};
export default withRouter(CompaniesPage);
