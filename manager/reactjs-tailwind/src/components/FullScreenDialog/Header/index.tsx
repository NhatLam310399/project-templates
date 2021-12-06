import { HeaderContainer, Title, Progress } from "./styles";
import IconButton from "designs/IconButton";
import SVG from "designs/SVG";

type IProgress = {
  name: string;
};

type IHeaderProps = {
  title: string;
  onClose: () => void;
  className?: string;
} & (
  | {
      progresses: IProgress[]; // count from 1
      currentStep: string; // count from 1
      onChangeProgress: (step: number) => void;
    }
  | {
      readonly progresses?: undefined;
      readonly currentStep?: undefined;
      readonly onChangeProgress?: undefined;
    }
);

const FSDHeader: React.FC<IHeaderProps> = props => {
  const {
    title,
    className = "",
    progresses,
    currentStep,
    onClose,
    onChangeProgress,
  } = props;

  return (
    <HeaderContainer className={className}>
      <Title>{title}</Title>
      {progresses && (
        <Progress.Container>
          {progresses.map(({ name }, index) => (
            <Progress.Item key={name}>
              <Progress.StepIndex>{index + 1}</Progress.StepIndex>
              {name}
            </Progress.Item>
          ))}
        </Progress.Container>
      )}
      <IconButton tooltip="Close" onClick={() => onClose()}>
        <SVG name="dialog/close" />
      </IconButton>
    </HeaderContainer>
  );
};

export default FSDHeader;
