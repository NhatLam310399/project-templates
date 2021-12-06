import Slider, { Settings } from "react-slick";
import { Wrapper } from "./styles";

const settings: Settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  appendDots: (dots) => <ul>{dots}</ul>,
  customPaging: (i) => <div className="ft-slick__dots--custom"></div>,
};

interface ISlickSliderProps {
  className?: string;
}

const SlickSlider: React.FC<ISlickSliderProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <Wrapper>
      <Slider className={className} {...(rest as any)} {...settings}>
        {children}
      </Slider>
    </Wrapper>
  );
};

export default SlickSlider;
