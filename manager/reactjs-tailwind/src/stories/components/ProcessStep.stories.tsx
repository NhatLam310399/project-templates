import { ComponentMeta } from "@storybook/react";
import React from "react";
import ProcessStep from "components/ProcessStep";

export default {
  title: "Components/ProcessStep",
  component: ProcessStep,
} as ComponentMeta<typeof ProcessStep>;

interface IProcess {
  currentStep: number;
  arrStepTitle: string[];
}

const listSteps: string[] = [
  "Data upload",
  "Data matching",
  "Review Order",
  "Payment",
  "Order import",
];

export const Process: React.FC<IProcess> = () => {
  return (
    <div className="mt-2">
      <ProcessStep listSteps={listSteps} currentStep={1} />;
    </div>
  );
};
