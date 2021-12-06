import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Collapse from "components/Collapse";
import DrawerArrowIcon from "icons/Arrows/DrawerArrow";
import {
  ICategoryLevel1,
  ICategoryLevel2,
  IRootState,
  ITagMenu,
} from "typings";

import {
  ListCategoriesDrawerContainer,
  ItemButton,
  List,
  SubItemButton,
} from "./styles";
import { ITypeRender } from "../index";
import {
  setTagMenuSelected as setTagMenuSelectedAction,
  setCategoryLevel1Selected as setCategoryLv1SelectedAction,
  setCategoryLevel2Selected as setCategoryLevel2SelectedAction,
} from "redux/actions/category";

interface IListCategoriesDrawerProps {}
export interface ICategoryActive {
  id: string;
  type: ITypeRender;
  hasChildren?: boolean;
}
const Drawer: React.FC<IListCategoriesDrawerProps> = props => {
  const dispatch = useDispatch();
  const {
    categoriesLv1: { results: listCategoryLv1 = [] },
    categoriesLv2: { results: listCategoryLv2 = [] },
    tags: { results: listTags = [] },
    selected,
  } = useSelector((state: IRootState) => state.category);

  const [open, setOpen] = useState(false);
  const [idActive, setIdActive] = useState<string | undefined>("");
  const [categoryLv1Selected, setCategoryLv1Selected] =
    useState<ICategoryLevel1 | null>(null);
  const [tagSelected, setTagSelected] = useState<ITagMenu | null>(null);

  useEffect(() => {
    if (selected.level1 && selected.level1?._id !== categoryLv1Selected?._id) {
      setOpen(true);
      setCategoryLv1Selected(selected.level1);
    }
    if (selected.tagMenu || selected.level2) {
      setOpen(true);
      setIdActive(selected.level2?._id || selected.tagMenu?._id);
    }
  }, [selected]);

  const handleSelectCategoryLv1 = (category: ICategoryLevel1) => {
    if (category?._id === categoryLv1Selected?._id) {
      setOpen(!open);
    } else {
      setOpen(true);
      setIdActive(category._id || "");
      setCategoryLv1Selected(category);
    }
  };

  const handleSelectTag = (tag: ITagMenu) => {
    setIdActive(tag._id);
    setTagSelected(tag);

    dispatch(setCategoryLv1SelectedAction(categoryLv1Selected));
    dispatch(setTagMenuSelectedAction(tag));
  };

  const handleSelectCategoryLv2 = (cate2: ICategoryLevel2) => {
    setIdActive(cate2._id);

    dispatch(setCategoryLv1SelectedAction(categoryLv1Selected));
    dispatch(
      setTagMenuSelectedAction(
        tagSelected ||
          listTags.find(item => item._id === cate2.tagMenu?._id) ||
          null,
      ),
    );
    dispatch(setCategoryLevel2SelectedAction(cate2));
  };

  return (
    <ListCategoriesDrawerContainer>
      <List>
        {listCategoryLv1?.map(category => {
          const isSelected = category?._id === categoryLv1Selected?._id;
          const listTagsOfCategoryLv1 = listTags?.filter(
            tag => tag?.categoryLevel1?._id === category?._id,
          );

          const isShow = isSelected && open;

          return (
            <>
              <ItemButton
                selected={isSelected}
                onClick={() => handleSelectCategoryLv1(category)}
              >
                {category?.name}
                <DrawerArrowIcon
                  className={
                    isShow ? "transform rotate-180" : "transform rotate-0"
                  }
                />
              </ItemButton>

              {listTagsOfCategoryLv1?.map(tag => (
                <Collapse show={isShow} smooth={false}>
                  <List>
                    <SubItemButton
                      onClick={() => handleSelectTag(tag)}
                      level={1}
                      active={tag?._id === idActive}
                    >
                      {tag?.name}
                    </SubItemButton>
                    <List>
                      {listCategoryLv2
                        ?.filter(
                          category => category?.tagMenu?._id === tag?._id,
                        )
                        .map(category => (
                          <SubItemButton
                            onClick={() => handleSelectCategoryLv2(category)}
                            level={2}
                            active={category?._id === idActive}
                          >
                            {category?.name}
                          </SubItemButton>
                        ))}
                    </List>
                  </List>
                </Collapse>
              ))}
            </>
          );
        })}
      </List>
    </ListCategoriesDrawerContainer>
  );
};

export default Drawer;
