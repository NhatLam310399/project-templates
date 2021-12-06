import { IAppliedRecruitment, IRecruitment, IRootState } from "@common/typings";
import { SVG } from "@designs/SVG";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CardJobApplied from "./components/Card";
import { Container, EmptyJob, ListCard, Text } from "./style";

interface IPropsJobApplied {
  appliedRecruitment: IAppliedRecruitment[];
}
const JobApplied: React.FC<IPropsJobApplied> = ({ appliedRecruitment }) => {
  const { t } = useTranslation(["job-management"]);
  const {
    allRecruitment: { results = [], loading = true },
  } = useSelector((state: IRootState) => state.recruitment);
  const [appliedList, setAppliedList] = useState<IAppliedRecruitment[]>([]);

  useEffect(() => {
    if (!loading && results?.length > 0) {
      filterToAppliedList();
    }
  }, [results]);

  const filterToAppliedList = () => {
    if (appliedRecruitment?.length === 0) return;
    let newList: IAppliedRecruitment[] = [];
    const cloneList = [...results];
    cloneList?.map((recruitment) => {
      appliedRecruitment?.map((item) => {
        if (recruitment?._id === item?.recruitment?._id) {
          newList.push({ recruitment, date: item?.date });
        }
      });
    });
    setAppliedList(newList);
  };
  return (
    <Container>
      {appliedList?.length > 0 ? (
        <ListCard>
          {appliedList?.map((item, index) => (
            <CardJobApplied
              key={item?.recruitment?.name}
              recruitment={item?.recruitment}
              date={item?.date}
            />
          ))}
        </ListCard>
      ) : (
        <EmptyJob>
          <SVG
            name="job-management/resume-image"
            width={148}
            height={148}
          ></SVG>
          <Text>{t("notification-empty-jobapplied")}</Text>
        </EmptyJob>
      )}
    </Container>
  );
};

export default JobApplied;
