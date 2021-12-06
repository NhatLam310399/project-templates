import { Dialog as DialogUI, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { ContentContainer } from "./styles";

interface IDialogProps {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
}

const Dialog: React.FC<IDialogProps> = (props) => {
  const { className = "", isOpen, children, onClose } = props;
  const cancelButtonRef = useRef();

  return (
    <Transition show={isOpen} as={Fragment}>
      <DialogUI
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto"
        onClose={onClose}
        initialFocus={cancelButtonRef}
      >
        <div className="min-h-screen px-1 text-center phone:px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogUI.Overlay
              className="fixed inset-0 "
              style={{ background: "#00000061" }}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <ContentContainer className={className}>
              {children}
              <button ref={cancelButtonRef} className="hidden"></button>
            </ContentContainer>
          </Transition.Child>
        </div>
      </DialogUI>
    </Transition>
  );
};

export default Dialog;
