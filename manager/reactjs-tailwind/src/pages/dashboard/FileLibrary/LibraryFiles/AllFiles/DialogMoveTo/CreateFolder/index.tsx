import { Formik } from "formik";
import { useEffect, useState } from "react";

import {
  CreateFolderContainer,
  Button,
  ButtonWrapper,
  Form,
  InputWrapper,
} from "./styles";
import Input from "designs/Input";
import SVG from "designs/SVG";

interface ICreateFolderProps {
  onClose: () => void;
}
interface IFormValue {
  name?: string;
}
const CreateFolder: React.FC<ICreateFolderProps> = props => {
  const { onClose } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [initialValue, setInitialValue] = useState<IFormValue>({
    name: "",
  });

  const handleSubmit = (values: IFormValue) => {
    //submit
    onClose && onClose();
  };
  const handleCancel = () => {
    onClose && onClose();
  };
  return (
    <CreateFolderContainer>
      <Formik initialValues={initialValue} onSubmit={handleSubmit}>
        <Form id="create" method="post">
          <InputWrapper>
            <SVG
              name="fileLibrary/folder-icon"
              width="24px"
              height="24px"
              className="w-3.5 h-3.5"
            />
            <Input name="name" label="" placeholder="Enter your folder name" />
          </InputWrapper>

          <ButtonWrapper>
            <Button size="md" variant="primary" type="submit">
              Confirm
            </Button>
            <Button onClick={handleCancel} size="md" variant="secondary">
              Cancel
            </Button>
          </ButtonWrapper>
        </Form>
      </Formik>
    </CreateFolderContainer>
  );
};

export default CreateFolder;
