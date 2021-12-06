import { heathers, background } from "./images";
import { randomId } from "common/functions";
import { IColor, IColorSchema, IProductSchema, ISideType } from "typings";

const productSide: Record<
  "FRONT" | "OUTSIDE_LABEL" | "INSIDE_LABEL",
  ISideType
> = {
  FRONT: { _id: randomId(), name: "Front" },
  OUTSIDE_LABEL: {
    _id: randomId(),
    name: "Outside label",
  },
  INSIDE_LABEL: {
    _id: randomId(),
    name: "Inside label",
  },
};

const colorSchemas: IColorSchema[] = [
  {
    name: "Black/White",
    color: {
      hex: "#0a0a0a/#ffffff",
      name: "Black/White",
    },
    heather: {
      small:
        "https://files.cdn.printful.com/m/tultex245/thumbs/onmodel/man/front/01_tultex_front_blackwhite.png?v=1573553063",
      base64Image: heathers.blackWhite,
    },
  },
  {
    name: "Denim/Navy",
    color: {
      hex: "#2b354a/#252334",
      name: "Denim/Navy",
    },
    heather: {
      small:
        "https://files.cdn.printful.com/m/tultex245/thumbs/onmodel/man/front/01_tultex_front_denimnavy.png?v=1573553063",
      base64Image: heathers.demnimNavy,
    },
  },
  {
    name: "Grey/Black",
    color: {
      hex: "#a3a5a9/#0a0a0a",
      name: "Grey/Black",
    },
    heather: {
      small:
        "https://files.cdn.printful.com/m/tultex245/thumbs/onmodel/man/front/01_tultex_front_greyblack.png?v=1573553063",
      base64Image: heathers.greyBlack,
    },
  },
  {
    name: "Grey/Red",
    color: {
      hex: "#a3a5a9/#bf0d3e",
      name: "Grey/Red",
    },
    heather: {
      small:
        "https://files.cdn.printful.com/m/tultex245/thumbs/onmodel/man/front/01_tultex_front_greyheather-red.png?v=1573553063",
      base64Image: heathers.greyRed,
    },
  },
  {
    name: "Grey/Charcoal",
    color: {
      hex: "#a3a5a9/#4a4c4d",
      name: "Grey/Charcoal",
    },
    heather: {
      small:
        "https://files.cdn.printful.com/m/tultex245/thumbs/onmodel/man/front/01_tultex_front_greyheather-charcoal.png?v=1573553063",
      base64Image: heathers.greyHeadther,
    },
  },
  {
    name: "White/Black",
    color: {
      hex: "#ffffff/#0a0a0a",
      name: "White",
    },
    heather: {
      small:
        "https://files.cdn.printful.com/m/tultex245/thumbs/onmodel/man/front/01_tultex_front_whiteblack.png?v=1573553063",
      base64Image: heathers.whiteBlack,
    },
  },
  {
    name: "White/Red",
    color: {
      hex: "#ffffff/#bf0d3e",
      name: "White/Red",
    },
    heather: {
      small:
        "https://files.cdn.printful.com/m/tultex245/thumbs/onmodel/man/front/01_tultex_front_whitered.png?v=1573553063",
      base64Image: heathers.whiteRed,
    },
  },
  {
    name: "White/Kelly",
    color: {
      hex: "#ffffff/#048c61",
      name: "White/Kelly",
    },
    heather: {
      small:
        "https://files.cdn.printful.com/m/tultex245/thumbs/onmodel/man/front/01_tultex_front_whitekelly.png?v=1573553063",
      base64Image: heathers.whiteKelly,
    },
  },
];

const colors: IColor[] = colorSchemas.map(({ color }) => color);
const colorSchemasWithoutHeather: IColorSchema[] = colorSchemas.map(
  ({ name, color }) => ({ name, color }),
);

const colorSchemaMini: IColorSchema[] = colorSchemas.map(
  ({ name, color, heather }) => ({
    name,
    color,
    heather: { small: heather?.small },
  }),
);

const overwriteColorSchema = (
  index: number,
  heatherURL: string,
): IColorSchema => ({
  ...colorSchemas[index],
  heather: {
    small: heatherURL,
  },
});

