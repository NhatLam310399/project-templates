import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  IBasicDocumentType,
  IGetAllBasicDocument,
  IRootState,
  IUpdateBasicDocument,
} from "common/typings";

import Dialog, { DialogTitle } from "components/Dialog";
import Select from "designs/Select";

import * as services from "services/document";
import { updateBasicDocument } from "redux/actions/document";

interface IHotDocument {
  ButtonMenu: React.ReactElement;
}

const HotDocument: React.FC<IHotDocument> = props => {
  const { ButtonMenu } = props;
  const dispatch = useDispatch();

  const [document, setDocument] = useState<IBasicDocumentType | null>(null);
  const [documents, setDocuments] = useState<IBasicDocumentType[]>([]);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  useEffect(() => {
    getAllBasicDocumentAPI();
  }, []);

  useEffect(() => {
    if (actionSuccess) {
      getAllBasicDocumentAPI();
    }
  }, [actionSuccess]);

  const getAllBasicDocumentAPI = async () => {
    const result = await getAllBasicDocumentService();
    setDocuments(result);
  };
  const getAllBasicDocumentService = async () => {
    const payload: IGetAllBasicDocument = {
      filterBasicDocument: {
        highlight: false,
      },
    };
    const response = await services.getAllBasicDocument(payload);
    const { getAllBasicDocument: result } = response?.data || {};
    return result?.results;
  };

  const handleSubmit = () => {
    const payload: IUpdateBasicDocument = {
      id: document?._id || "",
      basicDocumentUpdateInput: {
        highlight: true,
      },
    };
    dispatch(updateBasicDocument(payload));
  };
  const handleChooseDocument = (option: IBasicDocumentType) => {
    setDocument(option);
  };
  const handleClose = () => {
    setDocument(null);
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleSubmit}
      onClose={handleClose}
      size="sm"
    >
      <DialogTitle className="col-span-1 mb-4 laptop:col-span-2">
        <span className="font-bold text-black normal-case text-xl laptop:text-mxl">
          Thêm tài liệu nổi bật
        </span>
      </DialogTitle>
      <Select
        floatTitle={false}
        className="mt-2"
        onSelectOption={handleChooseDocument}
        options={documents}
        value={document?.name}
        required
        errorMessage="Vui lòng chọn tài liệu"
        label="Tài liệu nổi bật"
        placeholder="Chọn tài liệu"
      />
    </Dialog>
  );
};

export default HotDocument;
