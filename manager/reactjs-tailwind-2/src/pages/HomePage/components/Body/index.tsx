import MarketInfo from "./components/MarketInfo";
import GeneralSituation from "./components/GeneralSituation";
import CustomerNeed from "./components/CustomerNeed";
import Benefit from "./components/Benefit";
import Orientation from "./components/Orientation";
import Contact from "./components/Contact";

const Body: React.FC = () => {
  return (
    <div>
      <MarketInfo />
      <GeneralSituation />
      <CustomerNeed />
      <Benefit />
      <Orientation />
      <Contact />
    </div>
  );
};

export default Body;
