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
          name: "Qu???n l?? doanh nghi???p",
        },
        {
          name: "Qu??n karaoke",
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
              title="Chuy???n lo???i h??nh doanh nghi???p"
            />
          }
          title="Chuy???n lo???i h??nh doanh nghi???p"
          content={`B???n c?? mu???n chuy???n qu??n karaoke ${record?.name} sang c??ng ty uy t??n kh??ng?`}
          onConfirm={() => handleConvertBusinessType(record)}
        />
        <Link to={`${PATH.BUSINESS_MANAGEMENT.KARAOKE}/${record?._id}`}>
          <IconButton svgName="common/edit" title="Ch???nh s???a" />
        </Link>
        <AlertDialog
          ButtonMenu={<IconButton svgName="common/delete" title="Xo??" />}
          title="X??a qu??n karaoke"
          content={`B???n c?? ch???c ch???n mu???n xo?? qu??n: ${record.name} kh??ng?`}
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
        text: "T??n c?? s???",
        dataField: "name",
      },
      {
        text: "S??? ??i???n tho???i",
        dataField: "phoneNumber",
      },
      {
        text: "?????a ch???",
        dataField: "location",
        formatter: (_: unknown, record: IPlace) =>
          renderLocation([
            record?.ward?.name,
            record?.district?.name,
            record?.province?.name,
          ]),
      },
      {
        text: "Tr???ng th??i",
        dataField: "enabled",
        formatter: (enabled: boolean) => {
          return enabled ? (
            <Tag active>Ho???t ?????ng</Tag>
          ) : (
            <Tag active={false}>B??? kho??</Tag>
          );
        },
      },
      {
        text: "H??nh ?????ng",
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
          placeholder="T??m ki???m theo t??n"
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
