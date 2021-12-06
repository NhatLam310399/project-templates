import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { ValidatorForm } from "react-material-ui-form-validator";

import {
  IRootState,
  IDistrict,
  IProvince,
  IWard,
  IPlaceUpdateInput,
  ICustomUploadInput,
  IUpdateKaraoke,
  IPlaceCreateInput,
  ILocationType,
} from "common/typings";
import { PATH } from "constants/routes";
import { HA_NOI_LOCATION } from "constants/location";

import LocationMap from "components/LocationMapInfo";
import Button from "designs/Button";
import Input from "designs/Input";
import Select from "designs/Select";
import TextArea from "designs/TextArea";
import SingleImageUploader from "components/SingleImageUploader";
import { PreviousIcon } from "designs/icons/Common";

import { getKaraokeById, updateKaraoke } from "redux/actions/karaoke";
import { setBreadcrumb } from "redux/actions/_config";
import { getDistricts, getProvinces, getWards } from "redux/actions/location";
import { resetAction } from "redux/actions/common";
import { renderLocation } from "common/functions";

import MultipleImagesUploader from "components/MultipleImagesUploader";
import { ASPECT_RATIO_LICENSE } from "constants/aspect";

const KaraokeDetail: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
  history,
}) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const { karaoke } = useSelector((state: IRootState) => state.karaoke);
  const { provinces, districts, wards } = useSelector(
    (state: IRootState) => state.location,
  );
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  const [formField, setFormField] = useState<IPlaceUpdateInput>({});
  const [updateLicenseImages, setUpdateLicenseImages] = useState<
    ICustomUploadInput[]
  >([]);

  const [provinceSelected, setProvinceSelected] =
    useState<IProvince | null>(null);
  const [districtSelected, setDistrictSelected] =
    useState<IDistrict | null>(null);
  const [wardSelected, setWardSelected] = useState<IWard | null>(null);
  const [streetName, setStreetName] = useState("");

  useEffect(() => {
    const detailAddress = renderLocation([
      wardSelected?.name || "",
      districtSelected?.name || "",
      provinceSelected?.name || "",
    ]);
    if (detailAddress) {
      setStreetName(detailAddress);
    }
  }, [provinceSelected, districtSelected, wardSelected]);

  const fieldRef = useRef<IPlaceCreateInput>({
    locationTypeInput: {},
    location: {
      type: "Point",
      coordinates: [HA_NOI_LOCATION.lng, HA_NOI_LOCATION.lat],
    },
  });
  const locationRef = useRef<ILocationType>({});

  useEffect(() => {
    dispatch(getKaraokeById({ id }));
    setupBreadcrumb();
    dispatch(getProvinces({ name: "" }));
  }, []);

  useEffect(() => {
    if (karaoke) {
      const {
        province,
        district,
        ward,
        street,
        location: { coordinates } = {},
      } = karaoke;
      province && handleSelectProvince(province);
      district && handleSelectDistrict(district);
      ward && handleSelectWard(ward);
      street && setStreetName(street);

      if (coordinates) {
        fieldRef.current.location.coordinates = [...coordinates];
      }
    }
  }, [karaoke]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      history.replace(PATH.BUSINESS_MANAGEMENT.KARAOKE);
    }
  }, [actionSuccess]);

  const handleSelectProvince = (option: IProvince) => {
    setProvinceSelected(option);
    districtSelected && setDistrictSelected(null);
    wardSelected && setWardSelected(null);
    locationRef.current = {
      province: option,
      district: {},
      ward: {},
    };
    dispatch(getDistricts({ name: "", province_code: option.code }));
  };

  const handleSelectDistrict = (option: IDistrict) => {
    setDistrictSelected(option);
    wardSelected && setWardSelected(null);
    locationRef.current = {
      province: provinceSelected,
      district: option,
      ward: {},
    };
    dispatch(getWards({ name: "", district_code: option.code }));
  };

  const handleSelectWard = (option: IWard) => {
    setWardSelected(option);
    locationRef.current.ward = option;
  };

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Quản lý doanh nghiệp",
        },
        {
          name: "Quán karaoke",
        },
      ]),
    );
  };

  const handleConfirm = () => {
    const locationTypeInput = {
      province_code: provinceSelected?.code,
      district_code: districtSelected?.code,
      ward_code: wardSelected?.code,
      street_name: streetName,
    };

    const { current: field } = fieldRef;

    const payload: IUpdateKaraoke = {
      id: karaoke?._id || "",
      placeUpdateInput: {
        ...formField,
        locationTypeInput,
        licenseImages: updateLicenseImages,
        location: field.location,
      },
    };
    dispatch(updateKaraoke(payload));
  };

  return (
    <div>
      <div className="flex items-center gap-1 mb-4">
        <Link to={`${PATH.BUSINESS_MANAGEMENT.KARAOKE}`} className="flex-none">
          <PreviousIcon className="block fill-current hover:text-success" />
        </Link>
        <h2 className="flex-auto text-mxl font-bold leading-none">
          Sửa thông tin quán karaoke
        </h2>
      </div>
      <ValidatorForm
        onSubmit={handleConfirm}
        className="block w-full space-y-2"
      >
        <div className="grid grid-cols-1 laptop:grid-cols-2 gap-2">
          <div className="space-y-2">
            <Input
              placeholder="Nhập tên cơ sở"
              label="Tên cơ sở"
              name="name"
              initValue={karaoke?.name}
              onChange={name => {
                setFormField(state => ({ ...state, name }));
              }}
              validates={{
                required: {
                  errorMessage: "Vui lòng nhập tên cơ sở",
                },
              }}
            />
            <Input
              placeholder="Nhập số điện thoại"
              disabled
              label="Số điện thoại"
              name="phoneNumber"
              initValue={karaoke?.phoneNumber}
              onChange={phoneNumber => {
                setFormField(state => ({ ...state, phoneNumber }));
              }}
              validates={{
                required: {
                  errorMessage: "Vui lòng nhập số điện thoại",
                },
                matchRegexp: {
                  regexp:
                    "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
                  errorMessage: "Số điện thoại không hợp lệ",
                },
              }}
            />
            <Input
              placeholder="Nhập email"
              label="Email"
              type="text"
              name="email"
              initValue={karaoke?.email}
              onChange={email => {
                setFormField(state => ({ ...state, email }));
              }}
              validates={{
                isEmail: {
                  errorMessage: "Email không hợp lệ",
                },
              }}
            />
            <TextArea
              className="mt-2"
              label="Mô tả cơ sở"
              initValue={karaoke?.description}
              placeholder="Nhập mô tả cơ sở"
              onChange={description => {
                setFormField(state => ({ ...state, description }));
              }}
            />
            <div className="space-y-2">
              <SingleImageUploader
                label="Logo"
                image={karaoke?.logo?.small || karaoke?.logo?.default}
                onChange={logo => {
                  setFormField(state => ({ ...state, logo }));
                }}
                required
                errorMessage="Vui lòng tải lên logo"
              />
            </div>

            <MultipleImagesUploader
              title="Giấy phép đăng ký kinh doanh (Tối đa 3 ảnh)"
              aspect={ASPECT_RATIO_LICENSE}
              maxNumberImage={3}
              onUpdateChange={images => {
                setUpdateLicenseImages(images);
              }}
              isEdit
              imageCrop={false}
              images={karaoke?.licenseImages}
            />
          </div>
          <div className="space-y-2">
            <Select
              label="Tỉnh / thành phố"
              value={provinceSelected?.name}
              onSelectOption={handleSelectProvince}
              options={provinces}
              floatTitle={false}
              required
              errorMessage="Vui lòng chọn tỉnh/ thành phố"
            />
            <Select
              label="Quận / Huyện"
              value={districtSelected?.name}
              onSelectOption={handleSelectDistrict}
              options={districts}
              disabled={!provinceSelected}
              floatTitle={false}
              required
              errorMessage="Vui lòng chọn quận/ huyện"
            />
            <Select
              label="Phường / xã"
              value={wardSelected?.name}
              onSelectOption={handleSelectWard}
              options={wards}
              disabled={!districtSelected}
              floatTitle={false}
              required
              errorMessage="Vui lòng chọn phường/ xã"
            />
            <Input
              placeholder="Nhập dịa chỉ chi tiết"
              label="Địa chỉ chi tiết"
              type="text"
              name="street"
              initValue={streetName}
              onChange={street => {
                setStreetName(street);
              }}
            />
            <LocationMap
              field={fieldRef}
              location={locationRef}
              centerCoordinates={karaoke?.location?.coordinates}
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button
            primary
            className="min-w-17"
            innerClassName="p-1 h-4.5"
            type="submit"
          >
            <span className="normal-case">Lưu</span>
          </Button>
        </div>
      </ValidatorForm>
    </div>
  );
};

export default withRouter(KaraokeDetail);
