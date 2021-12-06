import Slider, { Settings } from "react-slick";
import { Wrapper } from "./styles";

const settings: Settings = {
  infinite: true,
  slidesToShow: 3,
  autoplay: true,
  dots: true,
  rows: 1,
  lazyLoad: "ondemand",
  speed: 500,
  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
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
