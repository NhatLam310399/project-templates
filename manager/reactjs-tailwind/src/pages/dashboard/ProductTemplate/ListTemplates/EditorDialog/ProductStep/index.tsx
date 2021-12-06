/**
 * @NOTE
 *  - We will call all Category of each level
 *  - The category's level will be:
 *    CategoryLevel1 > TagMenu > CategoryLevel2
 */

import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FullScreenDialog from "components/FullScreenDialog";
import { IRootState } from "typings";
import Drawer from "./Drawer";
import { ProductStepContainer, Content, ListItemsContainer } from "./styles";
import {
  getAllCategoryLv1,
  getAllCategoryLv2,
  getAllTagMenu,
} from "redux/actions/category";
import Header from "./Header";

interface IProductStepProps {
  closeDialog: () => void;
  onNextStep: () => void;
}

const AllCategoryLv1 = lazy(() => import("./AllCategoryLv1"));
const AllCategoryTagsAndLv2 = lazy(() => import("./AllCategoryTagsAndLv2"));
const AllProductSchemas = lazy(() => import("./AllProductSchemas"));

export type ITypeRender = "CATEGORY_1" | "TAG" | "CATEGORY_2" | "PRODUCT";

const ListProductComponent: {
  [k in ITypeRender]: React.FC<any>;
} = {
  CATEGORY_1: AllCategoryLv1,
  TAG: AllCategoryTagsAndLv2,
  CATEGORY_2: AllProductSchemas,
  PRODUCT: AllProductSchemas,
};

const ProductStep: React.FC<IProductStepProps> = ({
  closeDialog,
  onNextStep,
}) => {
  const dispatch = useDispatch();
  const { selected } = useSelector((state: IRootState) => state.category);

  const [typeRender, setTypeRender] = useState<ITypeRender>("CATEGORY_1");

  useEffect(() => {
    dispatch(getAllCategoryLv1({}));
    dispatch(getAllCategoryLv2({}));
    dispatch(getAllTagMenu({}));
  }, []);

  useEffect(() => {
    if (selected?.level2) return setTypeRender("PRODUCT");
    if (selected?.tagMenu) return setTypeRender("PRODUCT");
    if (selected?.level1) setTypeRender("TAG");
    if (selected?.level1 === null) {
      setTypeRender("CATEGORY_1");
    }
  }, [selected]);

  const CurrentComponent = ListProductComponent[typeRender];

  return (
    <>
      <FullScreenDialog.Header
        title="Create a product templates"
        onClose={closeDialog}
      />
      <ProductStepContainer>
        <Header />
        <Content>
          <Drawer />
          <ListItemsContainer>
            <CurrentComponent onNextStep={onNextStep} />
          </ListItemsContainer>
        </Content>
      </ProductStepContainer>
    </>
  );
};

export default ProductStep;
