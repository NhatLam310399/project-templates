import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllBenefit } from "@redux/actions/benefit";
import { getAllJobLevel } from "@redux/actions/job";
import { SVG } from "@designs/SVG";
import {
  ICategoryLevel2,
  IRootState,
  IBenefit,
  IProvince,
} from "@common/typings";

import Benefit from "./components/Benefit";
import EditDesiredJobDialog from "./components/EditDesiredJobDialog";
import {
  Benefits,
  BenefitWrapper,
  Container,
  Item,
  ItemWrapper,
  Label,
  Text,
  Span,
  Title,
  TitleWrapper,
} from "./styles";

interface IDesiredJobProps {
  workLocation: IProvince;
  careers: ICategoryLevel2[] | [];
  benefitsWanted: IBenefit[];
  level: string;
  salary: string;
  recordId: string;
  userId: string;
}

const DesiredJob: React.FC<IDesiredJobProps> = (props) => {
  const {
    workLocation,
    careers,
    level,
    salary,
    benefitsWanted,
    recordId,
    userId,
  } = props;
  const { t } = useTranslation(["job-management", "common"]);
  const { benefitList } = useSelector((state: IRootState) => state.benefit);
  const { allJobLevel } = useSelector((state: IRootState) => state.job);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobLevel());
    dispatch(getAllBenefit({}));
  }, []);
  return (
    <Container>
      <TitleWrapper>
        <Title>{t("personal-info.desired-job.title")}</Title>
        <EditDesiredJobDialog
          ButtonMenu={<SVG name="job-management/edit" />}
          benefitList={benefitList?.results}
          benefitsWanted={benefitsWanted}
          recordId={recordId}
          userId={userId}
          salary={salary}
          careers={careers}
          level={level}
          allJobLevel={allJobLevel}
          workLocation={workLocation}
        />
      </TitleWrapper>

      <ItemWrapper>
        {workLocation?.name && (
          <Item>
            <Label>{t("personal-info.desired-job.work-location")} : </Label>
            <Text>{workLocation?.name}</Text>
          </Item>
        )}
        {careers?.length > 0 && (
          <Item>
            <Label>{t("personal-info.desired-job.career")} :</Label>
            <Text>
              {careers?.map((career: ICategoryLevel2, index: number) => (
                <Span key={index}>
                  {/* To show like this */}
                  {/* Mỹ thuật/Thiết kế, Kế toán, Lập trình viên */}
                  {careers.length === index + 1
                    ? career?.name
                    : career?.name + ", "}
                </Span>
              ))}
            </Text>
          </Item>
        )}
        {level && (
          <Item>
            <Label>{t("personal-info.desired-job.desired-level")} :</Label>
            <Text>{level}</Text>
          </Item>
        )}
        {salary && (
          <Item>
            <Label>{t("personal-info.desired-job.salary")} : </Label>
            <Text>{`${salary} ${t("common:VND-sign.MILLIONS")}`}</Text>
          </Item>
        )}
      </ItemWrapper>
      {benefitsWanted?.length > 0 && (
        <Benefits>
          <Label>
            {t("personal-info.desired-job.top-5-desired-benefits")} :
          </Label>
          <BenefitWrapper>
            {benefitsWanted?.map((benefit: IBenefit, index: number) => (
              <Benefit key={index} name={benefit?.name} icon={benefit?.icon} />
            ))}
          </BenefitWrapper>
        </Benefits>
      )}
    </Container>
  );
};

export default DesiredJob;
