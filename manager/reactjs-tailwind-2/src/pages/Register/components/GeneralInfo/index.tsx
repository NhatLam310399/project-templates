import { MutableRefObject, useState } from "react";

import SingleImageUploader from "components/SingleImageUploader";
import MultipleImagesUploader from "components/MultipleImagesUploader";

import { IBase64File, IPlaceCreateInput } from "common/typings";

import { PHONE_VALIDATE_REGEXP } from "constants/regexp";
import { BUSINESS_TYPES, IBusinessType } from "constants/types";

import Input from "designs/Input";
import Select from "designs/Select";
import TextArea from "designs/TextArea";

import { IPreviewImage } from "pages/Register";

interface ICreateRequestProps {
  field: MutableRefObject<IPlaceCreateInput>;
  previewImages: MutableRefObject<IPreviewImage>;
  previewImage: MutableRefObject<IPreviewImage>;
}

const CreateRequest: React.FC<ICreateRequestProps> = props => {
  const { field, previewImages, previewImage } = props;
  const [businessTypeSelected, setBusinessTypeSelected] =
    useState<IBusinessType>();
  const [logo, setLogo] = useState<File>();

  const handleSelectBusinessType = (option: IBusinessType) => {
    setBusinessTypeSelected(option);
    field.current.type = option.type;
  };

  const handleUploadLogo = (file: File, base64Image: IBase64File) => {
    setLogo(file);
    field.current.logo = file;
    previewImages.current.logo = base64Image;
  };
  const handleUploadLicence = (files: File[], base64Images?: IBase64File[]) => {
    // setLicenseImages(files);
    field.current.licenseImages = files;
    previewImage.current.licenses = base64Images || [];
  };
  return (
    <>
      <p className="mb-3 text-xl font-bold leading-none">Thông tin chung</p>
      <div className="grid w-full h-full grid-cols-1 gap-2 phone:grid-cols-2">
        <Input
          label="Tên cơ sở"
          name="business-name"
          placeholder="Nhập tên cơ sở của bạn"
          initValue=""
          onChange={value => {
            field.current.name = value;
          }}
          validates={{
            required: {
              errorMessage: "Vui lòng nhập tên cơ sở của bạn",
            },
          }}
        />
        <Select
          title="Loại hình cơ sở"
          placeholder="Chọn loại hình cơ sở"
          options={BUSINESS_TYPES}
          value={businessTypeSelected?.name}
          onSelectOption={handleSelectBusinessType as any}
          required
          errorMessage="Vui lòng chọn loại hình cơ sở"
        />
        <Input
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          type="number"
          name="phoneNumber"
          initValue=""
          onChange={value => {
            field.current.phoneNumber = value;
          }}
          validates={{
            required: {
              errorMessage: "Vui lòng cung cấp số điện thoại",
            },
            matchRegexp: {
              regexp: PHONE_VALIDATE_REGEXP,
              errorMessage: "Số điện thoại không hợp lệ",
            },
          }}
        />
        <Input
          label="Email"
          placeholder="Nhập email"
          type="text"
          name="email"
          initValue=""
          onChange={value => {
            field.current.email = value;
          }}
          validates={{
            isEmail: {
              errorMessage: "Email này không hợp lệ",
            },
          }}
        />
        <SingleImageUploader
          label="Logo"
          onChange={handleUploadLogo}
          imageCrop={false}
          required
          errorMessage="Vui lòng upload Logo của bạn"
        />
        <MultipleImagesUploader
          label="Giấy phép kinh doanh (tối đa 3 ảnh)"
          onCreateChange={handleUploadLicence}
          maxNumberImage={3}
          errorMessage="Vui lòng tải ảnh giấp phép kinh doanh của bạn lên"
          className="col-span-1"
        />
        <TextArea
          label="Mô tả công ty"
          placeholder="Nhập mô tả công ty"
          initValue=""
          onChange={value => {
            field.current.introduce = value;
          }}
        />
      </div>
    </>
  );
};

export default CreateRequest;
