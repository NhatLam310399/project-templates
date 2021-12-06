import { Location } from "history";
import queryString from "query-string";

export const getQueryFromLocation = (location: Location) => {
    const query = queryString.parse(location?.search);
    return query;
};
