import { Location } from "history";
import queryString from "query-string";

export const getQueryFromLocation = (location: Location<any>): any => {
  const query = queryString.parse(location?.search);
  return query;
};
