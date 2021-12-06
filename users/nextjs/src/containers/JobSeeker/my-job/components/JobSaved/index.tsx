import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { IAppliedRecruitment, IRecruitment, IRootState } from "@common/typings";
import { SVG } from "@designs/SVG";
import CardJobApplied from "./components/Card";
import { Container, EmptyJob, ListCard, Text } from "./style";

interface IJobApplied {
  savedRecruitment: IRecruitment[];
}
const JobSaved: React.FC<IJobApplied> = ({ savedRecruitment }) => {
  const { t } = useTranslation(["job-management"]);
  const {
    allRecruitment: { results = [], loading = true },
  } = useSelector((state: IRootState) => state.recruitment);
  const [savedList, setSaveList] = useState<IRecruitment[]>([]);
  const { user } = useSelector((state: IRootState) => state.user);

  useEffect(() => {
    if (!loading && results?.length > 0) {
      filterToSavedList();
    }
  }, [results, user]);

  const filterToSavedList = () => {
    if (savedRecruitment?.length === 0) return;
    let newList: IRecruitment[] = [];
    const cloneList = [...results];
    cloneList?.map((recruitment) => {
      savedRecruitment?.map((item) => {
        if (recruitment?._id === item?._id) {
          newList.push(recruitment);
        }
      });
    });
    setSaveList(newList);
  };

  return (
    !loading && (
      <Container>
        {savedList?.length > 0 ? (
          <ListCard>
            {savedList?.map((item, key) => (
              <CardJobApplied key={key} recruitment={item} />
            ))}
          </ListCard>
        ) : (
          <EmptyJob>
            <SVG
              name="job-management/save-image"
              width={148}
              height={148}
            ></SVG>
            <Text>{t("notification-empty-jobsaved")}</Text>
          </EmptyJob>
        )}
      </Container>
    )
  );
};
export default JobSaved;
