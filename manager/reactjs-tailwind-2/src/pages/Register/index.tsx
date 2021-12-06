import { useEffect, useRef, useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import { IBase64File, ILocation, IPlaceCreateInput } from "common/typings";

import { PATH } from "constants/routes";
import { HA_NOI_LOCATION } from "constants/location";

import { resetAction } from "redux/actions/common";

import IconButton from "designs/IconButton";
import Button from "designs/Button";

import RegisterLayout from "layouts/Register";
import { showNotification } from "redux/actions/notification";
import {
  checkEmailExistByAdminService,
  getIdByPhoneNumberService,
} from "common/functions/servicesApi";
import Preview from "./components/Preview";
import GeneralInfo from "./components/GeneralInfo";
import Location from "./components/Location";
import LocationMapInfo from "./components/LocationMapInfo";

export interface IPreviewImage {
  licenses: IBase64File[];
  logo: IBase64File;
}

const CreateRequestPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const field = useRef<IPlaceCreateInput>({
    locationTypeInput: {},
    location: {
      type: "Point",
      coordinates: [HA_NOI_LOCATION.lng, HA_NOI_LOCATION.lat],
    },
  });

  const location = useRef<ILocation>({});
  const previewImages = useRef<IPreviewImage>({
    licenses: [],
    logo: "",
  });
  const [bool, setBool] = useState<boolean>(false);
  const [isOpenPreview, setIsOpenPreview] = useState(false);

  useEffect(() => {
    dispatch(resetAction());
  }, []);

  useEffect(() => {
    if (isOpenPreview) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      isOpenPreview && document.body.removeAttribute("style");
    };
  }, [isOpenPreview]);

  const rerender = () => {
    setBool(prevState => !prevState);
  };

  const handleSubmit = async () => {
    const formField = field?.current;
    const { phoneNumber = "", email = "" } = formField;
    const phoneExist = await getIdByPhoneNumberService({ phoneNumber });
    if (phoneExist) {
      dispatch(
        showNotification({
          type: "error",
          message:
            "Số điện thoại của bạn đã được đăng kí. Vui lòng nhập số khác!",
        }),
      );
      return;
    }
    const emailExist = await checkEmailExistByAdminService({ email });
    if (emailExist) {
      dispatch(
        showNotification({
          type: "error",
          message: "Email của bạn đã được đăng kí. Vui lòng nhập email khác!",
        }),
      );
      return;
    }

    setIsOpenPreview(true);
  };

  const closePreview = () => {
    setIsOpenPreview(false);
  };

  const handleClick = () => {
    history.push(PATH.ACCOUNT.LOGIN);
  };

  return (
    <RegisterLayout>
      <div className="mt-5">
        <div className="flex flex-row items-center justify-between w-full mb-5">
          <h1 className="flex-auto mt-1 text-xl font-bold leading-none text-primary phone:text-2xl desktop:text-3xl phone:mt-0">
            Trở thành đối tác của chúng tôi !
          </h1>
          <IconButton
            svgName="register/close"
            title="Đóng"
            className="flex-none w-2.5"
            onClick={handleClick}
          />
        </div>
        <ValidatorForm onSubmit={handleSubmit} className="w-full">
          <GeneralInfo
            field={field}
            previewImages={previewImages}
            previewImage={previewImages}
          />
          <Location
            field={field}
            location={location}
            rerenderParent={rerender}
          />
          <LocationMapInfo location={location} field={field} />
          <div className="flex flex-row justify-center w-full mt-4">
            <Button
              type="submit"
              primary
              className="w-full max-w-lg"
              innerClassName="h-4.5"
            >
              ĐĂNG KÝ
            </Button>
          </div>
        </ValidatorForm>
      </div>
      {isOpenPreview && (
        <Preview
          field={field.current}
          location={location.current}
          previewImages={previewImages.current}
          closePreview={closePreview}
        />
      )}
    </RegisterLayout>
  );
};

export default CreateRequestPage;
