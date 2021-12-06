import { CounterContainer, NumberInput, Button } from "./styles";
import SVG from "designs/SVG";

interface ICounterProps {
  className?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange?: (value: number) => void;
}

const Counter: React.FC<ICounterProps> = props => {
  const {
    className = "",
    value = 0,
    min = 0,
    max = Infinity,
    step = 1,
    onChange,
  } = props;

  const handleChange = (newValue: number) => {
    if (min < newValue && newValue < max) {
      onChange?.(newValue);
    }
  };

  return (
    <CounterContainer className={className}>
      <Button onClick={() => handleChange(value - step)}>
        <SVG name="counter/dec" />
      </Button>
      <NumberInput
        type="number"
        className="hide-arrow-input-number"
        value={value.toFixed(2)}
        min={min}
        max={max}
        step={step}
        onChange={e => handleChange(Number(e.target.value))}
      />
      <Button onClick={() => handleChange(value + step)}>
        <SVG name="counter/inc" />
      </Button>
    </CounterContainer>
  );
};

export default Counter;
