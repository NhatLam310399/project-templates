import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/otherSetting";
import { INotifySetting, IPointSetting } from "common/formatTypes";

interface IOtherSettingReducer {
    pointSetting: IPointSetting;
    allNotifySetting: {
        results: INotifySetting[];
        totalCount: number;
        loading: boolean;
    };
}

const initialState: IOtherSettingReducer = {
    pointSetting: {},
    allNotifySetting: {
        results: [],
        totalCount: 0,
        loading: true,
    },
};

const otherSettingReducer = (state = initialState, actions: AnyAction) =>
    producer(state, draft => {
        switch (actions.type) {
            case types.GET_POINT_SETTING_SUCCESS:
                draft.pointSetting = actions.payload;
                break;
            case types.GET_ALL_NOTIFY_SETTING_SUCCESS:
                draft.allNotifySetting = { ...actions.payload, loading: false };
                break;
            default:
                break;
        }
    });

export default otherSettingReducer;