export const productDesignTempMock: IProductSchema = {
  _id: randomId(),
  name: "Unisex 3/4 Sleeve Raglan Shirt | Tultex 245",
  colors,
  rate: 3.9,
  reviewCount: 90,
  sizes: [
    {
      _id: randomId(),
      name: "XS",
    },
    {
      _id: randomId(),
      name: "XL",
    },
    {
      _id: randomId(),
      name: "3XL",
    },
  ],
  fromCountries: [
    {
      _id: randomId(),
      name: "United States",
    },
    {
      _id: randomId(),
      name: "Latvia",
    },
  ],
  price: 48,
  image: {
    medium:
      "https://files.cdn.printful.com/products/233/product_1551967769.jpg",
  },
  status: {
    name: "Kingify suggests",
  },
  sides: [
    {
      _id: randomId(),
      sideType: productSide.FRONT,
      upperImage: {
        base64Image: background.front,
        small:
          "https://files.cdn.printful.com/m/tultex245/thumbs/onmodel/man/front/04_tultex_front_base_forblackwhite_whiteBG.png?v=1573553063",
      },
      clipPath: {
        x: 0.332109375,
        y: 0.2825,
        w: 0.654609375 - 0.332109375,
        h: 0.73875 - 0.2825,
        widthByInch: 10.6,
        heightByInch: 19.6,
      },
      colorSchemas,
    },
    {
      _id: randomId(),
      sideType: productSide.OUTSIDE_LABEL,
      upperImage: {
        base64Image: background.outsideLabel,
        small:
          "https://files.cdn.printful.com/m/templates/thumbs/outside_label_3x3.png?v=1579260623",
      },
      colorSchemas: colorSchemasWithoutHeather,
      clipPath: {
        x: 0.244609375,
        y: 0.33375,
        w: 0.5125,
        h: 0.51625,
        widthByInch: 90 / 25.4,
        heightByInch: 90 / 25.4,
      },
    },
    {
      _id: randomId(),
      sideType: productSide.INSIDE_LABEL,
      upperImage: {
        base64Image: background.insideLabel,
        small:
          "https://www.printful.com/mockup-generator/get-label-image?v=8158|main|100|1622537799",
      },
      colorSchemas: colorSchemasWithoutHeather,
      clipPath: {
        x: 0.242109375,
        y: 0.335,
        w: 0.754609375 - 0.242109375,
        h: 0.52625 - 0.335,
        widthByInch: 90 / 25.4,
        heightByInch: 30 / 25.4,
      },
    },
  ],
  mockups: [
    {
      name: "Men's mockups",
      upperImage: {
        small:
          "https://files.cdn.printful.com/m/tultex245/thumbs/onmodel/man/front/04_tultex_front_base_forblackwhite_whiteBG.png?v=1573553063",
      },
      clipPath: {
        x: 0.332109375,
        y: 0.2825,
        w: 0.654609375 - 0.332109375,
        h: 0.73875 - 0.2825,
        widthByInch: 10.6,
        heightByInch: 19.6,
      },
      colorSchemas: colorSchemaMini,
      designedTemplateSideId: productSide.FRONT._id,
      demos: [
        {
          _id: randomId(),
          sideType: productSide.FRONT,
          name: "Men's mockups",
          upperImage: {
            small:
              "https://files.cdn.printful.com/m/tultex245/thumbs/onmodel/man/front/04_tultex_front_base_forblackwhite_whiteBG.png?v=1573553063",
          },
          clipPath: {
            x: 0.332109375,
            y: 0.2825,
            w: 0.654609375 - 0.332109375,
            h: 0.73875 - 0.2825,
            widthByInch: 10.6,
            heightByInch: 19.6,
          },
          colorSchemas: colorSchemaMini,
          designedTemplateSideId: productSide.FRONT._id,
        },
      ],
    },
    {
      name: "Women's mockups",
      upperImage: {
        small:
          "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/04_tultex_front_base_whitebg.png?v=1573553063",
      },
      clipPath: {
        x: 0.332109375,
        y: 0.2825,
        w: 0.654609375 - 0.332109375,
        h: 0.73875 - 0.2825,
        widthByInch: 10.6,
        heightByInch: 19.6,
      },
      colorSchemas: [
        overwriteColorSchema(
          0,
          "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/01_tultex_front_blackwhite.png?v=1573553063",
        ),
        overwriteColorSchema(
          1,
          "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/01_tultex_front_denimnavy.png?v=1573553063",
        ),
        overwriteColorSchema(
          2,
          "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/01_tultex_front_greyblack.png?v=1573553063",
        ),
        overwriteColorSchema(
          3,
          "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/01_tultex_front_greyheather-red.png?v=1573553063",
        ),
        overwriteColorSchema(
          4,
          "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/01_tultex_front_greyheather-charcoal.png?v=1573553063",
        ),
        overwriteColorSchema(
          5,
          "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/01_tultex_front_whiteblack.png?v=1573553063",
        ),
        overwriteColorSchema(
          6,
          "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/01_tultex_front_whitered.png?v=1573553063",
        ),
        overwriteColorSchema(
          7,
          "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/04_tultex_front_base_whitebg.png?v=1573553063",
        ),
      ],
      designedTemplateSideId: productSide.FRONT._id,
      demos: [
        {
          _id: randomId(),
          name: "Women's mockups",
          sideType: productSide.FRONT,
          upperImage: {
            small:
              "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/04_tultex_front_base_whitebg.png?v=1573553063",
          },
          clipPath: {
            x: 0.332109375,
            y: 0.2825,
            w: 0.654609375 - 0.332109375,
            h: 0.73875 - 0.2825,
            widthByInch: 10.6,
            heightByInch: 19.6,
          },
          colorSchemas: [
            overwriteColorSchema(
              0,
              "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/01_tultex_front_blackwhite.png?v=1573553063",
            ),
            overwriteColorSchema(
              1,
              "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/01_tultex_front_denimnavy.png?v=1573553063",
            ),
            overwriteColorSchema(
              2,
              "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/01_tultex_front_greyblack.png?v=1573553063",
            ),
            overwriteColorSchema(
              3,
              "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/01_tultex_front_greyheather-red.png?v=1573553063",
            ),
            overwriteColorSchema(
              4,
              "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/01_tultex_front_greyheather-charcoal.png?v=1573553063",
            ),
            overwriteColorSchema(
              5,
              "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/01_tultex_front_whiteblack.png?v=1573553063",
            ),
            overwriteColorSchema(
              6,
              "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/01_tultex_front_whitered.png?v=1573553063",
            ),
            overwriteColorSchema(
              7,
              "https://files.cdn.printful.com/m/tultex245/thumbs/onwoman/front/04_tultex_front_base_whitebg.png?v=1573553063",
            ),
          ],
          designedTemplateSideId: productSide.FRONT._id,
        },
      ],
    },
    {
      name: "Default mockups",
      upperImage: {
        small:
          "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/01-tultex-245-shadows-Black.png?v=1604472936",
      },
      clipPath: {
        x: 0.332109375,
        y: 0.2825,
        w: 0.654609375 - 0.332109375,
        h: 0.73875 - 0.2825,
        widthByInch: 10.6,
        heightByInch: 19.6,
      },
      colorSchemas: [
        overwriteColorSchema(
          0,
          "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-Black-White.png?v=1604472936",
        ),
        overwriteColorSchema(
          1,
          "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-HeatherDenim-Navy.png?v=1604472936",
        ),
        overwriteColorSchema(
          2,
          "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-HeatherGray-Black.png?v=1604472936",
        ),
        overwriteColorSchema(
          3,
          "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-HeatherGray-Red.png?v=1604472936",
        ),
        overwriteColorSchema(
          4,
          "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-HeatherGray-Charcoal.png?v=1604472936",
        ),
        overwriteColorSchema(
          5,
          "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-White-Black.png?v=1604472936",
        ),
        overwriteColorSchema(
          6,
          "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-White-Red.png?v=1604472936",
        ),
        overwriteColorSchema(
          7,
          "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-White-Kelly.png?v=1604472936",
        ),
      ],
      designedTemplateSideId: productSide.FRONT._id,
      demos: [
        {
          _id: randomId(),
          name: "Default mockups",
          sideType: productSide.FRONT,
          upperImage: {
            small:
              "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/01-tultex-245-shadows-Black.png?v=1604472936",
          },
          clipPath: {
            x: 0.332109375,
            y: 0.2825,
            w: 0.654609375 - 0.332109375,
            h: 0.73875 - 0.2825,
            widthByInch: 10.6,
            heightByInch: 19.6,
          },
          colorSchemas: [
            overwriteColorSchema(
              0,
              "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-Black-White.png?v=1604472936",
            ),
            overwriteColorSchema(
              1,
              "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-HeatherDenim-Navy.png?v=1604472936",
            ),
            overwriteColorSchema(
              2,
              "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-HeatherGray-Black.png?v=1604472936",
            ),
            overwriteColorSchema(
              3,
              "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-HeatherGray-Red.png?v=1604472936",
            ),
            overwriteColorSchema(
              4,
              "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-HeatherGray-Charcoal.png?v=1604472936",
            ),
            overwriteColorSchema(
              5,
              "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-White-Black.png?v=1604472936",
            ),
            overwriteColorSchema(
              6,
              "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-White-Red.png?v=1604472936",
            ),
            overwriteColorSchema(
              7,
              "https://files.cdn.printful.com/m/tultex245/thumbs/flat/front/02-tultex-245-front-White-Kelly.png?v=1604472936",
            ),
          ],
          designedTemplateSideId: productSide.FRONT._id,
        },
      ],
    },
  ],
};
