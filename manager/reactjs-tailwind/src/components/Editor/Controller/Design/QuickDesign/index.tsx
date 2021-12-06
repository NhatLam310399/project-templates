import { fabric } from "fabric";
import { useDispatch } from "react-redux";
import { QuickDesignContainer, Category, ListDesigns, Rock } from "./styles";
import { BackToMenu } from "layouts/Editor/TabComponents";
import SearchBoxTable from "components/SearchBoxTable";
import { ICustomSizeImages } from "typings";
import { addImage } from "redux/actions/editor";
import { catergoryFake } from "common/constants/editor/fakeCategory";

type IDesign = {
  name: string;
  image: ICustomSizeImages;
};

type IDesignsCategory = {
  name: string;
  items: IDesign[];
};

interface IQuickDesignProps {}

const QuickDesign: React.FC<IQuickDesignProps> = props => {
  const dispatch = useDispatch();
  const handleAddImage = (design: IDesign) => {
    if (!design.image.base64Image) return;

    fabric.Image.fromURL(String(design.image.base64Image), function (img) {
      if (!img) return;
      img.name = design.name;
      img.previewImage = design.image.base64Image;
      dispatch(addImage(img));
    });
  };

  return (
    <QuickDesignContainer>
      <BackToMenu />
      <SearchBoxTable onFetchData={() => {}} />
      <ListDesigns>
        {catergoryFake.map(({ name, items }) => (
          <Category.Container key={name}>
            <Category.Name>{name}</Category.Name>
            <Category.ListImage>
              {items.map(item => (
                <Category.ImageItem key={name}>
                  <Category.ImageContainer onClick={() => handleAddImage(item)}>
                    <Category.Image src={item?.image?.base64Image} />
                  </Category.ImageContainer>
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

export default QuickDesign;
