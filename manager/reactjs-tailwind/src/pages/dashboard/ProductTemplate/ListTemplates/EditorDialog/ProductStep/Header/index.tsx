import Breadcrumb from "components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryLevel1Selected,
  setTagMenuSelected,
} from "redux/actions/category";
import { IRootState } from "typings";
import { HeaderContainer } from "./styles";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = props => {
  const dispatch = useDispatch();
  const { selected } = useSelector((state: IRootState) => state.category);
  return (
    <HeaderContainer>
      <Breadcrumb
        items={[
          {
            name: "Product",
            onClick: () => dispatch(setCategoryLevel1Selected(null)),
          },
          {
            name: selected.level1?.name,
            // Set category level once again will Clear tagMenu and level 2 selected.
            onClick: () =>
              dispatch(setCategoryLevel1Selected(selected.level1 || null)),
          },
          {
            // Set category level once again will Clear level 2 selected.
            name: selected.tagMenu?.name,
            onClick: () =>
              dispatch(setTagMenuSelected(selected.tagMenu || null)),
          },
          {
            name: selected.level2?.name,
          },
        ]}
      />
    </HeaderContainer>
  );
};

export default Header;
