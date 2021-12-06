import Slider, { Settings } from "react-slick";
import { Wrapper } from "./styles";

const settings: Settings = {
  dots: true,
  infinite: true,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  slidesPerRow: 2,
  rows: 2,
  appendDots: (dots) => <ul>{dots}</ul>,
  customPaging: (i) => <div className="ft-slick__dots--custom"></div>,
  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesPerRow: 1,
        rows: 2,
      },
    },
  ],
};

interface ISlickSliderProps {
  className?: string;
  custom?: Settings;
}

const SlickSlider: React.FC<ISlickSliderProps> = (props) => {
  const { children, className, custom = settings, ...rest } = props;

  return (
    <Wrapper>
      <Slider className={className} {...(rest as any)} {...custom}>
        {children}
      </Slider>
    </Wrapper>
  );
};

export default SlickSlider;
