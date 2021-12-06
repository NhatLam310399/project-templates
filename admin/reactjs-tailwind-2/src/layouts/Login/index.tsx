import { ReactComponent as SportImage } from "assets/images/svg/login/sports.svg";
import { ReactComponent as BackgroundImage } from "assets/images/svg/login/background.svg";

interface ILoginLayout {}

const LoginLayout: React.FC<ILoginLayout> = props => {
    const { children } = props;
    return (
        <div className=" flex flex-col justify-center laptop:grid laptop:grid-cols-12 w-screen h-screen items-center ">
            <div className="right-side-background-image absolute top-0 -right-1 z-0 w-1/2">
                <BackgroundImage className=" mr-0 ml-auto laptop:block hidden" />
            </div>
            <div className="content-wrapper col-start-2 col-end-6 z-1">
                {children}
            </div>
            <div className="image-wrapper col-start-8 col-end-12 laptop:block z-10 hidden">
                <SportImage />
            </div>
            <footer className="w-screen bg-primary absolute bottom-0 left-0 right-0 pl-0 py-1.5 phone:pl-10">
                <p className="text-white text-sm text-center phone:text-left">
                    © 2021. Bản quyền thuộc về KTV. Phát triển bởi USUM SOFTWARE
                </p>
            </footer>
        </div>
    );
};

export default LoginLayout;
