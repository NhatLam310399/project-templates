import {
  EmptyStatisticsContainer,
  ImageWrapper,
  Button,
  Text,
  Title,
} from "./styles";
import SVG from "designs/SVG";
import { PATH } from "common/constants/routes";

interface IEmptyStatisticsProps {}

const EmptyStatistics: React.FC<IEmptyStatisticsProps> = props => {
  return (
    <EmptyStatisticsContainer>
      <ImageWrapper>
        <SVG name="statistics/empty-orders" width="160px" height="160px" />
      </ImageWrapper>
      <Title>Ready...Set...Almost there!</Title>
      <Text>
        We just need a bit more data to dig into – please continue placing
        orders and check back later.
      </Text>
      <Button size="lg" to={PATH.ORDER.LIST} variant="primary">
        To Orders
      </Button>
    </EmptyStatisticsContainer>
  );
};

export default EmptyStatistics;
