import React from "react";

import {
  ValidatorFormProps,
  ValidatorForm,
} from "react-material-ui-form-validator";
export interface IValidatorForm extends React.Component<ValidatorFormProps> {
  static addValidationRule(
    name: string,
    callback: (value: any) => boolean | Promise<boolean>,
  ): void;
  static removeValidationRule(name: string): void;
  isFormValid(dryRun: boolean): Promise<boolean>;
  resetValidations(): void;
}
