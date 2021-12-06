import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface IToast {}

const Toast: React.FC<IToast> = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {children}
    </>
  );
};

export default Toast;
