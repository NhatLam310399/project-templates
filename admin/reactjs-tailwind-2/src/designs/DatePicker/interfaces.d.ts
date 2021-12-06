import React from "react";

export type IDatePickerProps = {
    value?: Date | null;
    label?: string;
    className?: string;
    disableFuture?: boolean;
    onChange?: (newDate?: Date | null) => void;
    name?: string;
    placeholder?: string;
} & (
    | {
          required: true;
          errorMessage?: string;
      }
    | {
          required?: false;
          errorMessage?: string;
      }
);
