import { Dialog, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";
import FSDFooter from "./Footer";
import FSDHeader from "./Header";

interface IFullScreenDialogProps {
  open: boolean;
  className?: string;
  onClose: () => void;
}

const FullScreenDialog = (
  props: PropsWithChildren<IFullScreenDialogProps>,
): JSX.Element => {
  const { onClose, open, children, className = "" } = props;

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto z-100"
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className={`inset-0  bg-primary-3 w-full h-full overflow-y-auto ${className}`}
          >
            {children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

FullScreenDialog.Header = FSDHeader;

FullScreenDialog.Footer = FSDFooter;

export default FullScreenDialog;
