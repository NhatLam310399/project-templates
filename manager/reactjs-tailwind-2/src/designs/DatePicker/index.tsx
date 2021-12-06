import { useState, useEffect } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import { randomId } from "common/functions";

import { ReactComponent as DatePickerIcon } from "assets/svg/common/date-picker.svg";
import { useFormStyles } from "common/styles/muiStyles/useStyles";
import ErrorMessage from "components/ErrorMessage";
import { IDatePickerProps } from "./interfaces";

const DatePicker: React.FC<IDatePickerProps> = props => {
  const {
    label = "",
    placeholder = "dd/mm/yyyy",
    date = null,
    onChange,
    className = "",
    dateRef,
    required = false,
    errorMessage = "Vui lòng chọn ngày sinh",
    disable = false,
    useFloatTitle = false,
    maxDateMessage = "",
    minDateMessage = "",
    disableFuture,
    disablePast,
    minDate = null,
    maxDate = null,
  } = props;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [id, setId] = useState<string>(randomId());
  const [isError, setIsError] = useState(false);
  const classes = useFormStyles({ showLabel: useFloatTitle });

  const validators = required ? ["required"] : [];

  const handleDateChange = (dateValue: Date | null) => {
    setSelectedDate(dateValue);
    onChange && onChange(dateValue);
    if (dateRef) dateRef.current = dateValue;
  };

  const handleValidate = (isValid: boolean) => {
    if (isValid) {
      isError && setIsError(false);
    } else {
      !isError && setIsError(true);
    }
  };
  return (
    <div className={`date-picker-wrapper w-full ${className} ${classes.root}`}>
      {!useFloatTitle && label && (
        <p className="mb-0.5 text-lg font-medium">
          {label}
          <span className="text-error">{required && "*"}</span>
        </p>
      )}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className="w-full bg-white mt-0 mb-0"
          id={id}
          value={date || selectedDate}
          placeholder={placeholder}
          onChange={handleDateChange}
          disabled={disable}
          error={isError}
          label={useFloatTitle ? placeholder : undefined}
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
          keyboardIcon={<DatePickerIcon />}
        />
      </MuiPickersUtilsProvider>
      {required && (
        <TextValidator
          value={date || selectedDate}
          name={id}
          validators={validators}
          errorMessages={[errorMessage]}
          className={`${classes.inputFieldHidden}`}
          validatorListener={handleValidate}
          FormHelperTextProps={{ component: ErrorMessage }}
        />
      )}
    </div>
  );
};

export default DatePicker;
