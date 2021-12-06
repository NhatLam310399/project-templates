import { useTranslation } from "next-i18next";
import moment from "moment";

import { SVG } from "@designs/SVG";
import { IEducation } from "@common/typings";
import Add from "../Add";
import Item from "../Item";
import AddEducationDialog from "./components/AddEducationDialog";
import EditEducationDialog from "./components/EditEducationDialog";
import { Container, ItemWrapper, Title, IconWrapper } from "./styles";

interface IEducationProps {
  educationList: IEducation[];
  recordId: string;
  userId: string;
}

const Education: React.FC<IEducationProps> = (props) => {
  const { educationList, recordId, userId } = props;
  const { t } = useTranslation(["job-management"]);
  return (
    <Container>
      <Title>{t("personal-info.education.title")}</Title>
      {educationList?.map((education: IEducation, index: number) => (
        <ItemWrapper key={index}>
          <Item
            title={`${education?.degree} - ${education?.major}`}
            content={education?.schoolName}
            duration={
              !!education.timeStart &&
              `${moment(education.timeStart).format("MM/YYYY")} - ${moment(
                education.timeEnd,
              ).format("MM/YYYY")}`
            }
            description={education.description}
          />
          <EditEducationDialog
            ButtonMenu={
              <IconWrapper>
                <SVG name="job-management/edit" />
              </IconWrapper>
            }
            educationList={educationList}
            recordId={recordId}
            userId={userId}
            schoolName={education.schoolName}
            degree={education.degree}
            major={education.major}
            timeStart={education.timeStart}
            timeEnd={education.timeEnd}
            description={education.description}
            index={index}
          />
        </ItemWrapper>
      ))}
      <AddEducationDialog
        ButtonMenu={<Add>{t("personal-info.education.add-education")}</Add>}
        educationList={educationList}
        recordId={recordId}
        userId={userId}
      />
    </Container>
  );
};

export default Education;
