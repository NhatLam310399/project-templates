import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  IBooking,
  IGetAllBooking,
  IGetAllHomePageManager,
  IRootState,
} from "common/typings";

import { GlobalIcon } from "designs/icons/GlobalIcon";

import { PATH } from "constants/routes";

import { getAllBooking } from "redux/actions/booking";
import { setBreadCrumb } from "redux/actions/_config";
import { getAllHomePageManager } from "redux/actions/homepage";

import InfoBooking from "./components/InfoBooking";
import BoxContent from "./components/BoxContent";

const Overview: React.FC = () => {
  const dispatch = useDispatch();

  const {
    allBooking: { results },
  } = useSelector((state: IRootState) => state.booking);
  const { homepage } = useSelector((state: IRootState) => state.homepage);
  const { place } = useSelector((state: IRootState) => state.place);

  const getAllBookingApi = () => {
    const payload: IGetAllBooking = {
      page: 0,
      size: 5,
      filterBooking: {
        placeId: place?._id,
      },
    };

    dispatch(getAllBooking(payload));
  };

  const getAllHomePageManagerApi = () => {
    const payload: IGetAllHomePageManager = {
      placeId: place?._id,
    };
    dispatch(getAllHomePageManager(payload));
  };

  useEffect(() => {
    if (place) {
      getAllHomePageManagerApi();
      getAllBookingApi();
    }
  }, [place]);

  const setupBreadCrumb = () => {
    dispatch(
      setBreadCrumb([
        {
          name: "Bảng điều khiển",
          path: PATH.OVERVIEW,
        },
        {
          name: "Tổng quan",
          path: PATH.OVERVIEW,
        },
      ]),
    );
  };

  useEffect(() => {
    setupBreadCrumb();
  }, []);

  return (
    <div className="overview mt-3">
      <div className="grid grid-cols-1 gap-2 phone:grid-cols-2 laptop:grid-cols-4">
        <BoxContent
          icons={
            <GlobalIcon.CalendarIcon className="text-primary fill-current" />
          }
          title="Lịch đã duyệt"
          amount={homepage?.approvedBooking}
        />
        <BoxContent
          icons={
            <GlobalIcon.CalendarIcon className="fill-current text-success" />
          }
          title="Đặt lịch chờ xử lý"
          amount={homepage?.waitingForApprovedBooking}
        />
        <BoxContent
          icons={<GlobalIcon.CalendarIcon className="fill-current text-body" />}
          title="Đặt lịch hoàn thành"
          amount={homepage?.successBooking}
        />
        <BoxContent
          icons={
            <GlobalIcon.CalendarIcon className="fill-current text-error" />
          }
          title="Lịch bị hủy"
          amount={homepage?.canceledBooking}
        />
        <BoxContent
          icons={
            <GlobalIcon.CalendarIcon className="fill-current text-error" />
          }
          title="Thu nhập"
          amount={`${homepage?.revenue} đ`}
        />
        <BoxContent
          icons={
            <GlobalIcon.CalendarIcon className="text-black fill-current" />
          }
          title="Số phòng karaoke"
          amount={homepage?.totalRoom}
        />
        <BoxContent
          icons={<GlobalIcon.TotalClientIcon />}
          title="Tổng số khách hàng"
          amount={homepage?.totalCustomer}
        />
      </div>
      {results?.length > 0 && (
        <div className="my-5">
          <h4 className="text-lg font-semibold laptop:text-xl leading-none">
            ĐẶT LỊCH GẦN ĐÂY
          </h4>
          <div className="mt-1 bg-tertiary">
            {results.map((data: IBooking, index) => (
              <InfoBooking booking={data} key={String(index)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
