import Logo from "assets/svg/logo/Ktv-logo.svg";
import Button from "designs/Button";
import { PATH } from "constants/routes";

const NavBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-2 laptop:px-5 desktop:px-10 py-2">
      <img src={Logo} alt="Ktv logo" className="w-10 h-6" />
      <div>
        <Button
          gradient
          className="w-20 phone:w-40"
          innerClassName="h-4 text-xs phone:text-lg font-bold"
          to={PATH.ACCOUNT.LOGIN}
        >
          Đăng nhập chủ quán
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
