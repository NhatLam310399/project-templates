import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { IGetRevenueKaraoke, IRootState } from "common/typings";
import { getYearOption } from "common/functions";

import { setBreadCrumb } from "redux/actions/_config";
import { getRevenueKaraoke } from "redux/actions/revenueKaraoke";

import { PATH } from "constants/routes";
import Select from "designs/Select";

import CustomizedDot from "./components/CustomizedDot";

interface IStatus {
  name?: string;
  value?: Date;
}
interface IStatistic {
  name?: string;
  revenue?: number | undefined;
}

const Statistics: React.FC = () => {
  const dispatch = useDispatch();

  const [yearSelected, setYearSelected] = useState<IStatus | undefined>();
  const [monthSelected, setMonthSelected] = useState<
    IStatistic | undefined | null
  >();

  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState<number | undefined>();

  const { place } = useSelector((state: IRootState) => state.place);

  const { revenueKaraoke } = useSelector(
    (state: IRootState) => state.revenueKaraoke,
  );

  const dataByMonth = [
    {
      name: "Tháng 1",
      revenue: revenueKaraoke?.january,
    },
    {
      name: "Tháng 2",
      revenue: revenueKaraoke?.february,
    },
    {
      name: "Tháng 3",
      revenue: revenueKaraoke?.march,
    },
    {
      name: "Tháng 4",
      revenue: revenueKaraoke?.april,
    },
    {
      name: "Tháng 5",
      revenue: revenueKaraoke?.may,
    },
    {
      name: "Tháng 6",
      revenue: revenueKaraoke?.june,
    },
    {
      name: "Tháng 7",
      revenue: revenueKaraoke?.july,
    },
    {
      name: "Tháng 8",
      revenue: revenueKaraoke?.august,
    },
    {
      name: "Tháng 9",
      revenue: revenueKaraoke?.september,
    },
    {
      name: "Tháng 10",
      revenue: revenueKaraoke?.october,
    },
    {
      name: "Tháng 11",
      revenue: revenueKaraoke?.november,
    },
    {
      name: "Tháng 12",
      revenue: revenueKaraoke?.december,
    },
  ];

  useEffect(() => {
    if (place) {
      getRevenueKaraokeApi();
    }
  }, [place, yearSelected]);

  const getRevenueKaraokeApi = () => {
    const payload: IGetRevenueKaraoke = {
      idKara: place?._id,
      year: yearSelected?.value || new Date(),
    };
    dispatch(getRevenueKaraoke(payload));
  };

  useEffect(() => {
    setupBreadCrumb();
  }, []);

  const setupBreadCrumb = () => {
    dispatch(
      setBreadCrumb([
        {
          name: "Bảng điều khiển",
          path: PATH.OVERVIEW,
        },
        {
          name: "Thống kê thu nhập",
          path: PATH.STATISTIC,
        },
      ]),
    );
  };

  // update size when resize window
  useEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (size && size <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [size]);

  const handleYearSelected = (option: IStatus) => {
    setYearSelected(option);
    monthSelected && setMonthSelected(null);
  };

  return (
    <div className="">
      <div className="flex gap-x-2">
        <div className="w-27">
          <Select
            value={yearSelected?.name}
            placeholder="Thống kê theo năm"
            options={getYearOption(
              dayjs(place?.createdAt).toDate().getFullYear(),
              new Date().getFullYear(),
            )}
            onSelectOption={handleYearSelected}
          />
        </div>
        <div className="w-27">
          <Select
            value={monthSelected?.name}
            placeholder="Thống kê theo tháng"
            options={dataByMonth}
            disabled={!yearSelected}
            onSelectOption={selected => {
              setMonthSelected(selected);
            }}
          />
        </div>
      </div>
      <div className="w-full h-70 mt-5 border p-2 rounded border-line">
        <ResponsiveContainer
          aspect={2}
          width="100%"
          className="min-w-full font-semibold text-sm"
        >
          <LineChart
            width={1000}
            height={500}
            data={dataByMonth}
            margin={{
              top: 5,
              right: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <XAxis dataKey="name" height={40} tickMargin={15} />
            <YAxis
              unit={!isMobile ? " triệu" : ""}
              width={85}
              tickMargin={15}
            />
            <Line
              name="Doanh thu"
              type="linear"
              dataKey="revenue"
              stroke="#001E6C"
              activeDot={{ r: 8 }}
              unit=" triệu"
              dot={<CustomizedDot monthSelect={monthSelected?.name} />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
