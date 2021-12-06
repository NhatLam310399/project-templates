import { Location } from "history";

export const getQueryFromLocation = (location: Location<any>): any => {
  const searchParams = new URLSearchParams(location?.search);
  const query: Record<string, any> = Array.from(searchParams.entries()).reduce(
    (object, [key, value]) => {
      return { ...object, [key]: value };
    },
    {},
  );
  return query;
};
