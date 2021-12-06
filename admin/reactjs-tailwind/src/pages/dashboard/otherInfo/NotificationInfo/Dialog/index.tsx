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
            {editField ? "Sửa thông báo" : "Thêm thông báo"}
          </h1>
        </div>

        <Input
          label="Tiêu đề thông báo"
          name="name"
          initValue={editField?.title}
          className="mb-2"
          onChange={title => {
            setField(state => ({ ...state, title }));
          }}
          validates={{
            required: {
              errorMessage: "Vui lòng nhập tiêu đề thông báo",
            },
          }}
          placeholder="Nhập tiêu đề thông báo"
        />

        <Select
          label="Loại thành viên nhận thông báo"
          value={permissionSelected?.name}
          className="mb-2"
          onSelectOption={permission => {
            setPermissionSelected(permission);
          }}
          options={PERMISSIONS_NOTIFICATION}
          required
          errorMessage="Vui lòng chọn loại thành viên"
          floatTitle={false}
          placeholder="Chọn loại thành viên nhận thông báo"
        />

        <Select
          label="Loại thông báo"
          value={optionSelected?.name}
          className="mb-2"
          onSelectOption={type => {
            setOptionSelected(type);
          }}
          options={OPTIONS_NOTIFICATION}
          required={!editField}
          errorMessage="Vui lòng chọn loại thông báo"
          floatTitle={false}
          placeholder="Chọn loại thông báo"
          disabled={!!editField}
        />

        <TextArea
          label="Mô tả thông báo"
          initValue={editField?.content}
          onChange={content => {
            setField(state => ({ ...state, content }));
          }}
          validates={{
            required: {
              errorMessage: "Vui lòng nhập mô tả thông báo",
            },
          }}
          placeholder="Mô tả về thông báo"
        />
      </div>
    </Dialog>
  );
};

export default NotificationDialog;
