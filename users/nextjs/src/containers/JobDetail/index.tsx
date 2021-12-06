import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { IRootState } from "@common/typings";

import DetailContent from "./components/Detail";
import ErrorBoundary from "@components/ErrorBoundary";
import Overview from "./components/Overview";
import { JobDetailContainer } from "./styles";
import RelatedJob from "@components/RelatedJob";

interface JobDetailProps {}

const JobDetail: React.FC<JobDetailProps> = () => {
  const { t } = useTranslation(["job"]);
  const { recruitmentDetail } = useSelector(
    (state: IRootState) => state.recruitment,
  );
  return (
    <JobDetailContainer className="container">
      <ErrorBoundary>
        <Overview recruitment={recruitmentDetail} />
      </ErrorBoundary>
      <ErrorBoundary>
        <DetailContent recruitment={recruitmentDetail} />
      </ErrorBoundary>
      <ErrorBoundary>
        <RelatedJob recruitment={recruitmentDetail} title={t("related-job")} />
      </ErrorBoundary>
    </JobDetailContainer>
  );
};

export default JobDetail;
