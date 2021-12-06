import React from "react";

interface ISVGProps {
  className?: string;
  isButton?: boolean;
  name?: string;
  src?: string;
  width?: string | number;
  height?: string | number;
  onClick?: () => void;
  [key: string]: any;
}

const SVG: React.FC<ISVGProps> = (props) => {
  const { name = "", src, ...rest } = props;
  if (!!src) {
    return <img src={src} alt={`${name} svg icon`} {...rest} />;
  }
  return <img src={`/svg/${name}.svg`} alt={`${name} svg icon`} {...rest} />;
};

export { SVG };
