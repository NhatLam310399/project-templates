import { Link } from "react-router-dom";
import { ShortCutsContainer } from "./styles";
import { IShortcut } from "typings";
import ShortcutCard from "designs/cards/Shortcut";
import { PATH } from "common/constants/routes";
interface IShortCutsProps {}

const ShortCuts: React.FC<IShortCutsProps> = props => {
  return (
    <ShortCutsContainer>
      {listShortCuts.map((shortcut, index) => {
        return (
          <Link to={shortcut?.url!}>
            <ShortcutCard shortcut={shortcut} />
          </Link>
        );
      })}
    </ShortCutsContainer>
  );
};

const listShortCuts: IShortcut[] = [
  {
    icon: {
      default: "dashboard/blog",
    },
    name: "Blog Kingify",
    content: "Master the art of e-commerce one post at a time",
    url: "/",
  },
  {
    icon: {
      default: "dashboard/template",
    },
    name: "Product Template",
    content:
      "Create product templates for quickly adding products to your store",
    url: PATH.PRODUCT_TEMPLATE,
  },
];
export default ShortCuts;
