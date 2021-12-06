import React from "react";

import { ITrade } from "common/typings";
import { renderLocation, renderMoneyValue } from "common/functions";

import InfoDialog from "components/InfoDialog";

interface IDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: ITrade;
}

const ProductListDialog: React.FC<IDialogProps> = props => {
  const { ButtonMenu, editField } = props;
  const {
    images = [],
    name,
    type,
    price = 0,
    description,
    province,
    company,
  } = editField || {};

  const imgSrc = images?.[0]?.small || images?.[0]?.default;

  const {
    province: compProvince,
    district: compDistrict,
    ward: compWard,
    street,
  } = company || {};
  const locationValue = compProvince?.name
    ? renderLocation([
        street,
        compWard?.name,
        compDistrict?.name,
        compProvince?.name,
      ])
    : renderLocation([province?.name]);
  return (
    <InfoDialog ButtonMenu={ButtonMenu} size="lg">
      <div className="flex flex-wrap laptop:flex-nowrap gap-3">
        {imgSrc && (
          <div className="flex-none max-w-full">
            <img
              src={imgSrc}
              alt={name}
              className="block w-full laptop:max-w-55 m-auto object-cover rounded laptop:h-50"
            />
          </div>
        )}
        <div className="flex-auto text-black leading-none text-lg break-words">
          <p className="mb-1 font-medium text-body">{type?.name}</p>
          <h4 className="mb-2 font-bold text-mxl laptop:text-3xl">{name}</h4>
          <p className="mb-2 font-medium text-xl laptop:text-mxl">
            {renderMoneyValue(price)}
          </p>
          {description && (
            <div>
              <p className="mb-1 font-medium">Mô tả:</p>
              <div className="mb-2 font-normal leading-5">{description}</div>
            </div>
          )}
          {company && (
            <p className="mb-2 font-medium">
              Công ty uy tín: <span className="font-bold">{company?.name}</span>
            </p>
          )}
          <p className="font-medium">
            Gửi từ: <span className="font-bold">{locationValue}</span>
          </p>
        </div>
      </div>
    </InfoDialog>
  );
};

export default ProductListDialog;
