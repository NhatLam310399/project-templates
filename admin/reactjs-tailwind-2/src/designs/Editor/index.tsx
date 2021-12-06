import { FormControl, FormHelperText } from "@material-ui/core";
import { randomId } from "common/functions";
import React, { useEffect, useState } from "react";
import { TextValidator } from "react-material-ui-form-validator";
import ReactQuill, { Quill } from "react-quill";
import { t } from "language";
import "react-quill/dist/quill.snow.css";

const FontAttributor = Quill.import("attributors/class/font");
const fonts = ["SF Pro Text"];
const fontNames = fonts.map(font => font.toLowerCase().replace(/\s/g, "-"));
FontAttributor.whitelist = fontNames;
Quill.register(FontAttributor, true);

const Size = Quill.import("attributors/style/size");
const sizes = ["14px", "16px", "18px", "22px"];
Size.whitelist = sizes;
Quill.register(Size, true);

const modules = {
    toolbar: [
        ["bold", "italic", "underline"],
        [{ align: "" }, { align: "center" }, { align: "right" }],
        [{ list: "ordered" }],
        ["link", "image"],
        [{ size: ["14px", "16px", "18px", "22px"] }],
    ],
};

interface IEditorProps {
    initValue?: string;
    className?: string;
    label?: string;
    name?: string;
    onChange: (text: string, name: string) => void;
    disabled?: boolean;
    required?: boolean;
    errorMessage?: string;
}

const Editor: React.FC<IEditorProps> = props => {
    const {
        initValue = "",
        onChange,
        className = "",
        label,
        name = "",
        disabled = false,
        required = false,
        errorMessage = t("common.select-required"),
    } = props;
    const validators = required ? ["required"] : [];

    const [htmlEditor, setHtmlEditor] = useState<string>("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (initValue) {
            setHtmlEditor(initValue);
        } else {
            setHtmlEditor("");
        }
    }, [initValue]);

    const handlerChange = (value: string) => {
        setHtmlEditor(value);
        onChange(value, name);
    };

    const id = randomId();
    const handleValidate = (isValid: boolean) => {
        if (isValid) {
            isError && setIsError(false);
        } else {
            !isError && setIsError(true);
        }
    };

    return (
        <>
            <div className={`quill-wrap ${className}`}>
                <FormControl
                    variant="outlined"
                    className="w-full"
                    error={isError}
                    disabled={disabled}
                >
                    <span className="font-medium text-lg block mb-0.5">
                        {label}
                    </span>
                    <ReactQuill
                        modules={modules}
                        value={htmlEditor}
                        onChange={handlerChange}
                    />
                    {isError && (
                        <FormHelperText
                            className="font-sfpro"
                            error
                            variant="outlined"
                        >
                            {errorMessage}
                        </FormHelperText>
                    )}
                </FormControl>
            </div>
            {required && (
                <TextValidator
                    value={htmlEditor}
                    name={id}
                    className="hidden"
                    errorMessages={[errorMessage]}
                    validators={validators}
                    validatorListener={handleValidate}
                />
            )}
        </>
    );
};

export default Editor;
