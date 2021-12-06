import { ComponentMeta, ComponentStory } from "@storybook/react";
import { listDetailColors } from "common/constants/editor";
import ListColors from "components/ListColors";

export default {
  title: "Components/ListColor",
  component: ListColors,
} as ComponentMeta<typeof ListColors>;

const Template: ComponentStory<typeof ListColors> = args => {
  return <ListColors {...args} />;
};

export const Preview = Template.bind({});
Preview.args = {
  colors: listDetailColors,
  getColor: (color: any) => color.hex,
};
