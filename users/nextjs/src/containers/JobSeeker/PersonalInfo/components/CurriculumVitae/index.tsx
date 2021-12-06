import { useDropzone } from "react-dropzone";
import { useTranslation } from "next-i18next";

import { SVG } from "@designs/SVG";
import AddCVDialog from "./components/AddCVDialog";
import {
  CVDescription,
  Container,
  Title,
  Content,
  ContentWrapper,
  Description,
  Text,
} from "./styles";

interface ICurriculumVitaeProps {
  fileNameCV: string;
  urlCV: string;
  recordId: string;
  userId: string;
}

const CurriculumVitae: React.FC<ICurriculumVitaeProps> = (props) => {
  const { t } = useTranslation(["job-management"]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: ".pdf, .doc, .docx",
    maxSize: 3097152,
  });
  const { fileNameCV, urlCV, recordId, userId } = props;

  return (
    <Container>
      <Title>{t("personal-info.cv.attached-profile")}</Title>
      <ContentWrapper>
        <Content>
          <Description>
            <Text>
              {t("personal-info.cv.your-profile")} :{" "}
              <CVDescription>{fileNameCV}</CVDescription>
            </Text>
          </Description>

          <AddCVDialog
            ButtonMenu={<SVG name="job-management/edit" />}
            acceptedFiles={acceptedFiles}
            getInputProps={getInputProps}
            getRootProps={getRootProps}
            recordId={recordId}
            userId={userId}
          />
        </Content>
      </ContentWrapper>
    </Container>
  );
};

export default CurriculumVitae;
