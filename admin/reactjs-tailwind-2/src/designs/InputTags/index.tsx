import React, { useState, useEffect } from "react";
import TagsInput, { RenderTagProps } from "react-tagsinput";
import { FormControl, FormHelperText } from "@material-ui/core";
import { TextValidator } from "react-material-ui-form-validator";
import { randomId } from "common/functions";
import { t } from "language";
import * as Icons from "designs/Icons";

interface IInputTags {
    label: string;
    value?: string[];
    className?: string;
    onChange?: (value: string[]) => void;
    disabled?: boolean;
    required?: boolean;
    errorMessage?: string;
}

const InputTags: React.FC<IInputTags> = props => {
    const {
        label,
        value = [],
        className = "",
        onChange,
        disabled = false,
        required = false,
        errorMessage = t("common.select-required"),
    } = props;
    const validators = required ? ["required"] : [];

    const [id, setId] = useState<string>(randomId());
    const [isError, setIsError] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    useEffect(() => {
        if (value) {
            setTags(value);
        }
    }, [value]);

    const handleChangeTags = (tagsValue: string[]) => {
        setTags(tagsValue);
        onChange?.(tagsValue);
    };

    const handleValidate = (isValid: boolean) => {
        if (isValid) {
            isError && setIsError(false);
        } else {
            !isError && setIsError(true);
        }
    };

    const labelFormat = required ? (
        <>
            {label}
            <span className="text-error">*</span>
        </>
    ) : (
        label
    );

    const renderLayout = (
        tagComponents: React.ReactElement[],
        inputComponent: React.ReactElement,
    ) => {
        return (
            <div className="flex flex-wrap gap-1">
                {tagComponents}
                {inputComponent}
            </div>
        );
    };

    const renderTag = (propsTag: RenderTagProps<any>) => {
        const {
            tag,
            key,
            disabled: disabledTag,
            onRemove,
            classNameRemove,
            getTagDisplayValue,
            ...other
        } = propsTag;
        return (
            <span key={key} {...other}>
                <span className="flex items-center gap-1">
                    {getTagDisplayValue(tag)}
                    {!disabledTag && (
                        <button
                            type="button"
                            className={classNameRemove}
                            onClick={e => onRemove(key)}
                        >
                            <Icons.Remove className="transform hover:scale-125" />
                        </button>
                    )}
                </span>
            </span>
        );
    };

    return (
        <div className={`tags-input-wrapper ${className}`}>
            <FormControl
                variant="outlined"
                className="w-full"
                error={isError}
                disabled={disabled}
            >
                <TagsInput
                    value={tags}
                    onChange={handleChangeTags}
                    inputProps={{ placeholder: labelFormat }}
                    renderLayout={renderLayout}
                    renderTag={renderTag}
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
            {required && (
                <TextValidator
                    value={tags.length > 0 && tags.toString()}
                    name={id}
                    validators={validators}
                    errorMessages={[errorMessage]}
                    className="hidden"
                    validatorListener={handleValidate}
                />
            )}
        </div>
    );
};

export default InputTags;
