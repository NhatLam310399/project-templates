import {
  getAllContentWebsite,
  getSeoWebsite,
} from "@redux/actions/contentWebsite";
import { getAllStaticPages } from "@redux/actions/staticPages";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export const getAllBasicAPIForPage = (
  language: string,
  dispatch: Dispatch<AnyAction>,
) => {
  dispatch(getSeoWebsite({ language }));
  dispatch(
    getAllContentWebsite({
      page: 0,
      size: 99,
    }),
  );
  dispatch(
    getAllStaticPages({
      filterPages: {},
      page: 0,
      size: 99,
    }),
  );
};
