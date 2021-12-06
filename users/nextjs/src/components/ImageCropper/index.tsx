import React, { useState, useCallback, useEffect, Fragment } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { useTranslation } from "next-i18next";

import Button from "@designs/Button";
import { getCroppedImg, randomId, readFile } from "@common/functions";
import { Dialog, Transition } from "@headlessui/react";

interface IImageCropper {
  image: File | undefined;
  /**
   * @example
   *  aspect = 1/2
   *  aspect = 19/6
   * @default value = 1
   */
  aspect?: number;
  onClose: () => void;
  onConfirm: (file: File, base64File: string) => void;
  isOpen: boolean;
  shape?: "rect" | "round";
  isLoading?: boolean;
}

const ImageCropper: React.FC<IImageCropper> = (props) => {
  const {
    image,
    aspect = 1,
    onConfirm,
    onClose,
    isOpen = false,
    shape = "rect",
    isLoading,
  } = props;
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const [id, setId] = useState(randomId());
  const { t } = useTranslation(["common"]);

  useEffect(() => {
    loadImage();
  }, [image]);

  useEffect(() => {
    if (!isOpen) {
      setZoom(1);
      setImageSrc("");
    }
  }, [isOpen]);

  const loadImage = async () => {
    const imageSrc = await readFile(image);
    setImageSrc(imageSrc as string);
  };

  const handleCropComplete = useCallback(
    (croppedArea: Area, _croppedAreaPixels: Area) => {
      setCroppedAreaPixels(_croppedAreaPixels);
    },
    [],
  );

  const handleConfirm = async () => {
    const croppedImage = await getCroppedImg(
      imageSrc as any,
      croppedAreaPixels,
    );
    onConfirm && onConfirm(croppedImage.file, croppedImage.base64File);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto bg-grey bg-opacity-40"
        onClose={handleClose}
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
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-11/12 p-2 align-middle bg-white rounded-md h-50 laptop:w-80">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="text-left transition-all transform shadow-xl rounded-2xl">
                <div className="h-40 w-30">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onCropComplete={handleCropComplete}
                    onZoomChange={setZoom}
                    cropShape={shape}
                  />
                </div>
                <div className="absolute right-0 flex w-full -bottom-7 gap-x-1">
                  <Button
                    type="button"
                    onClick={handleClose}
                    className="w-1/2 border border-solid border-primary"
                  >
                    {t("dialog.cancel")}
                  </Button>
                  <Button
                    primary
                    type="button"
                    loading={isLoading}
                    onClick={handleConfirm}
                    className="w-1/2"
                  >
                    {!isLoading && t("dialog.confirm")}
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImageCropper;
