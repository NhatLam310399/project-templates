import { IGetAllUserHasPermissions } from "common/formatTypes";
import { useDispatch } from "react-redux";
import { getAllUserHasPermissions } from "redux/actions/listUsers";

export const getAllUserHasPermissionsAPI = (email: string | undefined) => {
    const payload: IGetAllUserHasPermissions = {
        filterUser: {
            email: email,
        },
        permissions: ["EMPLOYER"],
        page: 0,
        size: 99,
    };
    return getAllUserHasPermissions(payload);
};
