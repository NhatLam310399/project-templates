import React, { useState, useEffect } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { FormControl } from "@material-ui/core";
import { randomId } from "common/functions";
import ErrorMessage from "components/ErrorMessage";
import { TextValidator } from "react-material-ui-form-validator";
import { useFormStyles } from "common/styles/muiStyles/useStyles";
import { IDatePickerProps } from "./interfaces";

const DatePicker: React.FC<IDatePickerProps> = props => {
  const {
    label = "",
    date = null,
    onChange,
    className = "",
    dateRef,
    required = false,
    disablePast,
    maxDateMessage = "",
    minDateMessage = "",
    disable = false,
    disableFuture,
    minDate,
    maxDate,
    placeholder,
    errorMessage = "Vui lòng chọn ngày sinh",
    floatTitle = true,
  } = props;
  const validators = required ? ["required"] : [];
  const classes = useFormStyles({ showLabel: floatTitle });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [id, setId] = useState<string>(randomId());
  const [isError, setIsError] = useState(false);

  const handleValidate = (isValid: boolean) => {
    if (isValid) {
      isError && setIsError(false);
    } else {
      !isError && setIsError(true);
    }
  };

  const handleDateChange = (dateResponse: Date | null) => {
    setSelectedDate(dateResponse);
    onChange && onChange(dateResponse);
    if (dateRef) dateRef.current = dateResponse;
  };

  const labelElement = (
    <p>
      {label}
      {required && <span className="text-error">*</span>}
    </p>
  );

  return (
    <div className={`date-picker-wrapper ${className}`}>
      {!floatTitle && (
        <div className="text-lg font-medium leading-none mb-1">
          {labelElement}
        </div>
      )}
      <FormControl className="w-full">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={`w-full bg-white mt-0 mb-0 ${classes.root}`}
            id={id}
            placeholder={placeholder}
            value={selectedDate || date}
            onChange={handleDateChange}
            disabled={disable}
            error={isError}
            label={floatTitle ? placeholder : undefined}
            minDate={minDate}
            maxDate={maxDate}
            maxDateMessage={maxDateMessage}
            minDateMessage={minDateMessage}
            inputVariant="outlined"
            orientation="landscape"
            format="dd/MM/yyyy"
            disableFuture={disableFuture}
            disablePast={disablePast}
            invalidDateMessage="Định dạng ngày không hợp lệ"
            FormHelperTextProps={{ component: ErrorMessage } as any}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
      {required && (
        <TextValidator
          value={selectedDate || date || undefined}
          name={id}
          validators={validators}
          errorMessages={[errorMessage]}
          validatorListener={handleValidate}
          className={classes.inputFieldHidden}
          FormHelperTextProps={{ component: ErrorMessage }}
        />
      )}
    </div>
  );
};

export default DatePicker;
