import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ICustomSizeImages, IStaticPage } from "common/typings";
import { filterTextFromHtmlString, textWithLimitWords } from "common/functions";
import { BANNER } from "constants/image";

import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog/components/AddButton";

import IconButton from "designs/IconButton";
import Table, { IColumns } from "designs/Table";

import { setBreadcrumb } from "redux/actions/_config";
import { resetAction } from "redux/actions/common";
import { getAllPages, removePages } from "redux/actions/staticPage";
import { IRootState } from "redux/reducers";

import Dialog from "./Dialog";

const SIZE_PER_PAGE = 9999;

const StaticPage: React.FC = () => {
  const dispatch = useDispatch();
  const { staticPages } = useSelector((state: IRootState) => state.staticPage);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  const [page, setPage] = useState<number>(1);

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Cài đặt hệ thống",
        },
        {
          name: "Trang tĩnh",
        },
      ]),
    );
  };

  useEffect(() => {
    setupBreadcrumb();
  }, []);
  useEffect(() => {
    getAllStaticPageAPI();
  }, [page]);
  useEffect(() => {
    if (actionSuccess) {
      getAllStaticPageAPI();
      dispatch(resetAction());
    }
  }, [actionSuccess]);

  const getAllStaticPageAPI = () => {
    dispatch(getAllPages());
  };

  const handleDelete = (record: IStaticPage) => {
    const payload = {
      id: record._id!,
    };
    dispatch(removePages(payload));
  };
  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const renderAction = (record: IStaticPage) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <Dialog
          isEdit
          editField={record}
          ButtonMenu={<IconButton svgName="common/edit" title="Chỉnh sửa" />}
        />
        <AlertDialog
          ButtonMenu={<IconButton svgName="common/delete" title="Xoá" />}
          title="Xóa trang tĩnh"
          content={`Bạn có chắc chắn muốn xoá trang tĩnh ${record.title} không ?`}
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "Hình ảnh",
        dataField: "image",
        headerStyle: () => ({
          width: "18%",
        }),
        formatter: (image: ICustomSizeImages) => (
          <img
            src={image?.small || BANNER}
            className="block object-cover w-full h-10 rounded-md"
            alt="Hình ảnh trang tĩnh"
          />
        ),
      },
      {
        text: "Tên trang tĩnh",
        dataField: "title",
      },
      // {
      //   text: "Nội dung trang",
      //   dataField: "content",
      //   headerStyle: () => ({
      //     width: "30%",
      //   }),
      //   formatter: (html: string) => {
      //     const plainString = filterTextFromHtmlString(html);
      //     const description = textWithLimitWords(plainString, 30);
      //     return <div className="text-justify">{description}</div>;
      //   },
      // },
      {
        text: "Đường dẫn",
        dataField: "url",
      },
      {
        text: "Đinh dạng",
        dataField: "category.name",
      },
      {
        text: "Hành động ",
        dataField: "actions",
        formatter: (cell: null, record: IStaticPage) => renderAction(record),
      },
    ],
    [],
  );

  return (
    <div>
      <div className="grid grid-cols-1 mb-3 laptop:grid-cols-12 phone:grid-cols-6">
        <div className="col-span-2">
          <Dialog ButtonMenu={<AddButton>Thêm trang tĩnh</AddButton>} />
        </div>
      </div>
      <Table
        isEmptyData={staticPages?.length === 0}
        data={staticPages}
        columns={columns}
        totalSize={staticPages?.length}
        page={page}
        onPageChange={handleChangePage}
        sizePerPage={SIZE_PER_PAGE}
      />
    </div>
  );
};
export default StaticPage;
