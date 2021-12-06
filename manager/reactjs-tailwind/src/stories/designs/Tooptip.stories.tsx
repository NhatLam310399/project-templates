import { ComponentMeta } from "@storybook/react";
import Tooltip from "designs/Tooltip";
import TrashIcon from "icons/Trash";

export default {
  title: "Designs/Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

export const Default: React.FC = () => (
  <div className="flex flex-row items-center gap-5 p-5">
    <Tooltip text="Delete">
      <TrashIcon />
    </Tooltip>
  </div>
);
