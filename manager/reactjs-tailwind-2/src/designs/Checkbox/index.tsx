import React, { useEffect, useState } from "react";
import CheckboxMaterial from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core";
import { colors } from "common/styles/colors";

interface ICheckboxProps {
  isChecked?: boolean | undefined;
  onChange?: (isCheck: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "medium" | "small";
  className?: string;
}

const useStyle = makeStyles({
  root: {
    color: colors.primary,
    padding: "0",
  },
});

const Checkbox: React.FC<ICheckboxProps> = props => {
  const {
    isChecked = true,
    label = "",
    onChange,
    disabled = false,
    size = "medium",
    className = "",
  } = props;

  const classes = useStyle();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    status: boolean,
  ) => {
    setChecked(status);
    onChange && onChange(status);
  };

  return (
    <div className={className}>
      <CheckboxMaterial
        className={classes.root}
        disabled={disabled}
        checked={checked}
        onChange={handleChecked}
        color="default"
        size={size}
      />
    </div>
  );
};

export default Checkbox;
