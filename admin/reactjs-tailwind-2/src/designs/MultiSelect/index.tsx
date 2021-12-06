/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import { FormHelperText } from "@material-ui/core";
import { randomId } from "common/functions";
import Option from "designs/OptionCheckbox";
import { t } from "language";
import React, { useEffect, useState } from "react";
import { TextValidator } from "react-material-ui-form-validator";
import Select, { components, ValueType } from "react-select";
import { selectStyles, theme } from "./styles";

export interface ISelectValue {
    value?: string;
    label?: string;
}

type IOption = Record<any, any>;

interface ISelect2 {
    label: string;
    value?: IOption[];
    options: IOption[];
    className?: string;
    onChange?: (value: ISelectValue[]) => void;
    required?: boolean;
    placeholder?: string;
    errorMessage?: string;
    maximumItems?: number;
}

const MultiSelect: React.FC<ISelect2> = props => {
    const {
        label,
        value = [],
        options = [],
        className = "",
        onChange,
        required = true,
        placeholder = "",
        maximumItems = 99999,
        errorMessage = t("common.select-required"),
    } = props;
    const validators = required ? ["required"] : [];

    const [id, setId] = useState<string>(randomId());
    const [isError, setIsError] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<ISelectValue[]>([]);
    const [optionList, setOptionList] = useState<ISelectValue[]>([]);

    useEffect(() => {
        if (value.length > 0) {
            const defaultSelected: ISelectValue[] = value.map(item => ({
                label: item?.name || item?.title,
                value: item?._id,
            }));
            setSelectedOptions(defaultSelected);
        }
    }, [value]);

    useEffect(() => {
        if (options.length > 0) {
            const defaultOptionList: ISelectValue[] = options.map(item => ({
                label: item?.name || item?.title,
                value: item?._id,
            }));
            setOptionList(defaultOptionList);
        }
    }, [options]);

    const handleChangeSelect = (
        optionValues: ValueType<ISelectValue, true>,
    ) => {
        const newOptionList = optionValues as ISelectValue[];
        if (newOptionList.length > maximumItems) {
            return;
        }
        setSelectedOptions(newOptionList);
        onChange?.(newOptionList);
    };

    const handleValidate = (isValid: boolean) => {
        if (isValid) {
            isError && setIsError(false);
        } else {
            !isError && setIsError(true);
        }
    };

    return (
        <div className={`tags-input-wrapper ${className}`}>
            <div className="w-full">
                <div className="text-lg font-medium flex mb-0.5">
                    {label}&nbsp;
                    <p className={`text-error ${required ? "" : "hidden"}`}>
                        *
                    </p>
                </div>
                <Select
                    closeMenuOnSelect={false}
                    backspaceRemovesValue={false}
                    // hideSelectedOptions={false}
                    components={{
                        IndicatorSeparator: null,
                        ClearIndicator: null,
                    }}
                    styles={selectStyles}
                    name="name"
                    theme={theme}
                    isMulti
                    options={options}
                    value={selectedOptions}
                    placeholder={placeholder}
                    onChange={handleChangeSelect}
                />
            </div>
            {isError && (
                <FormHelperText error variant="standard">
                    {errorMessage}
                </FormHelperText>
            )}
            {required && (
                <TextValidator
                    value={
                        selectedOptions.length > 0
                            ? selectedOptions.toString()
                            : ""
                    }
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

export default MultiSelect;
