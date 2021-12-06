import React, { useState } from "react";
import { IBooking } from "common/typings";

interface IPersonalInformationProps {
  editField?: IBooking;
}

const PersonalInformation: React.FC<IPersonalInformationProps> = props => {
  const { editField = {} } = props;
  const { name, email, phoneNumber } = editField || {};
  return (
    <>
      <h3 className="mb-3 text-xl font-bold text-black">Thông tin cá nhân</h3>
      <p className="mb-2 text-lg text-black">
        Họ và tên:<span className="ml-1 font-bold">{name}</span>
      </p>
      <p className="mb-2 text-lg text-black">
        Số điên thoại:<span className="ml-1 font-bold">{phoneNumber}</span>
      </p>
      {email && (
        <p className="mb-2 text-lg text-black">
          Email:<span className="ml-1 font-bold break-all">{email}</span>
        </p>
      )}
    </>
  );
};

export default PersonalInformation;
