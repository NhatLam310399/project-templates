import React, { useEffect, useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";

import {
  ICustomUploadInputVideo,
  IUpdatePlace,
  IVideo,
  IPlace,
  IVideosFile,
} from "common/typings";
import { uploadVideosInput } from "common/functions/file/uploadVideoInput";
import { typeTitle } from "constants/setting";

import { IRootState } from "redux/reducers";
import { resetAction } from "redux/actions/common";

import UploadVideo from "components/MultipleVideoUploader";
import Button from "designs/Button";

import { updatePlaceApi } from "pages/dashboard/Setting/helper";

interface IBoxStoreVideo {}
const BoxStoreVideo: React.FC<IBoxStoreVideo> = props => {
  const { place = {} } = useSelector((state: IRootState) => state.place);

  const [videoList, setVideoList] = useState<IVideosFile[]>([]);
  const dispatch = useDispatch();
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
    }
  }, [actionSuccess]);
  useEffect(() => {
    if (place && place?.videos) {
      const initVideo: string[] = place?.videos;
      setVideoList(initVideo);
    }
  }, [place]);
  const handleOnSubmit = () => {
    if (videoList.length <= 0) {
      return;
    }
    const videos = uploadVideosInput(videoList);
    const payload: IUpdatePlace = {
      id: place?._id || "",
      placeUpdateInput: {
        videos: videos as ICustomUploadInputVideo[],
      },
    };
    updatePlaceApi(payload, place?.type);
  };
  const handleUploadVideoFile = (listVideo: IVideo[], url: string[]) => {
    if (listVideo) {
      const videos = listVideo.filter(Boolean).map((video, index: number) => {
        if (typeof video === "string") {
          return video;
        }
        return { file: video as File, base64File: url[index] };
      });
      setVideoList(videos);
    }
  };
  return (
    <div>
      <ValidatorForm onSubmit={handleOnSubmit} className="">
        <UploadVideo
          title={typeTitle("placeVideo")}
          onChange={handleUploadVideoFile}
          videos={(place?.videos as string[]) || []}
        />

        <div className="mt-4 flex justify-end">
          <Button
            primary
            type="submit"
            className="w-17 max-w-full "
            innerClassName="h-4.5 text-lg normal-case"
          >
            Lưu
          </Button>
        </div>
      </ValidatorForm>
    </div>
  );
};
export default BoxStoreVideo;
