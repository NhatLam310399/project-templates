import { ROOT_URL } from "@constants/app";
import { paths } from "@routes";
import { addQuery, mergeParams } from "@common/functions";
import { ILanguage } from "@common/typings";

export const renderURL = <P = object, Q = object>(args: {
  language: ILanguage | string;
  routeName: string;
  params: P;
  query?: Q;
}) => {
  const route = paths.find((item) => item.name === args.routeName);
  if (!route) {
    console.error(`[renderURL] Not found any route has name ${args.routeName}`);
  }
  let url = `${ROOT_URL}/${args.language}${route?.locale?.vi}`;
  url = mergeParams(url, args.params);
  url = addQuery(url, args.query);
  return url;
};
