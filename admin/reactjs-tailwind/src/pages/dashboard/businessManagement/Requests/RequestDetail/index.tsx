import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

import GoongMapLocationPicker from "components/GoongMapLocationPicker";
import { renderLocation } from "common/functions/string/renderLocation";
import { ICustomSizeImages, IRootState } from "common/typings";
import { BUSINESS_TYPES } from "constants/types";
import { PATH } from "constants/routes";

import SVG from "designs/SVG";
import Button from "designs/Button";

import { acceptRequest, getRequestById } from "redux/actions/request";
import { setBreadcrumb } from "redux/actions/_config";
import { resetAction } from "redux/actions/common";

const RequestDetail: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
  history,
}) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const {
    requestById: {
      name = "",
      province,
      district,
      ward,
      street,
      phoneNumber = "",
      email = "",
      introduce = "",
      type,
      licenseImages = [],
      location,
    } = {},
  } = useSelector((state: IRootState) => state.request);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  const mapPosition = useMemo(
    () => ({
      lng: location?.coordinates[0] || 0,
      lat: location?.coordinates[1] || 0,
    }),
    [location],
  );

  const locationDisplay = renderLocation([
    street,
    ward?.name,
    district?.name,
    province?.name,
  ]);

  const businessType = BUSINESS_TYPES.find(item => item.type === type)?.name;

  useEffect(() => {
    dispatch(getRequestById({ id }));
    dispatch(resetAction());
  }, []);

  useEffect(() => {
    setupBreadcrumb();
  }, [name]);

  useEffect(() => {
    if (actionSuccess) {
      if (type === "PENDING_COMPANY")
        return history.push(PATH.BUSINESS_MANAGEMENT.COMPANY);
      if (type === "PENDING_KARAOKE")
        return history.push(PATH.BUSINESS_MANAGEMENT.KARAOKE);
    }
  }, [actionSuccess]);

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Quản lý doanh nghiệp",
        },
        {
          name: "Yêu cầu xét duyệt",
        },
        {
          name,
        },
      ]),
    );
  };

  const handleAcceptRequest = () => {
    dispatch(acceptRequest({ id }));
  };

  const handleCancel = () => {
    history.push(PATH.BUSINESS_MANAGEMENT.REQUEST);
  };

  return (
    <div className="wrap">
      <h2 className="text-3xl font-bold text-primary">{name}</h2>
      <div className="grid grid-cols-1 gap-3 mt-4 phone:grid-cols-12">
        <div className="col-span-1 phone:col-span-6">
          <div className="flex mb-2">
            <SVG name="common/location" />
            <span className="block ml-1 text-lg">{locationDisplay}</span>
          </div>
          <div className="laptop:flex gap-2">
            <div className="flex gap-1">
              <SVG name="common/phone" />
              <span className="block text-lg">{phoneNumber}</span>
            </div>
            {email && (
              <div className="flex gap-1">
                <SVG name="common/mail" />
                <span className="block text-lg">{email}</span>
              </div>
            )}
          </div>
          <div className="mt-4">
            <h3 className="mb-1 font-bold">Loại hình doanh nghiệp:</h3>
            <p>{businessType}</p>
          </div>
          {introduce && (
            <div className="mt-4">
              <h3 className="mb-1 font-bold">Giới thiệu công ty</h3>
              <p>{introduce}</p>
            </div>
          )}
          {licenseImages && <LicenseImagesShow images={licenseImages} />}
        </div>
        <div className="col-span-1 h-30 phone:col-start-7 phone:col-end-13 phone:h-60 ">
          <GoongMapLocationPicker center={mapPosition} />
        </div>
      </div>
      <div className="flex flex-row items-center justify-end w-full gap-2 mt-5">
        <Button
          tertiary
          className="w-17"
          innerClassName="p-1 h-4.5 normal-case"
          onClick={handleCancel}
        >
          Hủy
        </Button>
        <Button
          primary
          className="w-17"
          innerClassName="p-1 h-4.5 normal-case"
          onClick={handleAcceptRequest}
        >
          Duyệt
        </Button>
      </div>
    </div>
  );
};

export default withRouter(RequestDetail);

const LicenseImagesShow: React.FC<{ images: ICustomSizeImages[] }> = ({
  images = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const lightboxImages = images.map(image => ({
    url: image.medium || image.default,
    title: "license",
  }));
  return images?.length > 0 ? (
    <div className="mt-4">
      <h3 className="mb-1 font-bold">Giấy phép kinh doanh</h3>
      <div className="grid grid-cols-3 gap-x-2">
        {images.map((image: ICustomSizeImages) => (
          <img
            src={image?.small || image.default}
            alt=""
            key={image?.small || image.default}
            className="w-full cursor-zoom-in"
            onClick={() => setIsOpen(true)}
          />
        ))}
      </div>
      {isOpen && (
        <Lightbox images={lightboxImages} onClose={() => setIsOpen(false)} />
      )}
    </div>
  ) : null;
};
