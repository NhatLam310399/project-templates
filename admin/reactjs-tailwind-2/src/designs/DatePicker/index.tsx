import React, { useState, useEffect } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { FormControl, FormHelperText, ThemeProvider } from "@material-ui/core";
import { randomId } from "common/functions";
import { t } from "language";
import { TextValidator } from "react-material-ui-form-validator";
import { defaultMaterialTheme } from "common/styles/muiTheme";
import SVG from "designs/SVG";
import { useStyles } from "./styles";
import { IDatePickerProps } from "./interfaces";

const DatePicker: React.FC<IDatePickerProps> = props => {
    const {
        label = "",
        value = null,
        onChange,
        className = "",
        disableFuture,
        required = false,
        placeholder = "",
        errorMessage = t("common.select-required"),
    } = props;
    const [selectedDate, setSelectedDate] = useState<Date | null | undefined>(
        null,
    );
    const [id, setId] = useState<string>(randomId());
    const [isError, setIsError] = useState(false);
    const classes = useStyles();
    const validators = required ? ["required"] : [];
    useEffect(() => {
        if (value) {
            setSelectedDate(value);
        } else {
            setSelectedDate(null);
        }
    }, [value]);

    const handleDateChange = (newDate: Date | null | undefined) => {
        setSelectedDate(newDate);
        onChange && onChange(newDate);
    };

    const handleValidate = (isValid: boolean) => {
        if (isValid) {
            isError && setIsError(false);
        } else {
            !isError && setIsError(true);
        }
    };

    return (
        <div className={`date-picker-wrapper ${className}`}>
            <span className="flex font-medium text-lg mb-0.5">
                {label}
                <p className={`text-error ${required ? "" : "hidden"}`}>*</p>
            </span>
            <FormControl className="w-full">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider theme={defaultMaterialTheme}>
                        <KeyboardDatePicker
                            placeholder={placeholder}
                            className={`w-full bg-white mt-0 mb-0 ${classes.root}`}
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id={id}
                            value={selectedDate}
                            onChange={handleDateChange}
                            disableFuture={disableFuture}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                            inputProps={{}}
                            error={isError}
                            keyboardIcon={<SVG name="common/calendar" />}
                        />
                    </ThemeProvider>
                </MuiPickersUtilsProvider>
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
                    value={selectedDate && String(selectedDate)}
                    name={id}
                    validators={validators}
                    errorMessages={[errorMessage]}
                    className={`${classes.inputFieldHidden} -z-1`}
                    validatorListener={handleValidate}
                />
            )}
        </div>
    );
};

export default DatePicker;
