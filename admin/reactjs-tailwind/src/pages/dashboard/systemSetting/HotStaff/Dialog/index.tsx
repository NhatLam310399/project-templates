import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  IGetAllUser,
  IRootState,
  ISetIsHighlightForUser,
  IUser,
} from "common/typings";

import Dialog, { DialogTitle } from "components/Dialog";
import Select from "designs/Select";

import { setIsHighlightForUser } from "redux/actions/users";
import * as services from "services/users";

interface IHotStaff {
  ButtonMenu: React.ReactElement;
}

const HotStaff: React.FC<IHotStaff> = props => {
  const { ButtonMenu } = props;
  const dispatch = useDispatch();
  const [users, setUsers] = useState<any[]>([]); // use any to add field name for apply options of select
  const [user, setUser] = useState<IUser | null>(null);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  useEffect(() => {
    getAllUserAPI();
  }, []);

  useEffect(() => {
    if (actionSuccess) {
      getAllUserAPI();
    }
  }, [actionSuccess]);

  const getAllUserAPI = async () => {
    const result: IUser[] = await getAllUserService();

    if (result) {
      const newListUser = result.map(person => {
        return { name: person?.displayName || person?.phoneNumber, ...person };
      });
      setUsers(newListUser);
    }
  };

  const getAllUserService = async () => {
    const payload: IGetAllUser = {
      filterUser: {
        highlight: false,
      },
    };

    const response = await services.getAllUser(payload);
    const { getAllUsers: result } = response?.data || {};
    return result?.results;
  };

  const handleSubmit = () => {
    const payload: ISetIsHighlightForUser = {
      id: user?._id || "",
      isHighlight: true,
    };
    dispatch(setIsHighlightForUser(payload));
  };
  const handleChooseStaff = (option: any) => {
    setUser(option);
  };
  const handleClose = () => {
    setUser(null);
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleSubmit}
      onClose={handleClose}
      size="sm"
    >
      <DialogTitle className="col-span-1 mb-4 laptop:col-span-2">
        <span className="font-bold text-black normal-case text-xl laptop:text-mxl">
          Thêm nhân viên nổi bật
        </span>
      </DialogTitle>
      <Select
        floatTitle={false}
        className="mt-2"
        onSelectOption={handleChooseStaff}
        options={users}
        value={user?.displayName || user?.phoneNumber}
        required
        errorMessage="Vui lòng chọn nhân viên nổi bật"
        label="Nhân viên nổi bật"
        placeholder="Chọn nhân viên nổi bật"
      />
    </Dialog>
  );
};

export default HotStaff;
