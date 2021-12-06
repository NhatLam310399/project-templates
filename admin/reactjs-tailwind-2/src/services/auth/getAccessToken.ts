import { IGetToken } from "common/formatTypes";
import { axiosJSON } from "common/utils/api";
// import { setLoading } from "redux/actions/commonActions";

export const getAccessToken = async (data: IGetToken) => {
    try {
        const url = `${process.env.REACT_APP_GRAPHQL_URL}/auth/firebase/phone`;
        const response = await axiosJSON({
            url,
            data: JSON.stringify(data),
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        // store.dispatch(setLoading(false));

        return response;
    } catch (error) {
        console.error(error);
        return {};
    }
};
