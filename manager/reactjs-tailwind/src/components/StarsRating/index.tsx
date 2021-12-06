import StarIcon from "icons/Star";
import { StarsRatingContainer } from "./styles";

interface IStarsRatingProps {
  count: number; // Float is fine;
  className?: string;
}

const StarsRating: React.FC<IStarsRatingProps> = ({ count = 0, className }) => {
  const roundedCount = Math.round(count);
  return (
    <StarsRatingContainer className={className}>
      {[1, 2, 3, 4, 5].map(i => (
        <div
          className={i <= roundedCount ? "text-primary-1" : "text-neutral-3"}
        >
          <StarIcon />
        </div>
      ))}
    </StarsRatingContainer>
  );
};

export default StarsRating;
