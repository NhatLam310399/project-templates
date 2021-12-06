import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import {
  IBase64File,
  ICreateRequest,
  ILocation,
  IPlaceCreateInput,
  ILatLng,
} from "common/typings";
import { renderLocation } from "common/functions/string/renderLocation";
import { colors } from "common/styles/colors";
import { useDialogStyles } from "common/styles/muiStyles/useStyles";
import GoongMapWithMark from "components/GoongMapWithMark";

import { PATH } from "constants/routes";
import { BUSINESS_TYPES } from "constants/types";

import IconButton from "designs/IconButton";
import SVG from "designs/SVG";
import Button from "designs/Button";

import { IRootState } from "redux/reducers";
import { createRequest } from "redux/actions/request";
import { resetAction } from "redux/actions/common";

import { IPreviewImage } from "pages/Register";

interface IPreviewProps {
  field: IPlaceCreateInput;
  location: ILocation;
  previewImages: IPreviewImage;
  closePreview: () => void;
}

const Preview: React.FC<IPreviewProps> = props => {
  const dispatch = useDispatch();
  const { field, location, previewImages, closePreview } = props;
  const businessType = BUSINESS_TYPES.find(item => item.type === field.type);
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );
  const [isOpenSuccessAlert, setIsOpenSuccessAlert] = useState(false);

  const locationDisplay = renderLocation([
    field.locationTypeInput.street_name,
    location.ward?.name,
    location.district?.name,
    location.province?.name,
  ]);

  useEffect(() => {
    dispatch(resetAction());
  }, []);

  useEffect(() => {
    if (actionSuccess) {
      setIsOpenSuccessAlert(true);
    }
  }, [actionSuccess]);

  const handleSubmitRequest = () => {
    const payload: ICreateRequest = { requestCreateInput: field };
    dispatch(createRequest(payload));
  };

  return (
    <>
      <div
        className={`
      fixed top-0 right-0 left-0 bottom-0 w-full h-full bg-white p-2 phone:p-4 z-100 text-black text-md overflow-auto
    `}
      >
        <div className="flex flex-row items-center justify-between w-full mb-4">
          <h1 className="flex-auto text-xl font-bold leading-none text-primary phone:text-2xl desktop:text-3xl">
            Xác nhận thông tin doanh nghiệp
          </h1>
          <IconButton
            svgName="register/close"
            title="Đóng"
            className="flex-none w-2.5"
            onClick={() => closePreview()}
          />
        </div>

        <div className="relative grid gap-2 CONTENT phone:grid-cols-2 phone:gap-5 desktop:gap-14">
          <div className="LEFT-SIDE">
            <div className="flex flex-row items-center h-6 BOSS-NAME-AND-LOGO">
              <img
                src={previewImages?.logo}
                className="h-full w-auto mr-1.5"
                alt="logo"
              />
              <h2 className="text-xl font-bold phone:text-2xl text-primary">
                {field?.name}
              </h2>
            </div>
            <div className="flex flex-row items-center mt-3 LOCATION">
              <SVG name="common/location" className="mr-1.5 text-lg" />
              <p>{locationDisplay}</p>
            </div>
            <div className="mt-2">
              <Title>Loại hình doanh nghiệp:</Title>
              <p>{businessType?.name}</p>
            </div>
            <div className="mt-2">
              <Title>SDT:</Title>
              <p>{field?.phoneNumber}</p>
            </div>
            {field.email ? (
              <div className="mt-2">
                <Title>Email:</Title>
                <p>{field.email}</p>
              </div>
            ) : null}
            {field.introduce ? (
              <div className="mt-2">
                <Title>Mô tả công ty:</Title>
                <p>{field.introduce}</p>
              </div>
            ) : null}
            {previewImages.licenses.length ? (
              <div className="mt-2">
                <Title>Giấy phép kinh doanh</Title>
                <BusinessLicenses images={previewImages.licenses} />
              </div>
            ) : null}
          </div>
          <div className="relative w-full RIGHT-SIDE h-50 phone:h-full ">
            <GoogleMapInLocation
              lng={field.location?.coordinates?.[0]}
              lat={field.location?.coordinates?.[1]}
            />
          </div>
        </div>

        <div className="relative flex flex-row justify-center w-full phone:justify-end">
          <Button
            disabled={isLoading}
            type="submit"
            primary
            className="w-full max-w-xs mt-4"
            innerClassName="h-4.5"
            onClick={handleSubmitRequest}
          >
            Gửi yêu cầu
          </Button>
        </div>
      </div>
      <SuccessAlert
        isOpen={isOpenSuccessAlert}
        setIsOpen={setIsOpenSuccessAlert}
      />
    </>
  );
};

export default Preview;

const Title: React.FC = ({ children }) => {
  return <h3 className=" text-lg font-bold mb-0.5">{children}</h3>;
};

const BusinessLicenses: React.FC<{ images: IBase64File[] | undefined }> = ({
  images = [],
}) => {
  return (
    <div className="flex flex-wrap gap-2 overflow-x-auto">
      {images?.map((image, index) => (
        <img
          key={String(index)}
          src={image}
          alt="licenses"
          className="w-10 h-13 object-cover block rounded"
        />
      ))}
    </div>
  );
};

const GoogleMapInLocation: React.FC<ILatLng> = ({ lat = 0, lng = 0 }) => {
  return (
    <GoongMapWithMark
      center={{ lat, lng }}
      marks={[{ position: { lat, lng } }]}
    />
  );
};

const SuccessAlert: React.FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useDialogStyles();

  const handleBackToHomePage = () => {
    setIsOpen(false);
    dispatch(resetAction());
    setTimeout(() => {
      history.push(PATH.HOME);
      window?.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      className={classes.root}
      onClose={handleBackToHomePage}
      aria-labelledby="alert-dialog-title-2"
      aria-describedby="alert-dialog-description-2"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: colors.white,
        },
      }}
    >
      <div className="p-2 phone:p-4">
        <DialogTitle id="alert-dialog-title-2">
          <p className="font-bold text-mxl leading-none text-black mb-2">
            Tạo thành công
          </p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description-2">
            <span className="text-black font-medium text-lg ">
              Bạn đã tạo thành công yêu cầu xét duyệt. Yêu cầu sẽ được xét duyệt
              sớm nhất có thể.
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mt-2 phone:mt-4">
          <Button
            innerClassName="p-1 h-4 text-lg font-medium normal-case"
            onClick={handleBackToHomePage}
            color="primary"
            autoFocus
          >
            Quay về trang chủ
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};
