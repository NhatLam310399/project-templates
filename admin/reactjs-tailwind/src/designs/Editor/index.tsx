import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormControl } from "@material-ui/core";
import { TextValidator } from "react-material-ui-form-validator";
import ErrorMessage from "components/ErrorMessage";

import { useFormStyles } from "common/styles/muiStyles/useStyles";
import { randomId } from "common/functions";
import { IEditorProps } from "./interface";

const FontAttributor = Quill.import("attributors/class/font");
const fonts = ["SVN-Gilroy"];
const fontNames = fonts.map(font => font.toLowerCase().replace(/\s/g, "-"));
FontAttributor.whitelist = fontNames;
Quill.register(FontAttributor, true);

const Size = Quill.import("attributors/style/size");
const sizes = ["13px", "16px", "18px", "22px"];
Size.whitelist = sizes;
Quill.register(Size, true);

const modules = {
  toolbar: [
    [{ font: FontAttributor.whitelist }],
    [{ size: ["13px", "16px", "18px", "22px"] }],
    ["bold", "italic", "underline", "link", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: "" }, { align: "center" }, { align: "right" }],
  ],
};

const Editor: React.FC<IEditorProps> = props => {
  const {
    initValue = "",
    onChange,
    className = "",
    errorMessage = "",
    required = false,
    label = "",
  } = props;
  const validators = required ? ["required"] : [];
  const classes = useFormStyles({});

  const [htmlEditor, setHtmlEditor] = useState<string>("");
  const [isError, setIsError] = useState(false);

  const [id, setId] = useState<string>(randomId());

  useEffect(() => {
    if (initValue) {
      setHtmlEditor(initValue);
    } else {
      setHtmlEditor("");
    }
  }, [initValue]);
  const handlerChange = (values: string) => {
    setHtmlEditor(values);
    onChange(values);
  };
  const handleValidate = (isValid: boolean) => {
    if (isValid) {
      isError && setIsError(false);
    } else {
      !isError && setIsError(true);
    }
  };

  return (
    <div className={`quill-wrap ${className}`}>
      {label && (
        <div className="text-lg font-medium leading-none mb-0.5">
          {label}
          {required && <span className="text-error">*</span>}
        </div>
      )}
      <FormControl
        variant="outlined"
        className="w-full quill-wrap "
        error={isError}
      >
        <ReactQuill
          modules={modules}
          value={htmlEditor}
          onChange={handlerChange}
          className={classes.quill}
        />

        {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormControl>
      {required && (
        <TextValidator
          value={htmlEditor || initValue}
          name={id}
          validators={[validators]}
          errorMessages={[errorMessage]}
          className={`${classes.inputFieldHidden} -z-1`}
          validatorListener={handleValidate}
        />
      )}
    </div>
  );
};

export default Editor;
