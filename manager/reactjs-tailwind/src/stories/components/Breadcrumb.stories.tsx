import { ComponentMeta, ComponentStory } from "@storybook/react";
import Breadcrumb from "components/Breadcrumb";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = arg => {
  return (
    <BrowserRouter>
      <Breadcrumb {...arg} />
    </BrowserRouter>
  );
};

export const Preview = Template.bind({});
Preview.args = {
  items: [
    {
      name: "Home",
      link: "/#home",
    },
    {
      name: "Category",
      link: "/#category",
    },
    {
      name: "Trademark",
      link: "/#trademark",
    },
    {
      name: "Product-Detail",
      link: "/#product-detail",
    },
  ],
};
