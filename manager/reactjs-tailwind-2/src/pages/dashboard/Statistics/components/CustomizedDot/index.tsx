import React from "react";

interface ICustomizedDot {
  monthSelect?: string;
}

const CustomizedDot: React.FC<ICustomizedDot> = (props: any) => {
  const { cx, cy, payload, monthSelect } = props;

  if (payload.name === monthSelect) {
    return <circle cx={cx} cy={cy} r={8} strokeWidth={3} fill="#001E6C" />;
  }

  return null;
};

export default CustomizedDot;
