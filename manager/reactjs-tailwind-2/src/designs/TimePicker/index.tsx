import { useState, useEffect } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { FormControl } from "@material-ui/core";
import { randomId } from "common/functions";

import { TextValidator } from "react-material-ui-form-validator";
import { useFormStyles } from "common/styles/muiStyles/useStyles";
import ErrorMessage from "components/ErrorMessage";
import { ITimePickerProps } from "./interfaces";

const TimePicker: React.FC<ITimePickerProps> = props => {
  let {
    label = "",
    title = "",
    time = null,
    onChange,
    className = "",
    timeRef,
    required = false,
    useFloatTitle,
    disabled,
    errorMessage = "This field is required!",
  } = props;
  const [selectTime, setSelectedTime] = useState<Date | null>(null);
  const [id, setId] = useState<string>(randomId());
  const [isError, setIsError] = useState(false);
  const classes = useFormStyles({});

  if (required) label += "*";

  const handleValidate = (isValid: boolean) => {
    if (isValid) {
      isError && setIsError(false);
    } else {
      !isError && setIsError(true);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedTime(date);
    onChange && onChange(date);
    if (timeRef) timeRef.current = date;
  };

  return (
    <div className={`date-picker-wrapper ${className} ${classes.root}`}>
      {!useFloatTitle && (
        <p className="mb-0.5 text-lg font-medium">
          {title} <span className="text-red">{required && "*"}</span>
        </p>
      )}
      <FormControl className="w-full">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            className="w-full bg-white mt-0 mb-0"
            disableToolbar
            inputVariant="outlined"
            margin="normal"
            id={id}
            label={useFloatTitle ? label : undefined}
            disabled={disabled}
            value={time || selectTime}
            onChange={handleDateChange}
            invalidDateMessage="Định dạng ngày không hợp lệ"
            FormHelperTextProps={{ component: ErrorMessage } as any}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            error={isError}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
      {required && (
        <TextValidator
          value={time || selectTime}
          name={id}
          validators={[id]}
          errorMessages={[errorMessage]}
          className={`${classes.inputFieldHidden} -z-1`}
          validatorListener={handleValidate}
          FormHelperTextProps={{ component: ErrorMessage }}
        />
      )}
    </div>
  );
};

export default TimePicker;
