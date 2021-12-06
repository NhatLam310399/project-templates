import { useEffect, useState } from "react";
import { EditFileNameContainer, InputName, FileName, EditIcon } from "./styles";
import SVG from "designs/SVG";
import { IFile } from "typings";

interface IEditFileNameProps {
  file: IFile | null;
}

const EditFileName: React.FC<IEditFileNameProps> = props => {
  const { file } = props;
  const [edit, setEdit] = useState(true);
  const [value, setValue] = useState<string>(file?.name || "");
  useEffect(() => {
    if (file) {
      setValue(file?.name || "");
    }
  }, [file]);
  const handleChange = (e: any) => {
    const valueInput = e.target.value;
    setValue(valueInput);
  };
  const handleSubmit = (e: any) => {
    console.log("Submit", value);
    setEdit(true);
    e.preventDefault();
  };
  return (
    <EditFileNameContainer>
      <FileName onSubmit={handleSubmit}>
        <InputName
          autoFocus
          onChange={handleChange}
          edit={edit}
          disabled={edit}
          value={value}
        />
        <EditIcon onClick={() => setEdit(false)}>
          <SVG name="fileLibrary/edit-file-name" />
        </EditIcon>
      </FileName>
    </EditFileNameContainer>
  );
};

export default EditFileName;
