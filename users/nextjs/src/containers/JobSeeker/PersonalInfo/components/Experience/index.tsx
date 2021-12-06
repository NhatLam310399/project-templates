import { useTranslation } from "next-i18next";
import moment from "moment";

import { SVG } from "@designs/SVG";
import { IWorkExperience } from "@common/typings";

import Add from "../Add";
import Item from "../Item";
import AddExperienceDialog from "./components/AddExperienceDialog";
import EditExperienceDialog from "./components/EditExperienceDialog";
import { Container, ItemWrapper, Title, IconWrapper } from "./styles";

interface IExperienceProps {
  experienceList: IWorkExperience[];
  recordId: string;
  userId: string;
}

const Experience: React.FC<IExperienceProps> = (props) => {
  const { experienceList, recordId, userId } = props;
  const { t } = useTranslation(["job-management"]);

  return (
    <Container>
      <Title>{t("personal-info.experience.experience")}</Title>
      {experienceList?.map((experience: IWorkExperience, index: number) => (
        <ItemWrapper key={index}>
          <Item
            title={experience.jobName}
            content={experience.companyName}
            duration={
              !!experience.timeStart &&
              `${moment(experience.timeStart).format("MM/YYYY")} - ${moment(
                experience.timeEnd,
              ).format("MM/YYYY")} - ${experience.experience} years`
            }
            description={experience.description}
          />

          <EditExperienceDialog
            ButtonMenu={
              <IconWrapper>
                <SVG name="job-management/edit" />
              </IconWrapper>
            }
            userId={userId}
            recordId={recordId}
            experienceList={experienceList}
            companyName={experience.companyName}
            description={experience.description}
            timeStart={experience.timeStart}
            timeEnd={experience.timeEnd}
            title={experience.jobName}
            index={index}
          />
        </ItemWrapper>
      ))}

      <AddExperienceDialog
        ButtonMenu={<Add>{t("personal-info.experience.add-experience")}</Add>}
        userId={userId}
        recordId={recordId}
        experienceList={experienceList}
      />
    </Container>
  );
};

export default Experience;
