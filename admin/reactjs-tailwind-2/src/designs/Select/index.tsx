import { FormHelperText } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import SelectMaterial from "@material-ui/core/Select";
import { randomId } from "common/functions";
import Placeholder from "designs/Placeholder";
import SVG from "designs/SVG";
import { t } from "language";
import React, { useState } from "react";
import { TextValidator } from "react-material-ui-form-validator";
import { ISelectInputProps } from "./interface";
import { useStyles } from "./styles";

const Select: React.FC<ISelectInputProps> = props => {
    const {
        label = "",
        value = "",
        className = "",
        options = [],
        required = false,
        multiple = false,
        onSelectOption,
        disabled,
        errorMessage = t("common.select-required"),
        placeholder,
        isSelectImage,
    } = props;
    const validators = required ? ["required"] : [];

    const classes = useStyles();
    const [id, setId] = useState<string>(randomId());
    const [isError, setIsError] = useState(false);

    const handleValidate = (isValid: boolean) => {
        if (isValid) {
            isError && setIsError(false);
        } else {
            !isError && setIsError(true);
        }
    };

    return (
        <div className={`select-custom w-full  ${className} ${classes.root}`}>
            <FormControl
                variant="outlined"
                className="w-full"
                error={isError}
                disabled={disabled}
            >
                {label ? (
                    <span className="flex font-medium text-lg mb-0.5">
                        {label}&nbsp;
                        <p className={`text-error ${required ? "" : "hidden"}`}>
                            *
                        </p>{" "}
                    </span>
                ) : (
                    ""
                )}

                <SelectMaterial
                    className="w-full pr-2 bg-white"
                    labelId={id}
                    id="demo-simple-select-outlined"
                    IconComponent={() => <SVG name="common/expand" />}
                    value={value}
                    renderValue={
                        value !== ""
                            ? undefined
                            : () => <Placeholder>{placeholder}</Placeholder>
                    }
                    displayEmpty
                    label={label}
                    defaultValue={value}
                    multiple={multiple}
                    inputProps={{
                        name: id,
                        value,
                    }}
                    error={isError}
                >
                    {options.map((option, index) => {
                        const handleClick = () => {
                            onSelectOption && onSelectOption(option);
                        };
                        return isSelectImage ? (
                            <MenuItem
                                className={classes.selectItem}
                                value={
                                    option?.icon.small ||
                                    option?.icon.default ||
                                    option?.icon.medium
                                }
                                onClick={handleClick}
                                key={String(index)}
                            >
                                <img
                                    src={
                                        option?.icon.small ||
                                        option?.icon.default ||
                                        option?.icon.medium
                                    }
                                    alt=""
                                />
                            </MenuItem>
                        ) : (
                            <MenuItem
                                className={classes.selectItem}
                                value={option?.name}
                                onClick={handleClick}
                                key={String(index)}
                            >
                                {option?.name}
                            </MenuItem>
                        );
                    })}
                </SelectMaterial>
                {isError && (
                    <FormHelperText
                        className="text-sm font-sfpro"
                        error
                        variant="outlined"
                    >
                        {errorMessage}
                    </FormHelperText>
                )}
            </FormControl>
            {required && (
                <TextValidator
                    value={value}
                    name={id}
                    validators={validators}
                    errorMessages={[errorMessage]}
                    className={classes.inputFieldHidden}
                    validatorListener={handleValidate}
                />
            )}
        </div>
    );
};

export default Select;
