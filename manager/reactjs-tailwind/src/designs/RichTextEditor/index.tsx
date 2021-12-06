import FormControlErrorHelper from "common/styles/FormControlErrorHelper";
import FormControlLabel from "common/styles/FormControlLabel";
import HiddenInput from "common/styles/HiddenInput";
import { useField, useFormikContext } from "formik";
import React, { useEffect, useState, useCallback, memo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextEditorContainer } from "./styles";

const Size = Quill.import("attributors/style/size");
const sizes = ["14px", "16px", "18px", "20px", "24px", "30px"];

Quill.register(Size, true);

const modules = {
  toolbar: [
    [{ size: sizes }],
    ["bold", "italic", "underline"],
    [{ align: "" }, { align: "center" }, { align: "right" }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
  ],
};

interface IRichEditorProps {
  name: string;
  className?: string;
  label?: string;
  defaultValue?: string;
  /**
   * @Note Be careful when use this callback.
   * I prefer you use useRef to up date the value
   * */
  onChange?: (value: string) => void;
  required?: boolean;
}

const RichTextEditor: React.FC<IRichEditorProps> = props => {
  const {
    name,
    label = "",
    className = "",
    defaultValue = "",
    required = false,
    onChange,
  } = props;
  const [htmlEditor, setHtmlEditor] = useState<string>("");
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const isError = Boolean(!!meta.error && !!meta.touched);

  useEffect(() => {
    setHtmlEditor(defaultValue);
  }, [defaultValue]);

  const handlerChange = useCallback((value: string) => {
    setHtmlEditor(value);
    onChange && onChange(value);
    setFieldValue(name, value);
  }, []);

  return (
    <TextEditorContainer sizes={sizes} className={className}>
      <FormControlLabel isError={isError} required={required}>
        {label}
      </FormControlLabel>
      <ReactQuill
        modules={modules}
        value={htmlEditor}
        onChange={handlerChange}
      />
      {isError && <FormControlErrorHelper>{meta.error}</FormControlErrorHelper>}
      <HiddenInput {...field} />
    </TextEditorContainer>
  );
};

export default memo(RichTextEditor);
