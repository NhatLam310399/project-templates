/**
 * @description This will help you redirect by using history
 *  - Make sure that you take url from /constants/routes/index.ts
 *    It will make sure that URL will consistently
 *  @example
 *    const Component = () => {
 *      const redirect = useRedirect();
 *      //....
 *      redirect(PATH.HOME)
 *    }
 */

import { PATH_URLS } from "constants/routes";
import { useCallback } from "react";
import { useHistory } from "react-router";

export const useRedirect = () => {
  const history = useHistory();
  const redirect = useCallback(
    (url: string, params: { [key: string]: string } = {}) => {
      const href = url;

      if (!PATH_URLS.includes(href)) {
        console.error(new Error(`[Redirect] Not found route: "${href}"`));
        return;
      }

      // console.log({ url, params });

      if (params && Object.keys(params).length > 0) {
        for (const key in params) {
          const param = params[key] || "-";
          url = url.replace(`/:${key}`, `/${param}`);
        }
      }

      history.push(url);
    },
    [],
  );

  return redirect;
};
