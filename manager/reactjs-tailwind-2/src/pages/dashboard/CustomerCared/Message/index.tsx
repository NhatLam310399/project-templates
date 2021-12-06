/* eslint-disable react/destructuring-assignment */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "@material-ui/lab";

import { ICareStaff, IGetAllCareStaff } from "common/typings";
import { renderLocation } from "common/functions";

import EmptyData from "components/EmptyData";
import ConversationBox from "components/ConversationBox";

import { SkeletonAvatar } from "designs/Avatar";
import SVG from "designs/SVG";

import { getAllCareStaff } from "redux/actions/careStaff";
import { IRootState } from "redux/reducers";

const SIZE_PER_PAGE = 10;

const UserCaredList: React.FC = () => {
  const dispatch = useDispatch();
  const {
    allCareStaff: { results: careStaffList, totalCount },
  } = useSelector((state: IRootState) => state.careStaff);

  const [careStaffSelect, setCareStaffSelect] = useState<ICareStaff>();
  const [page, setPage] = useState<number>(1);

  const getAllCareStaffAPI = () => {
    const payload: IGetAllCareStaff = {
      filterCareStaff: {
        enabled: false,
      },
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllCareStaff(payload));
  };

  useEffect(() => {
    getAllCareStaffAPI();
  }, [page]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    nextPage: number,
  ) => {
    setPage(nextPage);
  };

  return careStaffList?.length > 0 ? (
    <div>
      <div className="grid gap-2 grid-cols-1 phone:grid-cols-2">
        {careStaffList.map(careStaff => {
          const { user } = careStaff;
          const avatarUser =
            user?.urlAvt?.small || user?.urlAvt?.default || SkeletonAvatar;
          const { province, district, ward, street } = user || {};
          return (
            <div
              key={careStaff?._id}
              className="px-2 py-1 flex flex-wrap phone:flex-nowrap items-center gap-2 rounded bg-tertiary"
            >
              <img
                src={avatarUser}
                alt={user?.displayName}
                className="flex-none w-6 h-6 rounded-full object-cover m-auto"
              />
              <div className="flex-auto space-y-1 text-black text-md">
                {/* <h6 className="text-lg font-bold text-primary leading-none">
                  Công ty uy tín
                </h6> */}
                <h5 className="text-lg font-semibold  leading-none">
                  {user?.displayName}
                </h5>
                <p>
                  {renderLocation([
                    street,
                    ward?.name,
                    district?.name,
                    province?.name,
                  ])}
                </p>
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    className="py-0.5 px-1 flex items-center gap-1 rounded leading-none bg-primary text-white"
                    onClick={() => {
                      setCareStaffSelect(careStaff);
                    }}
                  >
                    <SVG name="common/chat" className="flex-none w-2" />
                    <span className="text-md font-normal">Để lại lời nhắn</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination-wrap flex justify-end py-1 mt-3 ">
        <Pagination
          page={page}
          count={Math.ceil(totalCount / SIZE_PER_PAGE)}
          onChange={handleChangePage}
        />
      </div>
      {careStaffSelect ? (
        <div className="fixed right-0 bottom-0 h-40 w-30 phone:h-50 phone:w-37">
          <ConversationBox
            data={careStaffSelect}
            onClose={() => {
              setCareStaffSelect(undefined);
            }}
          />
        </div>
      ) : null}
    </div>
  ) : (
    <EmptyData />
  );
};
export default UserCaredList;
