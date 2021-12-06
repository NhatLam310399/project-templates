import { FilledDashboardContainer } from "./styles";

import Order from "./Order";
import Body from "./Body";

interface IFilledDashboardProps {}

const FilledDashboard: React.FC<IFilledDashboardProps> = props => {
  return (
    <FilledDashboardContainer>
      <Order />
      <Body />
    </FilledDashboardContainer>
  );
};

export default FilledDashboard;
