import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateUserProfile, getUserProfile } from "@redux/actions/user";
import { setLoading } from "@redux/actions/common";
import { IUpdateUserInput, IRootState } from "@common/typings";

import Avatar from "@designs/Avatar";
import ImageCropper from "@components/ImageCropper";
import { randomId } from "@common/functions";
import { SVG } from "@designs/SVG";

import {
  Container,
  UploadWrapper,
  Input,
  AvatarWrapper,
  Button,
  Label,
} from "./styles";

interface IAvatarUploaderProps {
  aspect?: number;
  name?: string;
  userId?: string;
  avatarURL?: string;
}

const AvatarUploader: React.FC<IAvatarUploaderProps> = (props) => {
  const { aspect = 1, userId, avatarURL } = props;

  const { isLoading } = useSelector((state: IRootState) => state.actions);
  const dispatch = useDispatch();

  const [fileSelected, setFileSelected] = useState<File | undefined>();
  const [openCropImage, setOpenCropImage] = useState(false);
  const [id, _] = useState(randomId());

  const handleUploadRawImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (!files) return;

    const file = files[0];
    setFileSelected(file);
    setOpenCropImage(true);
  };

  const handleCloseImageCropper = () => {
    setOpenCropImage(false);
  };

  const handleCroppedImage = (file: File) => {
    const updateUserPayload: IUpdateUserInput = {
      updateUserInput: {
        urlAvt: file,
      },
    };
    dispatch(updateUserProfile(updateUserPayload));
    handleCloseImageCropper();
  };

  return (
    <>
      <Container>
        <Label htmlFor={id}>
          <UploadWrapper>
            <AvatarWrapper>
              <Avatar href={avatarURL} className="w-12 phone:w-17" />
              <Button>
                <SVG
                  name="job-management/edit-avatar"
                  className="phone:w-6.5 w-4"
                />
              </Button>
            </AvatarWrapper>
          </UploadWrapper>

          <Input
            accept="image/*"
            id={id}
            type="file"
            onChange={handleUploadRawImage}
          />
        </Label>
      </Container>

      <ImageCropper
        aspect={aspect}
        image={fileSelected}
        isOpen={openCropImage}
        onClose={handleCloseImageCropper}
        onConfirm={handleCroppedImage}
        isLoading={isLoading}
      />
    </>
  );
};

export default AvatarUploader;
