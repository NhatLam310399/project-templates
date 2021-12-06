import React, { useEffect, useState } from "react";
import CheckboxMaterial from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core";
import { colors } from "common/styles/colors";

interface ICheckboxProps {
  isChecked?: boolean;
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
    isChecked = false,
    label = "",
    onChange,
    disabled = false,
    size = "medium",
    className = "",
  } = props;

  const classes = useStyle();

  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    isChecked: boolean,
  ) => {
    setChecked(isChecked);
    onChange && onChange(isChecked);
  };

  return (
    <div className={`flex flex-row items-center ${className}`}>
      <CheckboxMaterial
        className={classes.root}
        disabled={disabled}
        checked={checked}
        onChange={handleChecked}
        color="default"
        size={size}
      />
      {label && <p className="text-lg font-medium">{label}</p>}
    </div>
  );
};

export default Checkbox;
