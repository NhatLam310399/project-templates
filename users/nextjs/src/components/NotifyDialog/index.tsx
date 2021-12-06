import Dialog from "@components/Dialog";
import { useTranslation } from "next-i18next";
import {
  AlertDialogContainer,
  DialogContainer,
  Title,
  Message,
  Button,
} from "./styles";

interface IErrorAlertProps {
  message: string;
  onConfirm?: () => void;
  title: string;
  data?: any;
  className?: string;
  isOpen?: boolean;
}

const AlertDialog: React.FC<IErrorAlertProps> = (props) => {
  const { t } = useTranslation(["common"]);
  const { title, message, isOpen = false, onConfirm, data, className } = props;

  const handleConfirm = () => {
    onConfirm && onConfirm();
  };
  return (
    <AlertDialogContainer className={className}>
      <Dialog
        isOpen={isOpen}
        className="z-50 rounded-none w-max"
        onClose={handleConfirm}
      >
        <DialogContainer>
          <Title>{title}</Title>
          <Message>{message}</Message>
          <div className="flex flex-row justify-end">
            <Button primary onClick={handleConfirm}>
              {t("dialog.confirm")}
            </Button>
          </div>
        </DialogContainer>
      </Dialog>
    </AlertDialogContainer>
  );
};

export default AlertDialog;
