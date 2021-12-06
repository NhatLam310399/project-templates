import { useEffect } from "react";
import { isEmpty } from "lodash";

import { useRedirect } from "@common/hooks/useRedirect";
import useAuth from "@common/hooks/useAuth";

import {
  checkProfileUserService,
  checkRecordUserService,
  addLocalStorage,
} from "@containers/JobSeeker/PersonalInfo/helper";
import { PATH } from "@routes";

export const withRecord = (Component: React.FC<any>) => () => {
  const { accountInfo } = useAuth();
  const redirect = useRedirect();

  useEffect(() => {
    if (!isEmpty(accountInfo)) {
      const fullRecordAndProfile = localStorage.getItem("RECORD_PROFILE_EXIST");
      if (!fullRecordAndProfile) {
        checkFullProfileAndRecord();
      } else {
        if (fullRecordAndProfile === "0") {
          redirect(PATH.JOB_MANAGEMENT_PERSONAL_INFO);
        }
      }
    }
  }, []);

  const checkFullProfileAndRecord = async () => {
    const recordResult = await checkRecordUserService();
    const profileResult = await checkProfileUserService();

    if (recordResult && profileResult) {
      addLocalStorage(1);
    } else {
      redirect(PATH.JOB_MANAGEMENT_PERSONAL_INFO);
    }
  };
  return <Component />;
};
