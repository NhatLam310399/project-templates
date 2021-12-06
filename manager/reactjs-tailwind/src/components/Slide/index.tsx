import { useState } from "react";
import { SlideContainer, Footer, Dot } from "./styles";
import SVG from "designs/SVG";

interface ISlideProps {
  children: any;
  numberStep: number;
  gap: number;
}

const Slide: React.FC<ISlideProps> = ({ children, numberStep, gap }) => {
  const [active, setActive] = useState<number>(0);

  const onHanleClick = (i: number) => {
    setActive(i);
  };
  const renderDot = (numberStep: number, active: number) => {
    const listRender: JSX.Element[] = [];
    for (let i = 0; i < numberStep; i++) {
      const ele: JSX.Element = (
        <Dot
          active={i === active ? true : false}
          onClick={e => onHanleClick(i)}
        />
      );
      listRender.push(ele);
    }
    return listRender;
  };

  const onLickPrev = () => {
    if (active === 0) {
      setActive(numberStep - 1);
    } else {
      setActive(active - 1);
    }
  };
  const onLickNext = () => {
    if (active === numberStep - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  };
  return (
    <>
      <SlideContainer
        style={{
          transform: `translateX(${active * -gap}px)`,
        }}
      >
        {children}
      </SlideContainer>
      <Footer.Wrapper>
        <SVG
          name="dashboard/arrowleft"
          className="cursor-pointer"
          onClick={onLickPrev}
        />
        <Footer.Content>{renderDot(numberStep, active)}</Footer.Content>
        <SVG
          name="dashboard/arrowright"
          className="cursor-pointer"
          onClick={onLickNext}
        />
      </Footer.Wrapper>
    </>
  );
};

export default Slide;
