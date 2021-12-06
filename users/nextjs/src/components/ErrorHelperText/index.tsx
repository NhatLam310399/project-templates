import React from "react";
import { SVG } from "@designs/SVG";

import { ErrorHelpTextContainer } from "./styles";

interface IErrorHelperTextProps {
  text: string;
}

const ErrorHelperText: React.FC<IErrorHelperTextProps> = ({ text }) => {
  return (
    <ErrorHelpTextContainer>
      <SVG
        name="common/error"
        width={16}
        height={16}
        className="mr-0.5 inline-block"
      />
      {text}
    </ErrorHelpTextContainer>
  );
};

export default ErrorHelperText;
