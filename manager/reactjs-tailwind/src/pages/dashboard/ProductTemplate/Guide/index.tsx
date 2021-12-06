import {
  GuideContainer,
  Title,
  StepsContainer,
  ListSteps,
  Step,
} from "./styles";

interface IGuideProps {}

const steps: {
  name: string;
  message: string;
  image: string;
}[] = [
  {
    name: "Create or edit a template",
    message: "Make your own or try our sample",
    image: "product-template/step/step-1.png",
  },
  {
    name: "Pick a product & add design",
    message: "Take your pick from our catalog",
    image: "product-template/step/step-2.png",
  },
  {
    name: "Add products to store or order them",
    message: "Start selling online or showcase your work",
    image: "product-template/step/step-3.png",
  },
];

const Guide: React.FC<IGuideProps> = props => {
  return (
    <GuideContainer>
      <Title>How does it work?</Title>
      <StepsContainer>
        <ListSteps>
          {steps.map(({ name, message, image }, index) => (
            <Step.Container key={name}>
              <Step.Index>{index + 1}</Step.Index>
              <Step.Image name={image} />
              <Step.Name>{name}</Step.Name>
              <Step.Message>{message}</Step.Message>
            </Step.Container>
          ))}
        </ListSteps>
      </StepsContainer>
    </GuideContainer>
  );
};

export default Guide;
