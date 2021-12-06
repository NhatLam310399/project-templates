import { ComponentMeta } from "@storybook/react";
import Chip from "designs/Chip";

export default {
  title: "Designs/Chip",
  component: Chip,
} as ComponentMeta<typeof Chip>;

export const TagTemplate: React.FC = () => (
  <div className="flex flex-row items-center gap-5">
    <Chip variant="success">Success</Chip>
    <Chip>Info</Chip>
  </div>
);
