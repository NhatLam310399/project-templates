import { useDispatch, useSelector } from "react-redux";
import { fabric } from "fabric";
import {
  BasicClipartContainer,
  ListDesigns,
  Category,
  Button,
  Rock,
  SubscribeWrapper,
  Subscribe,
} from "./styles";
import { addVector } from "redux/actions/editor";
import * as cliparts2 from "common/constants/editor/images/cliparts2";
import { renderURLFromSVGString } from "common/functions";
import { useEffect, useState } from "react";
import { IClipArt, IRootState, ICategory } from "typings";

type ITabType = "BASIC_CLIPART" | "PRO_CLIPART";

interface ITabPanelProps {
  tab: ITabType;
}

type IDesign = {
  name: string;
  svgData: string;
  isStaticColor?: boolean;
};

type IDesignsCategory = {
  name: string;
  items: IDesign[];
};

const TabPanel: React.FC<ITabPanelProps> = props => {
  const { tab } = props;
  const dispatch = useDispatch();
  const {
    categories: { results: categories = [] },
    clipArts: { results: clipArts = [] },
  } = useSelector((state: IRootState) => state.clipArt);
  const [clipArtList, setClipArtList] = useState<ICategory[]>([]);
  const [isLockPro, setIsLockPro] = useState(false);
  const handleAddImage = (design: IClipArt) => {
    if (isLockPro) return;
    const imageSrc = design.image?.default;

    if (!imageSrc) return console.error("Medium size image not found!");

    fabric.loadSVGFromString(imageSrc, (objects, options) => {
      const obj = new fabric.Group(objects, options);
      obj.name = design.name!;
      obj.isStaticColor = design?.isStaticColor;
      obj.previewImage = imageSrc;
      dispatch(addVector(obj));
    });
  };
  useEffect(() => {
    if (categories?.length > 0 || clipArts?.length > 0) {
      if (tab === "BASIC_CLIPART") {
        const basic = categories?.filter(category => !category.isPro);
        setClipArtList(basic);
        setIsLockPro(false);
      } else {
        const pro = categories?.filter(category => category.isPro);
        setClipArtList(pro);
        setIsLockPro(true);
      }
    }
  }, [tab, categories, clipArts]);

  return (
    <BasicClipartContainer>
      {isLockPro && (
        <SubscribeWrapper>
          <Subscribe.Container>
            <Subscribe.Text>Subscribe to Kingify Pro to unlock</Subscribe.Text>
            <Subscribe.Desc>
              Add exclusive clipart content to your designs
            </Subscribe.Desc>
          </Subscribe.Container>
          <Button variant="secondary">Unlock pro clipart</Button>
        </SubscribeWrapper>
      )}
      <ListDesigns>
        {clipArtList.map(({ name, _id, isPro }) => (
          <Category.Container key={name}>
            <Category.Name>
              {name}
              {isPro && <Category.Tag>Pro</Category.Tag>}
            </Category.Name>
            <Category.ListImage>
              {clipArts
                .filter(item => item?.category?._id === _id!)
                .map(item => (
                  <Category.ImageItem isPro={isLockPro} key={name}>
                    <Category.ImageContainer
                      onClick={() => handleAddImage(item)}
                    >
                      <Category.Image src={item?.image?.default || ""} />
                    </Category.ImageContainer>
                  </Category.ImageItem>
                ))}
            </Category.ListImage>
          </Category.Container>
        ))}
        <Rock />
      </ListDesigns>
    </BasicClipartContainer>
  );
};

export default TabPanel;

const fakeData: IDesignsCategory[] = [
  {
    name: "Social media",
    items: [
      {
        name: "Academic",
        svgData: cliparts2.academic,
      },
      {
        name: "Clock",
        svgData: cliparts2.clock,
      },
      {
        name: "Config",
        svgData: cliparts2.cog,
      },
      {
        name: "Chip",
        svgData: cliparts2.chip,
      },
    ],
  },
  {
    name: "Other",
    items: [
      {
        name: "Beaker",
        svgData: cliparts2.beaker,
      },
      {
        name: "Cake",
        svgData: cliparts2.cake,
      },
      {
        name: "Camera",
        svgData: cliparts2.camera,
      },
      {
        name: "Chat",
        svgData: cliparts2.chat,
      },
      {
        name: "Chat Alt",
        svgData: cliparts2.chatAlt,
      },
      {
        name: "Color swatch",
        svgData: cliparts2.colorSwatch,
      },
      {
        name: "Database",
        svgData: cliparts2.database,
      },
      {
        name: "Happy face",
        svgData: cliparts2.happy,
      },
    ],
  },
  {
    name: "Cat",
    items: [
      {
        name: "Cute cat",
        svgData: cliparts2.cuteCat,
        isStaticColor: true,
      },
      {
        name: "3D cat",
        svgData: cliparts2.ThreeDCat,
        isStaticColor: true,
      },
      {
        name: "Line cat",
        svgData: cliparts2.lineCat,
        isStaticColor: true,
      },
    ],
  },
];
