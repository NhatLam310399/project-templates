import { useEffect } from "react";
import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";

import SearchBoxTable from "components/SearchBoxTable";
import { renderPriceTypeDollar } from "common/functions";
import { CATEGORY_PREMIUM_IMAGE } from "common/constants/typeByCodes";

import { BackToMenu } from "layouts/Editor/TabComponents";

import { addImage } from "redux/actions/editor";
import { getAllCategory } from "redux/actions/clipArt";
import { getAllPremium } from "redux/actions/premiumImage";

import { IPremiumImage, IRootState } from "typings";

import {
  QuickDesignContainer,
  Category,
  ListDesigns,
  Rock,
  Title,
  Price,
} from "./styles";
interface IPremiumImagesProps {}

const PremiumImages: React.FC<IPremiumImagesProps> = props => {
  const dispatch = useDispatch();
  const { clipPath } = useSelector((state: IRootState) => state.editor);
  const {
    premiumImage: { results: premiumImages = [] },
  } = useSelector((state: IRootState) => state.premiumImage);
  const {
    categories: { results: categories = [] },
  } = useSelector((state: IRootState) => state.clipArt);

  const handleAddImage = (design: IPremiumImage) => {
    if (!design?.image?.base64Image) return;

    fabric.Image.fromURL(String(design.image.base64Image), img => {
      if (!img || !clipPath) return;

      img.name = design.name!;
      img.previewImage = design?.image?.base64Image;
      img.originObject = "PREMIUM";

      dispatch(addImage(img));
    });
  };
  useEffect(() => {
    dispatch(
      getAllCategory({
        filterCategory: {
          code: CATEGORY_PREMIUM_IMAGE,
        },
      }),
    );
    getAllPremiumAPI("");
  }, []);
  const getAllPremiumAPI = (name: string) => {
    dispatch(
      getAllPremium({
        filterPremiumImage: {
          name,
        },
      }),
    );
  };
  return (
    <QuickDesignContainer>
      <BackToMenu />
      <Title>Browse artwork</Title>
      <SearchBoxTable onFetchData={getAllPremiumAPI} />
      <ListDesigns>
        {categories.map(({ name, _id }) => (
          <Category.Container key={name}>
            <Category.Name>{name}</Category.Name>
            <Category.ListImage>
              {premiumImages.map(item => (
                <Category.ImageItem onClick={() => handleAddImage(item)}>
                  <Category.ImageContainer>
                    <Category.Image
                      src={item?.image?.base64Image || item?.image?.default}
                    />
                  </Category.ImageContainer>
                  <Price>{renderPriceTypeDollar(item?.price)}</Price>
                </Category.ImageItem>
              ))}
            </Category.ListImage>
          </Category.Container>
        ))}
        <Rock />
      </ListDesigns>
    </QuickDesignContainer>
  );
};

export default PremiumImages;
