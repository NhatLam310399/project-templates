import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHomePage } from "redux/actions/homepage";
import { IRootState } from "common/typings";
import SVG from "designs/SVG";
import { setBreadcrumb } from "redux/actions/_config";
import Card from "./components/Card";
import Gallery from "./components/Gallery";

const Overview: React.FC = () => {
  const dispatch = useDispatch();
  const { homepage } = useSelector((state: IRootState) => state.homepage);

  // useEffect(() => {
  //   setupBreadcrumb();
  // });

  useEffect(() => {
    dispatch(getAllHomePage());
  }, []);

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Tổng quan",
        },
      ]),
    );
  };

  return (
    <div className="overview">
      <Gallery title="Thống kê người dùng">
        <Card
          Icon={<SVG name="overview/user" />}
          title="Tổng số người dùng"
          totalCount={homepage?.totalUser}
        />
        <Card
          Icon={<SVG name="overview/karaoke-owner" />}
          title="Tổng chủ quán Karaoke"
          totalCount={homepage?.totalBoss}
        />
        <Card
          Icon={<SVG name="overview/customer-care" />}
          title="Tổng nhân viên CSKH"
          totalCount={homepage?.totalCareStaff}
        />
        <Card
          Icon={<SVG name="overview/admin" />}
          title="Tổng nhân viên hệ thống"
          totalCount={homepage?.totalManager}
        />
      </Gallery>

      <Gallery title="Thống kê công ty uy tín">
        <Card
          Icon={<SVG name="overview/company" />}
          title="Tổng công ty uy tín"
          totalCount={homepage?.totalCompany}
        />
        <Card
          Icon={<SVG name="overview/enable" />}
          title="Đang hoạt động"
          totalCount={homepage?.totalActiveCompany}
        />
        <Card
          Icon={<SVG name="overview/disable" />}
          title="Ngừng hoạt động"
          totalCount={homepage?.totalStopWorkingCompany}
        />
      </Gallery>

      <Gallery title="Thống kê quán karaoke">
        <Card
          Icon={<SVG name="overview/company" />}
          title="Tổng số quán karaoke"
          totalCount={homepage?.totalKaraoke}
        />
        <Card
          Icon={<SVG name="overview/enable" />}
          title="Đang hoạt động"
          totalCount={homepage?.totalActiveKaraoke}
        />
        <Card
          Icon={<SVG name="overview/disable" />}
          title="Ngừng hoạt động"
          totalCount={homepage?.totalStopWorkingKaraoke}
        />
      </Gallery>

      <Gallery title="Thống kê booking">
        <Card
          Icon={<SVG name="overview/supporter" />}
          title="Tổng số lượt đặt"
          totalCount={homepage?.totalBooking}
        />
        <Card
          Icon={<SVG name="overview/coupon" />}
          title="Số khuyến mã hiện tại "
          totalCount={homepage?.totalCoupon}
        />
      </Gallery>

      <Gallery title="Thống kê yêu cầu chăm sóc ">
        <Card
          Icon={<SVG name="overview/supporter" />}
          title="Đã chăm sóc"
          totalCount={homepage?.totalCareRequirements}
        />
        <Card
          Icon={<SVG name="overview/supporter-red" />}
          title="Chưa chăm sóc"
          totalCount={homepage?.totalNotCareRequirement}
        />
      </Gallery>

      <Gallery title="Thống kê chợ">
        <Card
          Icon={<SVG name="overview/cart" />}
          title="Tổng số sản phẩm"
          totalCount={homepage?.totalProduct}
        />
        <Card
          Icon={<SVG name="overview/cart-blue" />}
          title="Tổng số danh mục"
          totalCount={homepage?.totalCategory}
        />
      </Gallery>

      <Gallery title="Thống kê tài liệu">
        <Card
          Icon={<SVG name="overview/docs" />}
          title="Tổng số tài liệu"
          totalCount={homepage?.totalDocument}
        />
        <Card
          Icon={<SVG name="overview/docs-blue" />}
          title="Tổng số danh mục"
          totalCount={homepage?.totalDocumentCategory}
        />
      </Gallery>
    </div>
  );
};

export default Overview;
