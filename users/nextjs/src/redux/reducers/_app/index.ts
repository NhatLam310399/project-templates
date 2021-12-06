import produce from "immer";
import * as types from "@redux/types/_app";
import { AnyAction } from "redux";
import { IPermission, IUser } from "@common/typings";

interface IAppReducer {
  permission: IPermission;
}

const initialState: IAppReducer = {
  permission: "CANDIDATE",
};

const _appReducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_PERMISSION:
        draft.permission = action.payload;
        break;
    }
  });

export default _appReducer;
