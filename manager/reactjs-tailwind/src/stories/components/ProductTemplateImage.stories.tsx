import { ComponentMeta, ComponentStory } from "@storybook/react";
import ProductTemplateImage from "components/ProductTemplateImage";

export default {
  title: "Components/ProductTemplateImage",
  component: ProductTemplateImage,
} as ComponentMeta<typeof ProductTemplateImage>;

const Template: ComponentStory<typeof ProductTemplateImage> = args => {
  return <ProductTemplateImage {...args} />;
};

const template =
  "data:image/png;base64,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";

export const Preview = Template.bind({});
Preview.args = {
  size: 300,
  backgroundColor: {
    name: "Black/White",
    hex: "#000",
  },
  heatherImage:
    "https://files.cdn.printful.com/m/tultex245/thumbs/onmodel/man/front/01_tultex_front_blackwhite.png?v=1573553063",
  upperImage:
    "https://files.cdn.printful.com/m/tultex245/thumbs/onmodel/man/front/04_tultex_front_base_forblackwhite_whiteBG.png?v=1573553063",
  templateImage: template,
  position: {
    x: 0.332109375,
    y: 0.2825,
    w: 0.654609375 - 0.332109375,
    h: 0.73875 - 0.2825,
    widthByInch: 10.6,
    heightByInch: 19.6,
  },
};
