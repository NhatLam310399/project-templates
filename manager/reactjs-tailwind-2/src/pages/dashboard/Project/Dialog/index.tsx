import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  IProjectInput,
  IProjectType,
  ICreateProject,
  IUpdateProject,
  ICustomUploadInput,
  IRootState,
} from "common/typings";

import Dialog from "components/Dialog";
import SingleVideoUploader from "components/SingleVideoUploader";
import MultipleImagesUploader from "components/MultipleImagesUploader";

import Input from "designs/Input";
import TextArea from "designs/TextArea";

import { createProject, updateProject } from "redux/actions/project";

import { CUSTOM_SIZE_UPLOAD_STORE_IMAGE } from "constants/image";

interface IProjectDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: IProjectType;
}

const ProjectDialog: React.FC<IProjectDialogProps> = props => {
  const { ButtonMenu, editField } = props;

  const { place } = useSelector((state: IRootState) => state.place);
  const dispatch = useDispatch();

  const [formField, setFormField] = useState<IProjectInput | null>(null);

  const [createImageList, setCreateImageList] = useState<File[]>([]);
  const [updateImageList, setUpdateImageList] = useState<ICustomUploadInput[]>(
    [],
  );

  const handleOnSubmit = () => {
    const input = {
      ...formField,
      customSizeForUploadImage: CUSTOM_SIZE_UPLOAD_STORE_IMAGE,
    };
    if (editField) {
      const updateInput = {
        ...input,
        images: updateImageList,
      } as IProjectInput;
      const payload: IUpdateProject = {
        id: editField?._id || "",
        projectUpdateInput: updateInput,
      };
      dispatch(updateProject(payload));
    } else {
      const payload: ICreateProject = {
        projectCreateInput: {
          ...input,
          images: createImageList,
          company: place?._id,
        },
      };
      dispatch(createProject(payload));
    }
  };

  const handleClose = () => {
    if (editField) return;

    // Reset every state to initial
    setFormField({ name: "" });
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleOnSubmit}
      onClose={handleClose}
      size="md"
    >
      <div className="w-full m-auto rounded-md">
        <div className="mb-4 font-bold text-black normal-case text-mxl">
          {editField ? "Ch???nh s???a d??? ??n" : "Th??m d??? ??n"}
        </div>
        <div className="grid grid-cols-1 gap-2 laptop:grid-cols-2">
          <div className="">
            <Input
              label="T??n d??? ??n"
              initValue={editField?.name}
              name="name"
              onChange={name => {
                setFormField(state => ({ ...state, name }));
              }}
              validates={{
                required: {
                  errorMessage: "Vui l??ng nh???p t??n d??? ??n",
                },
              }}
              placeholder="Nh????p t??n d??? ??n"
            />
            <TextArea
              className="mt-2"
              label="M?? ta?? d??? ??n"
              initValue={editField?.introduce}
              name="introduce"
              onChange={introduce => {
                if (introduce) {
                  setFormField(state => ({ ...state, introduce }));
                }
              }}
              placeholder="M?? ta?? d??? ??n"
            />
          </div>
          <div className="">
            <MultipleImagesUploader
              label="H??nh ???nh d??? ??n"
              images={editField?.images}
              onCreateChange={imagesList => {
                setCreateImageList(imagesList);
              }}
              onUpdateChange={imagesList => {
                setUpdateImageList(imagesList);
              }}
              isEdit={!!editField}
            />
            <SingleVideoUploader
              className="mt-2"
              label="Video d??? ??n"
              video={editField?.video}
              onChange={video => {
                if (video) {
                  setFormField(state => ({ ...state, video }));
                }
              }}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProjectDialog;
