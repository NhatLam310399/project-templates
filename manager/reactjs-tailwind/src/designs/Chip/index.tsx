import React from "react";
import { ChipContainer } from "./styles";

export type ITagVariant = "info" | "success";

interface ITagProps {
  variant?: ITagVariant;
  className?: string;
}

const Chip: React.FC<ITagProps> = props => {
  const { variant = "info", className = "", children } = props;
  return (
    <ChipContainer variant={variant} className={className}>
      {children}
    </ChipContainer>
  );
};

export default Chip;
