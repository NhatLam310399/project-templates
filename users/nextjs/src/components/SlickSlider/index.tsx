import Slider, { Settings } from "react-slick";
import { Wrapper } from "./styles";

const settings: Settings = {
  infinite: true,
  slidesToShow: 3,
  autoplay: true,
  lazyLoad: "ondemand",
  speed: 500,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 2,
        className: "center",
        centerMode: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        className: "center",
        centerMode: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
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
