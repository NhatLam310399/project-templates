import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ICreateNotification,
  INotification,
  INotificationInput,
  IRootState,
  IUpdateNotification,
} from "common/typings";

import {
  INotifyOptionItem,
  INotifyPermissionItem,
  OPTIONS_NOTIFICATION,
  PERMISSIONS_NOTIFICATION,
} from "constants/types";

import Dialog from "components/Dialog";
import Input from "designs/Input";
import Select from "designs/Select";
import TextArea from "designs/TextArea";

import {
  createNotification,
  updateNotification,
} from "redux/actions/notificationApi";

interface INotificationDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: INotification;
}

const NotificationDialog: React.FC<INotificationDialogProps> = props => {
  const { ButtonMenu, editField } = props;
  const dispatch = useDispatch();

  const {
    allTypeUser: { results: typeUserList },
  } = useSelector((state: IRootState) => state.types);

  const [field, setField] = useState<INotificationInput>({});

  const [permissionSelected, setPermissionSelected] =
    useState<INotifyPermissionItem>();
  const [optionSelected, setOptionSelected] = useState<INotifyOptionItem>();

  useEffect(() => {
    if (editField) {
      const { permission, option } = editField;
      if (permission) {
        const notifyPermission = PERMISSIONS_NOTIFICATION.find(
          item => item.value === permission,
        );
        notifyPermission && setPermissionSelected(notifyPermission);
      }
      if (option) {
        const notifyOption = OPTIONS_NOTIFICATION.find(
          item => item.value === option,
        );
        notifyOption && setOptionSelected(notifyOption);
      }
    }
  }, [editField]);

  const handleSubmit = () => {
    const input = {
      ...field,
      permission: permissionSelected?.value,
    };
    if (editField) {
      const payload: IUpdateNotification = {
        notificationUpdateInput: input,
        id: editField._id!,
      };
      dispatch(updateNotification(payload));
    } else {
      const payload: ICreateNotification = {
        notificationCreateInput: { ...input, option: optionSelected?.value },
      };
      dispatch(createNotification(payload));
    }
  };

  const handleClose = () => {
    if (editField) return;

    // Reset every state to initial
    setField({});
    setPermissionSelected(undefined);
    setOptionSelected(undefined);
  };

  return (
    <Dialog
      className="w-full phone:w-auto"
      ButtonMenu={ButtonMenu}
      onConfirm={handleSubmit}
      onClose={handleClose}
    >
      <div className="w-full m-auto ">
        <div className="mb-4">
          <h1 className="mb-4 font-bold text-black normal-case text-xl laptop:text-mxl">
            {editField ? "S???a th??ng b??o" : "Th??m th??ng b??o"}
          </h1>
        </div>

        <Input
          label="Ti??u ????? th??ng b??o"
          name="name"
          initValue={editField?.title}
          className="mb-2"
          onChange={title => {
            setField(state => ({ ...state, title }));
          }}
          validates={{
            required: {
              errorMessage: "Vui l??ng nh???p ti??u ????? th??ng b??o",
            },
          }}
          placeholder="Nh???p ti??u ????? th??ng b??o"
        />

        <Select
          label="Lo???i th??nh vi??n nh???n th??ng b??o"
          value={permissionSelected?.name}
          className="mb-2"
          onSelectOption={permission => {
            setPermissionSelected(permission);
          }}
          options={PERMISSIONS_NOTIFICATION}
          required
          errorMessage="Vui l??ng ch???n lo???i th??nh vi??n"
          floatTitle={false}
          placeholder="Ch???n lo???i th??nh vi??n nh???n th??ng b??o"
        />

        <Select
          label="Lo???i th??ng b??o"
          value={optionSelected?.name}
          className="mb-2"
          onSelectOption={type => {
            setOptionSelected(type);
          }}
          options={OPTIONS_NOTIFICATION}
          required={!editField}
          errorMessage="Vui l??ng ch???n lo???i th??ng b??o"
          floatTitle={false}
          placeholder="Ch???n lo???i th??ng b??o"
          disabled={!!editField}
        />

        <TextArea
          label="M?? t??? th??ng b??o"
          initValue={editField?.content}
          onChange={content => {
            setField(state => ({ ...state, content }));
          }}
          validates={{
            required: {
              errorMessage: "Vui l??ng nh???p m?? t??? th??ng b??o",
            },
          }}
          placeholder="M?? t??? v??? th??ng b??o"
        />
      </div>
    </Dialog>
  );
};

export default NotificationDialog;
