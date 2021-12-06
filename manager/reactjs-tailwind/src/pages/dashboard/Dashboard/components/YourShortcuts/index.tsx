import { YourShortcutsContainer } from "./styles";
import { PATH } from "common/constants/routes";

interface IYourShortcutsProps {}

type IShortcut = {
  name: string;
  description: string;
  image: string;
  url: string;
};

const shortcuts: IShortcut[] = [
  {
    name: "Blog Kingify",
    description: "Master the art of e-commerce one post at a time",
    image: "/shortcuts/blog.png",
    url: "/blog",
  },
  {
    name: "Product Template",
    description:
      "Create product templates for quickly adding products to your store",
    image: "/shortcuts/template.png",
    url: PATH.PRODUCT_TEMPLATE,
  },
];

const YourShortcuts: React.FC<IYourShortcutsProps> = props => {
  return <YourShortcutsContainer />;
};

export default YourShortcuts;
