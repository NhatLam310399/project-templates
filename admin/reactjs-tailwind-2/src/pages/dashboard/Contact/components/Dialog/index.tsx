import React from "react";
import { t } from "language";
import { IContact } from "common/formatTypes";
import Dialog, { DialogTitle } from "components/Dialog";
import ViewField from "designs/ViewField";

interface IJobTypeDialogProps {
    ButtonMenu: React.ReactElement;
    editField?: IContact;
    className?: string;
}

const ContactDialog: React.FC<IJobTypeDialogProps> = ({
    ButtonMenu,
    editField,
    className,
}) => {
    const handleClose = () => {};

    return (
        <Dialog
            ButtonMenu={ButtonMenu}
            onClose={handleClose}
            className={className}
            size="md"
            isDialogView
        >
            <DialogTitle className="mb-3">
                {t("contact.title-view")}
            </DialogTitle>

            <div className="w-full mb-1">
                <div className="grid grid-cols-2 gap-2">
                    <ViewField
                        className="col-span-2 laptop:col-span-1"
                        label={t("contact.full-name")}
                        content={editField?.name}
                    />
                    <ViewField
                        className="col-span-2 laptop:col-span-1"
                        label={t("contact.email")}
                        content={editField?.email}
                    />
                    <ViewField
                        className="col-span-2 laptop:col-span-1"
                        label={t("contact.title")}
                        content={editField?.title}
                    />
                </div>
                <ViewField
                    className="w-full mt-2"
                    label={t("contact.content")}
                    isTextArea
                    content={editField?.description}
                />
            </div>
        </Dialog>
    );
};

export default ContactDialog;
