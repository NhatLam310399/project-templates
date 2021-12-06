import { useState } from "react";
import Dialog from "components/Dialog";

interface IAlertDialogProps {}

const AlertDialog: React.FC<IAlertDialogProps> = props => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={false} onClose={() => setIsOpen(false)}>
      Alert Dialog
    </Dialog>
  );
};

export default AlertDialog;
