import { SVG } from "@designs/SVG";

import EditGeneralInfoDialog from "./components/EditGeneralInfoDialog";
import { Container, Description, Text, Title, TitleWrapper } from "./styles";

export interface IGeneralInfoProps {
  displayName: string;
  code: string;
  position: string;
  description: string;
  userId: string;
}

const GeneralInfo: React.FC<IGeneralInfoProps> = (props) => {
  const { displayName, code, position, description, userId } = props;

  const handleName = () => {
    if (!!displayName) {
      return displayName;
    }
    return !!code && `User ${code}`;
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>{handleName()}</Title>
        <EditGeneralInfoDialog
          {...props}
          ButtonMenu={<SVG name="job-management/edit" />}
        />
      </TitleWrapper>

      <Text>{code}</Text>
      <Text>{position}</Text>

      <Description>{description}</Description>
    </Container>
  );
};

export default GeneralInfo;
