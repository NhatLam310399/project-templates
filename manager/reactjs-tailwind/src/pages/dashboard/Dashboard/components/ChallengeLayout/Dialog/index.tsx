import Slide from "components/Slide";
import {
  DialogChallengeContainer,
  Title,
  YourPoint,
  Warning,
  YourBenefit,
  KingifyBenefit,
  SlideWrapper,
  ItemPoints,
  SlideContent,
} from "./styles";
import useAuth from "hooks/useAuth";
import { IChallengeType } from "typings";
import Dialog from "components/Dialog";
import SVG from "designs/SVG";

interface IDialogChallengeProps {
  openDialog: boolean;
  setOpenDialog: (state: boolean) => void;
}

interface IPoint {
  point: number;
  title: string;
}

const DialogChallenge: React.FC<IDialogChallengeProps> = ({
  openDialog,
  setOpenDialog,
}) => {
  const {
    accountInfo: { userInfo },
  } = useAuth();
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog size="lg" open={openDialog} onClose={onCloseDialog}>
      <div className="pb-2 text-neutral-1 content">
        <Dialog.Header title="" onClose={onCloseDialog} />
        <Dialog.Content>
          <DialogChallengeContainer>
            <Title>Kingify benefits</Title>
            <YourPoint.Wrapper>
              <YourPoint.Point>
                Your points:
                <YourPoint.Score>
                  {userInfo?.challengePoint || 0}
                </YourPoint.Score>
              </YourPoint.Point>
              <YourPoint.Desc>Last activity: NaN days ago</YourPoint.Desc>
            </YourPoint.Wrapper>

            <Warning>
              <SVG name="dashboard/warning" />
              All points expire after 90 days of no activity (earnings or
              expenses).
            </Warning>
            <YourBenefit.Wrapper>
              <YourBenefit.Title>Your claimed benefits</YourBenefit.Title>
              <YourBenefit.Box>
                <YourBenefit.BoxTitle>
                  You don’t have active benefits yet
                </YourBenefit.BoxTitle>
                <YourBenefit.BoxDesc>
                  You can redeem points for benefits by selecting them from the
                  list below
                </YourBenefit.BoxDesc>
              </YourBenefit.Box>
            </YourBenefit.Wrapper>
            <KingifyBenefit.Wrapper>
              <KingifyBenefit.Title>
                Redeem your points for Kingify benefits
              </KingifyBenefit.Title>
              <KingifyBenefit.Desc>
                Points can be redeemed for perks offered at any given time
              </KingifyBenefit.Desc>
            </KingifyBenefit.Wrapper>
            <SlideWrapper>
              <Slide numberStep={Math.ceil(listPoint.length / 3)} gap={260 * 3}>
                {listPoint.map((value, index) => {
                  return (
                    <ItemPoint
                      key={index}
                      point={value.point}
                      title={value.title}
                    />
                  );
                })}
              </Slide>
            </SlideWrapper>
          </DialogChallengeContainer>
        </Dialog.Content>
      </div>
    </Dialog>
  );
};

const listPoint: IPoint[] = [
  {
    point: 1000,
    title: "Connect with your store",
  },
  {
    point: 1000,
    title: "Add your first product",
  },
  {
    point: 1000,
    title: "Have your first sale",
  },
  {
    point: 1000,
    title: "Complete the first ten sales",
  },
  {
    point: 1000,
    title: "Product",
  },
  {
    point: 1000,
    title: "Connect with your store one",
  },
  {
    point: 1000,
    title: "Connect with your store two",
  },
];

export default DialogChallenge;

const ItemPoint: React.FC<{ point: number; title: string }> = ({
  point,
  title,
}) => {
  return (
    <ItemPoints.Wrapper>
      <ItemPoints.Heading>
        <ItemPoints.Point>
          <SVG name="dashboard/disablediamond" height={10} width={10} />
          {point}
        </ItemPoints.Point>
        <SVG name="dashboard/detail" />
      </ItemPoints.Heading>
      <ItemPoints.Content>{title}</ItemPoints.Content>
    </ItemPoints.Wrapper>
  );
};
