import { useState } from "react";
import { ChallengeContainer, Heading, Content } from "./styles";
import useAuth from "hooks/useAuth";
import Dialog from "./Dialog";
interface IChallengeProps {}

const Challenge: React.FC<IChallengeProps> = ({ children }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const {
    accountInfo: { userInfo },
  } = useAuth();
  return (
    <>
      <ChallengeContainer>
        <Heading.Container>
          <Heading.YourPoint>
            Your Point :{" "}
            <Heading.Point>{userInfo?.challengePoint || 0}</Heading.Point>
          </Heading.YourPoint>
          <Heading.More onClick={() => setOpenDialog(true)}>
            See more benefit
          </Heading.More>
        </Heading.Container>
        <Content>{children}</Content>
      </ChallengeContainer>
      <Dialog
        openDialog={openDialog}
        setOpenDialog={state => setOpenDialog(state)}
      />
    </>
  );
};

export default Challenge;
