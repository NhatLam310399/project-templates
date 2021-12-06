import * as Fabric from "fabric";

declare module "fabric" {
  export namespace fabric {
    export type ITypeObject =
      | "BACKGROUND"
      | "UPPER_BACKGROUND"
      | "IMAGE"
      | "VECTOR"
      | "TEXT"
      | "CLIP_PATH_BORDER";
    export type IOriginObject = "CLIP_PATH" | "PREMIUM" | "TEXT";
    export interface Object {
      zIndex: number;
      id: string;
      name: string;
      previewImage: string | undefined;
      price: number;
      isStaticColor?: boolean;
      typeObject: ITypeObject;
      originObject?: IOriginObject;
      originHeight?: number;
      originWidth?: number;

      // Width and height in real life (by inch)
      widthByInch?: number;
      heightByInch?: number;
    }

    export interface Canvas {
      clipPathContainer: fabric.Rect;
      /**
       * @param scaleToWidth {number | null} will export for you an image with Width size. (height will be auto)
       */
      exportBase64PNG: (scaleToWidth?: number | undefined) => string;
      exportMainObjects: () => fabric.Object[];
      importObjects: (objects: fabric.Object[]) => void;
      sortObjects: () => void;
      findIndexOfObjectHasId: (id: string) => number | null;
      removeObjectHasTypeObject: (typeObject: ITypeObject) => boolean;
    }
  }
}
