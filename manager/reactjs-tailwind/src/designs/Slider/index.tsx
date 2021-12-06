import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { SliderContainer, RangeSlider } from "./styles";

interface ISliderProps {
  className?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (newValue: number) => void;
}

const Slider: React.FC<ISliderProps> = ({
  onChange,
  className = "",
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onChange && onChange(value);
  };

  return (
    <SliderContainer className={className}>
      <RangeSlider type="range" {...rest} onChange={handleChange} />
    </SliderContainer>
  );
};

export default Slider;
