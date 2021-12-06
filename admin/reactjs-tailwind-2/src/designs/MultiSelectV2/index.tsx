import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { TextValidator } from "react-material-ui-form-validator";
import { randomId } from "common/functions";
import { FormHelperText, InputLabel } from "@material-ui/core";
import { IMultiSelectInputProps } from "./interfaces";
import { useStyles } from "./styles";

const MultiSelect: React.FC<IMultiSelectInputProps> = props => {
    let {
        label,
        initValue = [],
        className = "",
        options = [],
        required = false,
        onSelectOption,
        disabled,
        errorMessage = "",
    } = props;
    const validators = required ? ["required"] : [];

    const classes = useStyles();
    const [id, setId] = useState<string>(randomId());
    const [isError, setIsError] = useState(false);
    const [values, setValues] = useState<string[]>([]);
    useEffect(() => {
        if (initValue?.length > 0) {
            const newList = initValue?.map(value => value.name);
            setValues(newList);
        } else {
            setValues([]);
        }
    }, []);

    const handleValidate = (isValid: boolean) => {
        if (isValid) {
            isError && setIsError(false);
        } else {
            !isError && setIsError(true);
        }
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValues(event.target.value as string[]);
    };

    const handleClose = () => {
        if (options.length === 0) return;
        if (values.length === 0) {
            onSelectOption([]);
            return;
        }
        let newList: any[] = [];
        options?.map(option => {
            values?.map(value => {
                if (value === option?.name) {
                    newList.push(option);
                }
            });
        });
        onSelectOption(newList);
    };
    const renderOption = () => {
        return (
            <div className="flex flex-wrap items-center gap-1 flex-start">
                {values?.map((value, index: number) => {
                    return (
                        <div className="py-0.5 relative px-1  duration-300 rounded-md bg-pink gap-1 items-center justify-center text-white text-lg font-medium flex">
                            {value}
                        </div>
                    );
                })}
            </div>
        );
    };
    return (
        <div className={` w-full  ${className} ${classes.root}`}>
            <span className="text-lg font-medium flex mb-0.5">
                {label}&nbsp;
                <p className={`text-error ${required ? "" : "hidden"}`}>*</p>
            </span>
            <FormControl
                variant="outlined"
                className="w-full"
                error={isError}
                disabled={disabled}
            >
                <Select
                    id="demo-mutiple-chip"
                    className="w-full bg-white"
                    value={values}
                    error={isError}
                    multiple
                    onChange={handleChange}
                    onClose={handleClose}
                    renderValue={renderOption}
                >
                    {options?.length > 0 &&
                        options?.map((option, index) => {
                            return (
                                <MenuItem
                                    value={option?.name}
                                    key={String(index)}
                                >
                                    {option?.name}
                                </MenuItem>
                            );
                        })}
                </Select>
                {isError && <FormHelperText>{errorMessage}</FormHelperText>}
            </FormControl>
            {required && (
                <TextValidator
                    value={values.length > 0 ? "values" : null}
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

export default MultiSelect;
