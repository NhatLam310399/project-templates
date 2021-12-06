import { TransformSliderContainer, NumberInput } from "./styles";
import Slider from "designs/Slider";

interface ITransformSliderProps {
  value: number;
  className?: string;
  min: number;
  max: number;
  step: number;
  onChange: (newValue: number) => void;
}

const TransformSlider: React.FC<ITransformSliderProps> = ({
  value,
  className = "",
  onChange,
  ...rest
}) => {
  return (
    <TransformSliderContainer>
      <Slider
        className="w-2/3"
        value={value}
        onChange={newValue => onChange(newValue)}
        {...rest}
      />
      <NumberInput
        className="hide-arrow-input-number"
        value={value.toFixed(2)}
        type="number"
        min={rest.min}
        max={rest.max}
        onChange={e => {
          const newValue = Number(e.target.value);
          if (rest.min <= newValue && newValue <= rest.max) onChange(newValue);
        }}
      />
    </TransformSliderContainer>
  );
};

export default TransformSlider;
