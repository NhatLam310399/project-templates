import React, { useState, useEffect } from "react";
import { IBase64Image } from "common/formatTypes";
import ImageUploadLayout from "layouts/ImageUploadLayout";
import SVG from "designs/SVG";
import { randomId, readFile } from "common/functions";

import { useDispatch } from "react-redux";
import { showNotification } from "redux/actions/notification";
import { TextValidator } from "react-material-ui-form-validator";
import { FormHelperText } from "@material-ui/core";
import IconButton from "designs/IconButton";
import { useStyles } from "./styles";

type IVideoFile = File | string | undefined | null;
const VIDEO_SIZE = 31457280; // 30MB
interface ISingleVideoUploaderProps {
    className?: string;
    title?: string;
    required?: boolean;
    maxNumberImage?: number;
    errorMessage?: string;
    videos: IVideoFile[];
    onChange?: (videos: IVideoFile[]) => void;
}

const MultipleVideoUploader: React.FC<ISingleVideoUploaderProps> = props => {
    const dispatch = useDispatch();
    const {
        videos = [],
        required = false,
        errorMessage = "",
        title = "",
        onChange,
        className = "",
        maxNumberImage = 999,
    } = props;
    const classes = useStyles();
    const [displayVideos, setDisplayVideos] = useState<
        IBase64Image[] | string[]
    >([]);
    const validators = required ? ["required"] : [];
    const [fileSelected, setFileSelected] = useState<File | undefined>();
    const [listVideos, setListVideos] = useState<IVideoFile[]>([]);

    const [isError, setIsError] = useState(false);
    const [id, setId] = useState(randomId());
    const typeVideo = [
        "video/mp4",
        "video/avi",
        "video/flv",
        "video/mov",
        "video/wmv",
    ];
    useEffect(() => {
        if (listVideos) {
            onChange && onChange(listVideos);
        }
    }, [listVideos]);

    useEffect(() => {
        if (videos.length > 0) {
            setDisplayVideos(videos as string[]);
        }
    }, [videos]);

    const loadVideo = async (video: File) => {
        const videoSrc = await readFile(video);
        setDisplayVideos([...displayVideos, videoSrc as string]);
    };

    const handleUploadAddNewFile = (files: File[]) => {
        setIsError(false);
        const file = files[0];
        setFileSelected(file);
        const isVideo = typeVideo.includes(file.type);
        if (!isVideo) {
            dispatch(
                showNotification({
                    type: "warning",
                    title: "",
                    message:
                        "File tải lên không đúng định dạng ! Vui lòng chọn lại.",
                }),
            );
        } else if (file.size > VIDEO_SIZE) {
            dispatch(
                showNotification({
                    type: "warning",
                    title: "",
                    message: "Dung lượng video phải nhỏ hơn 30MB.",
                }),
            );
        } else {
            loadVideo(file);
            setListVideos(state => [...state, file]);
        }
    };
    const handleDeleteImage = (index: number) => {
        if (listVideos) {
            const newVideoList = [...listVideos];
            newVideoList?.splice(index, 1);
            const newDisplayList = [...displayVideos];
            newDisplayList?.splice(index, 1);
            setDisplayVideos(newDisplayList);
            setListVideos(newVideoList);
        }
    };
    const handleValidate = (isValid: boolean) => {
        if (isValid) {
            isError && setIsError(false);
        } else {
            !isError && setIsError(true);
        }
    };
    const AddVideosUploadButton: React.FC = () => (
        <ImageUploadLayout
            onUpload={handleUploadAddNewFile}
            accept="video/mp4,video/x-m4v,video/*"
        >
            <div
                className={`input-display border-dashed border h-15 flex justify-center aligns-center
                            rounded-md bg-transparent p-1.5 cursor-pointer w-full
                            ${isError ? "border-red" : "border-grey"}
                            `}
            >
                <div className="text-center default-display">
                    <div className="icon">
                        <SVG name="common/upload" className="block m-auto" />
                    </div>
                    <p className="mt-1 text-sm font-semibold info text-body ">
                        Tải lên video
                    </p>
                </div>
            </div>
        </ImageUploadLayout>
    );
    const RenderPreviewVideo: React.FC = () => {
        return (
            <div className="w-full p-1">
                <ul className="grid w-full grid-cols-3 gap-1 laptop:grid-cols-5">
                    {displayVideos.map((video: string, index: number) => (
                        <div className="relative w-full img-wrapper">
                            <video className="object-cover w-full" controls>
                                <source src={video} type="video/mp4" />
                            </video>
                            <IconButton
                                svgName="common/delete-image"
                                title="Xoá"
                                className="absolute z-10 cursor-pointer fill-current text-primary -top-1 -right-1"
                                onClick={() => handleDeleteImage(index)}
                            />
                        </div>
                    ))}
                </ul>
            </div>
        );
    };
    return (
        <>
            <div className={`w-full ${className} `}>
                <p className="font-medium text-lg mb-0.5">
                    {title}
                    <span className="text-error">{required && "*"}</span>
                </p>
                <AddVideosUploadButton />
                <RenderPreviewVideo />
            </div>
            {isError && (
                <FormHelperText error variant="outlined">
                    {errorMessage}
                </FormHelperText>
            )}
            {required && (
                <TextValidator
                    value={fileSelected ? id : ""}
                    name={id}
                    validators={validators}
                    errorMessages={[errorMessage]}
                    className={classes.inputFieldHidden}
                    validatorListener={handleValidate}
                />
            )}
        </>
    );
};

export default MultipleVideoUploader;
