import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { IRootState } from "@redux/reducers";
import {
  getAllRequestReview,
  getEvaluateByUser,
} from "@redux/actions/requestReview";

import RequestEvaluated from "./components/RequestEvaluated";
import RelatedJob from "@components/RelatedJob";
import { Container } from "./style";
import { IGetBestRecruitment, IGetByUserId } from "@common/typings";
import { getBestRecruitment } from "@redux/actions/recruitment";
import { getUserCookies } from "@common/utils/auth";

const Evaluated: React.FC<{}> = () => {
  const { t } = useTranslation(["job-management"]);
  const dispatch = useDispatch();

  const {
    bestRecruitment: { results: bestRecruitment },
  } = useSelector((state: IRootState) => state.recruitment);
  const { listEvaluate } = useSelector(
    (state: IRootState) => state.requestReview,
  );

  useEffect(() => {
    getBestRecruitmentAPI();
    getEvaluateAPI();
  }, []);

  const getEvaluateAPI = () => {
    const payload: IGetByUserId = {
      userId: getUserCookies()?.userInfo?._id,
    };
    dispatch(getEvaluateByUser(payload));
  };

  const getBestRecruitmentAPI = () => {
    const payload: IGetBestRecruitment = {
      size: 6,
    };
    dispatch(getBestRecruitment(payload));
  };

  return (
    <Container>
      <RequestEvaluated listEvaluate={listEvaluate} />
      <RelatedJob bestRecruitment={bestRecruitment} title={t("favorite-job")} />
    </Container>
  );
};
export default Evaluated;
