import React from "react";

import InfoDialog from "components/InfoDialog";
import { IBooking } from "common/typings";
import PersonalInformation from "./component/PersonalInformation";
import BookingInformation from "./component/BookingInformation";
import PaymentInformation from "./component/PaymentInformation";

interface IBillDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: IBooking;
}

const BillDialog: React.FC<IBillDialogProps> = props => {
  const { ButtonMenu, editField = {} } = props;
  return (
    <InfoDialog ButtonMenu={ButtonMenu} size="md">
      <>
        <div className="mb-4 grid grid-cols-1 gap-2 laptop:grid-cols-2 leading-none">
          <div>
            <PersonalInformation editField={editField} />
          </div>
          <div>
            <BookingInformation editField={editField} />
          </div>
        </div>
        <PaymentInformation editField={editField} />
      </>
    </InfoDialog>
  );
};

export default BillDialog;
