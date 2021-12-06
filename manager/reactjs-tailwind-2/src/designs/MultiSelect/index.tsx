import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import SelectMaterial from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { TextValidator } from "react-material-ui-form-validator";
import { randomId } from "common/functions";
import Chip from "@material-ui/core/Chip";
import { GlobalIcon } from "designs/icons/GlobalIcon";
import Checkbox from "designs/Checkbox";
import { useFormStyles } from "common/styles/muiStyles/useStyles";
import ErrorMessage from "components/ErrorMessage";
import { InputLabel } from "@material-ui/core";
import { IMultiSelectInputProps, IOption } from "./interfaces";

const MultiSelect: React.FC<IMultiSelectInputProps> = props => {
  const {
    title = "",
    initValue = [],
    className = "",
    placeholder = "",
    options = [],
    required = false,
    enableAll = false,
    useFloatTitle = false,
    onSelectOption,
    disabled,
    errorMessage = "This field is required!",
  } = props;
  const validators = required ? ["required"] : [];

  const classes = useFormStyles({ showLabel: useFloatTitle });

  const [id, setId] = useState<string>(randomId());
  const [isError, setIsError] = useState(false);
  const [valuesDisplay, setValuesDisplay] = useState<string[]>([]);

  useEffect(() => {
    if (initValue.length > 0) {
      const valuesDisplayList: string[] = initValue.map(item => item?._id);
      setValuesDisplay(valuesDisplayList);
    }
  }, []);

  const handleValidate = (isValid: boolean) => {
    if (isValid) {
      isError && setIsError(false);
    } else {
      !isError && setIsError(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    const newValueDisplay = event.target.value as string[];
    if (newValueDisplay[newValueDisplay.length - 1] === "all") {
      const allValues = options.map(option => option._id);
      setValuesDisplay(
        valuesDisplay.length === options.length ? [] : allValues,
      );
      return;
    }

    setValuesDisplay(newValueDisplay);
  };

  const handleDelete = (e: React.MouseEvent, index: number) => {
    const newValuesDisplay = valuesDisplay.filter(
      (_, indexItem) => indexItem !== index,
    );
    setValuesDisplay(newValuesDisplay);
  };

  const handleClose = () => {
    const newValueSelect = options.filter(item =>
      valuesDisplay.includes(item._id),
    );
    onSelectOption?.(newValueSelect);
  };

  return (
    <div
      className={`multiSelect-custom w-full min-h-5.5 ${className} ${classes.root}`}
    >
      <p className="mb-0.5 text-lg font-medium">
        {title}
        <span className="text-error">{required && "*"}</span>
      </p>
      <FormControl
        variant="outlined"
        className="w-full"
        error={isError}
        disabled={disabled}
      >
        <InputLabel id={id}>{placeholder || title}</InputLabel>
        <SelectMaterial
          className="w-full bg-white"
          labelId={id}
          id="demo-mutiple-checkbox"
          multiple
          value={valuesDisplay}
          label={useFloatTitle ? title : undefined}
          onChange={handleChange}
          onClose={handleClose}
          displayEmpty={false}
          inputProps={{
            name: id,
            value: valuesDisplay,
          }}
          error={isError}
          renderValue={() => (
            <div className="flex flex-wrap items-center gap-1 flex-start">
              {options.map((option, index: number) => {
                if (valuesDisplay.includes(option._id)) {
                  return (
                    <Chip
                      key={String(index)}
                      size="small"
                      deleteIcon={
                        <GlobalIcon.RemoveTagIcon
                          onMouseDown={event => event.stopPropagation()}
                        />
                      }
                      label={option.name}
                      onDelete={e => handleDelete(e, index)}
                      className={classes.chip}
                    />
                  );
                }
                return null;
              })}
            </div>
          )}
        >
          {enableAll ? (
            <MenuItem value="all" className={classes.itemList}>
              Chọn tất cả
              <Checkbox isChecked={valuesDisplay.length === options.length} />
            </MenuItem>
          ) : null}
          {options.map((option, _index: number) => {
            return (
              <MenuItem
                value={option._id}
                key={String(_index)}
                className={classes.itemList}
              >
                {option.name}
                <Checkbox isChecked={valuesDisplay.indexOf(option._id) > -1} />
              </MenuItem>
            );
          })}
        </SelectMaterial>
      </FormControl>
      {required && (
        <TextValidator
          value={valuesDisplay.length > 0 ? "values" : ""}
          name={id}
          validators={validators}
          errorMessages={[errorMessage]}
          className={classes.inputFieldHidden}
          validatorListener={handleValidate}
          FormHelperTextProps={{ component: ErrorMessage }}
        />
      )}
    </div>
  );
};

export default MultiSelect;
