import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import Button from "designs/Button";
import { getCroppedImg, randomId, readFile } from "common/functions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Slider from "@material-ui/core/Slider";
import DialogContent from "@material-ui/core/DialogContent";

const styles = {
    cropAreaStyle: {},
    cropAreaClassName: {
        width: "100%",
        height: "100%",
    },
};
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
    objectFit?: "contain" | "horizontal-cover" | "vertical-cover";
}

const ImageCropper: React.FC<IImageCropper> = props => {
    const {
        image,
        aspect = 1,
        onConfirm,
        onClose,
        objectFit = "contain",
        isOpen = false,
        shape = "rect",
    } = props;
    const [imageSrc, setImageSrc] = useState<string>("");
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
        x: 0,
        y: 10,
        width: 0,
        height: 0,
    });

    const [id, setId] = useState(randomId());

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

    const handleChangeSlider = (
        event: React.ChangeEvent<{}>,
        value: number | number[],
    ) => {
        setZoom(value as number);
    };

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
        <Dialog open={isOpen} maxWidth="sm" fullWidth id={id}>
            <DialogContent>
                <div className="container-image-cropper w-full h-4/5 flex flex-col items-center">
                    <div className="relative items-center w-full h-40">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspect}
                            onCropChange={setCrop}
                            onCropComplete={handleCropComplete}
                            onZoomChange={setZoom}
                            cropShape={shape}
                            objectFit={objectFit}
                        />
                    </div>
                    <div className="w-3/4 controls py-2">
                        <Slider
                            valueLabelDisplay="auto"
                            value={zoom}
                            min={0.1}
                            max={3}
                            step={0.01}
                            aria-labelledby="Zoom"
                            onChange={handleChangeSlider}
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    innerClassName=" py-1 px-3.5 h-4 font-semibold normal-case"
                    onClick={handleClose}
                >
                    Huỷ
                </Button>
                <Button
                    primary
                    innerClassName="py-1 px-3.5 h-4 font-semibold normal-case"
                    onClick={handleConfirm}
                    type="submit"
                >
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageCropper;
