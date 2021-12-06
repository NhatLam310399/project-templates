import { Link } from "react-router-dom";
import { PATH } from "constants/routes";
import { ReactComponent as BackgroundImage } from "assets/svg/login/background.svg";

interface ILoginLayout {}

const LoginLayout: React.FC<ILoginLayout> = props => {
  const { children } = props;
  return (
    <div className="relative flex items-center w-screen h-screen overflow-y-scroll login-layout desktop:flex">
      <div className="relative hidden w-full h-full background-wrapper bg-primary phone:flex">
        <Link to={PATH.HOME} className="mx-auto my-auto">
          <BackgroundImage />
        </Link>
        <p className="absolute hidden w-full px-2 text-sm font-medium text-center text-white transform -translate-x-1/2 phone:block left-1/2 bottom-2">
          © 2021, KTV APP. Bản quyền thuộc về KTV. Phát triển bởi USUM SOFTWARE.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full bg-white phone:px-5 ">
        {children}
      </div>
      <p className="absolute block w-full px-2 text-sm font-medium text-center transform -translate-x-1/2 phone:hidden text-primary left-1/2 bottom-2">
        © 2021, KTV APP. Bản quyền thuộc về KTV. Phát triển bởi USUM SOFTWARE.
      </p>
    </div>
  );
};

export default LoginLayout;
