import NavBar from "./components/NavBar";
import Banner from "./components/Banner";

const Header: React.FC = () => {
  return (
    <div className="w-full">
      <NavBar />
      <Banner />
    </div>
  );
};

export default Header;
