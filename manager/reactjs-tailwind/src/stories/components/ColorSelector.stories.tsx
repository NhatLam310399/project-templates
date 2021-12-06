import { ComponentMeta, ComponentStory } from "@storybook/react";
import { listDetailColors } from "common/constants/editor";
import ColorSelector from "components/ColorSelector";
import { IColor } from "typings";

export default {
  title: "Components/ColorSelector",
  component: ColorSelector,
} as ComponentMeta<typeof ColorSelector>;

const Template: ComponentStory<typeof ColorSelector> = args => {
  return <ColorSelector {...(args as any)} />;
};

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  colors: listDetailColors,
  getColor: (color: any) => color?.hex,
};

export const MultipleSelect = Template.bind({});
MultipleSelect.args = {
  isMultiSelect: true,
  colors: listDetailColors,
  getColor: (color: any) => color?.hex,
};
