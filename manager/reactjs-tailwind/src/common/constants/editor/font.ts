import { IColor } from "typings";

export type IFontFamily = {
  name: string;
  url: string;
};

export type ITextStyleConfig = {
  fontFamily: IFontFamily;
  fill: IColor;
  fontWeight: string;
  fontStyle: "normal" | "italic" | "oblique";
  fontSize: number;
  textAlign:
    | "left"
    | "center"
    | "right"
    | "justify"
    | "justify-left"
    | "justify-center"
    | "justify-right";
  letterSpacing: number;
  rotate: number;
  arc: number;
};

export const fontFamilies: IFontFamily[] = [
  {
    name: "Open Sans",
    url: "https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Open+Sans:wght@400;800&display=swap;",
  },
  {
    name: "Noto Sans JP",
    url: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap",
  },
  {
    name: "Castoro",
    url: "https://fonts.googleapis.com/css2?family=Castoro:ital@0;1&display=swap",
  },
  {
    name: "Merriweather",
    url: "https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;1,300&display=swap",
  },
  {
    name: "Varela Round",
    url: "https://fonts.googleapis.com/css2?family=Varela+Round&display=swap",
  },
  {
    name: "Lobster",
    url: "https://fonts.googleapis.com/css2?family=Lobster&display=swap",
  },
  {
    name: "Caveat",
    url: "https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap",
  },
  {
    name: "Permanent Marker",
    url: "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap",
  },
];
