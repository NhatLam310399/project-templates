import produce from "immer";
import { AnyAction } from "redux";
import { fabric } from "fabric";
import * as types from "redux/types/editor";
import { depthCompare, randomId, randomInteger } from "common/functions";
import TextPreviewImage from "assets/svg/editor/text-preview.svg";
import { IColor, IRectCanvas } from "typings";
import "./custom";

interface IEditorState {
  canvas: fabric.Canvas | null;
  currentActiveObjectId: string | null;
  maxZIndex: number;
  step: number;
  clipPath: fabric.Rect | null;
  listColors: IColor[];
  upperBackgroundImage?: string;
  base64Image: string;
  heatherImage?: string;
}

const initialState: IEditorState = {
  canvas: null,
  currentActiveObjectId: null,
  maxZIndex: 0,
  step: 0,
  clipPath: null,
  listColors: [],
  base64Image: "",
};

const INFINITY = 99999;

const editorReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    const update = () => {
      draft.step += 1;
    };

    // console.log(action.type);
    switch (action.type) {
      case types.INIT_CANVAS: {
        draft.canvas = action.payload;
        draft.canvas?.renderAll();
        break;
      }

      case types.SET_CLIP_PATH: {
        const rect: IRectCanvas = action.payload;
        if (!draft.canvas || !rect) return;
        const size = draft.canvas?.getWidth() || 800;
        draft.canvas.removeObjectHasTypeObject("CLIP_PATH_BORDER");

        const position = {
          originX: "left",
          originY: "top",
          width: rect.w * size,
          height: rect.h * size,
          left: rect.x * size,
          top: rect.y * size,
          widthByInch: rect.widthByInch,
          heightByInch: rect.heightByInch,
        };

        const clipPathRect = new fabric.Rect({
          absolutePositioned: true,
          ...position,
        });

        draft.clipPath = clipPathRect as any;

        const rectBoundary = new fabric.Rect({
          fill: "transparent",
          selectable: false,
          strokeDashArray: [5, 5],
          strokeWidth: 1,
          evented: false,
          name: "clipPath border",
          ...position,
        });

        rectBoundary.typeObject = "CLIP_PATH_BORDER";
        const zIndex = INFINITY + 1;
        rectBoundary.zIndex = zIndex;
        rectBoundary.toObject = function () {
          return this;
        };
        draft.canvas.clipPathContainer = clipPathRect as any;
        draft.canvas.add(rectBoundary);
        draft.canvas.moveTo(rectBoundary, zIndex);
        draft.canvas.renderAll();

        break;
      }

      case types.UPDATE_EDITOR: {
        draft.step += 1;
        break;
      }

      case types.SORT_OBJECTS: {
        if (!draft.canvas) return;

        draft.canvas.sortObjects();
        update();
        break;
      }

      case types.SET_CURRENT_ACTIVE_OBJECT_ID: {
        if (!depthCompare(draft.currentActiveObjectId, action.payload))
          draft.currentActiveObjectId = action.payload;
        break;
      }

      case types.SET_LIST_COLORS: {
        const listColors: IColor[] = action.payload;

        if (!draft.canvas || !listColors?.length) return;

        draft.listColors = listColors;
        // Display the latest selected color to canvas editor
        const latestColorSelect = listColors[listColors.length - 1];
        if (latestColorSelect?.hex)
          draft.canvas.backgroundColor = latestColorSelect.hex.split("/")[0];

        draft.canvas.renderAll();
        break;
      }

      case types.SET_HEATHER_BACKGROUND: {
        const canvas = draft.canvas;
        const heatherImageSrc: string = action.payload;

        if (!canvas) return;
        const canvasSize = canvas.getWidth() || 800;

        if (!heatherImageSrc) {
          canvas.setBackgroundImage(null as any, () => {
            canvas.renderAll();
          });
          return;
        }

        fabric.Image.fromURL(heatherImageSrc, img => {
          img.set({
            top: 0,
            left: 0,
            originX: "left",
            originY: "top",
            evented: false,
            selectable: false,
            id: randomId(),
          });
          img.scaleToWidth(canvasSize);
          img.scaleToHeight(canvasSize);

          canvas?.setBackgroundImage(img, () => {
            canvas.renderAll();
          });
        });
        break;
      }

      case types.SET_UPPER_BACKGROUND: {
        if (!draft.canvas) throw new Error("Canvas is not defined!");
        const image: fabric.Image = action.payload;
        if (!image) return;

        const zIndex = INFINITY - 1;

        image.zIndex = zIndex;
        image.selectable = false;
        image.evented = false;
        image.id = randomId();
        image.typeObject = "UPPER_BACKGROUND";
        image.toObject = function () {
          return this;
        };
        // draft.upperBackgroundImage = image.previewImage;
        // First, we need to delete the previous upper background (if has)
        draft.canvas.removeObjectHasTypeObject("UPPER_BACKGROUND");

        draft.canvas.add(image);
        draft.canvas.moveTo(image, zIndex);
        draft.canvas.renderAll();
        draft.canvas.sortObjects();
        break;
      }

      case types.DUPLICATE_CURRENT_ACTIVE_OBJECT: {
        if (!draft.canvas) throw new Error("Canvas is not defined!");
        const activeObj = draft.canvas.getActiveObject();
        if (!activeObj) return;

        const maxZIndex = draft.maxZIndex;

        /// Bug!
        return;
        activeObj.clone(function (cloned: fabric.Object) {
          const canvas = cloned.canvas;
          if (!canvas || !cloned.left || !cloned.top) return;
          cloned.set({
            left: cloned.left + 10,
            top: cloned.top + 10,
            evented: true,
            name: activeObj.name,
          });
          cloned.previewImage = activeObj.previewImage;
          cloned.id = randomId();
          cloned.typeObject = activeObj.typeObject;
          cloned.zIndex = maxZIndex + 1;

          console.log(cloned.type);

          canvas.discardActiveObject();
          canvas.add(cloned);
          canvas.renderAll();
          canvas.sortObjects();
          // canvas.moveTo(cloned, cloned.zIndex);
          // canvas.setActiveObject(cloned);
        });

        draft.maxZIndex += 1;
        update();
        break;
      }

      case types.ADD_IMAGE: {
        let {
          image,
          zIndex,
        }: { image: Required<fabric.Image>; zIndex: number } = action.payload;

        if (!draft.canvas || !image) return;

        const { x = 400, y = 400 } = draft?.clipPath?.getCenterPoint() || {};
        const dental = randomInteger(-20, 20);
        const clipPathWidth = draft.clipPath?.width || 600;
        const clipPathHeight = draft.clipPath?.height || 600;

        if (!zIndex) zIndex = draft.maxZIndex + 1;
        if (zIndex >= draft.maxZIndex) draft.maxZIndex = zIndex;

        image.set({
          originX: "left",
          originY: "top",
          originWidth: image.width,
          originHeight: image.height,
          top: x - clipPathWidth / 6 + dental,
          left: y - clipPathHeight / 6 + dental,
          typeObject: "IMAGE",
          zIndex,
          id: randomId(),
          clipPath: draft?.clipPath as fabric.Rect,
          toObject: function () {
            return this;
          },
        });

        const IMAGE_WIDTH = clipPathWidth / 3;

        if (image.height && image.width) {
          const scaleTo =
            image.height > image.width
              ? IMAGE_WIDTH / image.height
              : IMAGE_WIDTH / image.width;
          image.scale(scaleTo);
        }

        draft.canvas.add(image);
        draft.canvas.moveTo(image, zIndex);
        draft.canvas.setActiveObject(image);
        draft.currentActiveObjectId = image.id;
        draft.canvas.sortObjects();
        update();
        break;
      }

      case types.ADD_VECTOR: {
        if (!draft.canvas) return;

        let {
          vector,
          zIndex,
        }: { vector: Required<fabric.Object>; zIndex: number } = action.payload;

        const { x = 400, y = 400 } = draft?.clipPath?.getCenterPoint() || {};
        const dental = randomInteger(-20, 20);
        const clipPathWidth = draft.clipPath?.width || 600;
        const clipPathHeight = draft.clipPath?.height || 600;

        const IMAGE_WIDTH = clipPathWidth / 3;

        if (!zIndex) zIndex = draft.maxZIndex + 1;
        if (zIndex >= draft.maxZIndex) draft.maxZIndex = zIndex;

        vector.set({
          top: x - clipPathWidth / 6 + dental,
          left: y - clipPathHeight / 6 + dental,
          originX: "left",
          originY: "top",
          typeObject: "VECTOR",
          zIndex,
          id: randomId(),
          clipPath: draft?.clipPath as fabric.Rect,
          toObject: function () {
            return this;
          },
        });

        if (draft.clipPath) vector.clipPath = draft.clipPath as fabric.Rect;

        if (vector.height && vector.width) {
          const scaleTo =
            vector.height > vector.width
              ? IMAGE_WIDTH / vector.height
              : IMAGE_WIDTH / vector.width;
          vector.scale(scaleTo);
        }

        draft.canvas.add(vector);
        draft.canvas.moveTo(vector, zIndex);
        draft.canvas.setActiveObject(vector);
        draft.currentActiveObjectId = vector.id;
        draft.canvas.sortObjects();
        update();
        break;
      }

      case types.ADD_TEXT: {
        if (!draft.canvas) return;
        let { text, zIndex }: { text: fabric.Object; zIndex: number } =
          action.payload;

        const clipPathWidth = draft.clipPath?.width || 600;
        const clipPathHeight = draft.clipPath?.height || 600;
        const { x = 400, y = 400 } = draft?.clipPath?.getCenterPoint() || {};
        const dental = randomInteger(-20, 20);

        if (!zIndex) zIndex = draft.maxZIndex + 1;
        if (zIndex >= draft.maxZIndex) draft.maxZIndex = zIndex;
        text.set({
          top: x - clipPathWidth / 6 + dental,
          left: y - clipPathHeight / 6 + dental,
          originX: "left",
          originY: "top",
          zIndex,
          typeObject: "TEXT",
          id: randomId(),
          previewImage: TextPreviewImage,
          clipPath: draft.clipPath as fabric.Rect,
          toObject: function () {
            return this;
          },
        });

        draft.canvas.add(text);
        draft.canvas.moveTo(text, zIndex);
        draft.canvas.setActiveObject(text);
        draft.currentActiveObjectId = text.id;
        draft.canvas.sortObjects();
        update();
        break;
      }

      case types.SET_ACTIVE_OBJECT_HAS_ID: {
        if (!draft.canvas) return;

        const id: string | null = action.payload.id;

        if (id == null) {
          draft.canvas.discardActiveObject();
          return;
        }

        const index = draft.canvas.findIndexOfObjectHasId(id);
        if (index != null) {
          draft.canvas.setActiveObject(draft.canvas.item(index) as any);
          draft.currentActiveObjectId = id;
          draft.canvas.renderAll();
        }
        break;
      }

      case types.REMOVE_OBJECT_HAS_ID: {
        if (!draft.canvas) return;

        const id: string = action.payload.id;
        const index = draft.canvas.findIndexOfObjectHasId(id);
        if (index != null) {
          draft.canvas.remove(draft.canvas.item(index) as any);
          draft.canvas.renderAll();
          update();
        }
        break;
      }

      case types.LOCK_OBJECT_HAS_ID: {
        if (!draft.canvas) return;

        const id: string = action.payload.id;
        const index = draft.canvas.findIndexOfObjectHasId(id);
        if (index != null) {
          const objects = draft.canvas.getObjects();
          objects[index].selectable = false;
          objects[index].evented = false;
          draft.canvas.renderAll();
        }
        break;
      }

      case types.UNLOCK_OBJECT_HAS_ID: {
        if (!draft.canvas) return;

        const id: string = action.payload.id;
        const index = draft.canvas.findIndexOfObjectHasId(id);
        if (index != null) {
          const objects = draft.canvas.getObjects();
          objects[index].selectable = true;
          objects[index].evented = true;
          draft.canvas.renderAll();
        }
        break;
      }

      case types.HIDE_OBJECT_HAS_ID: {
        if (!draft.canvas) return;

        const id: string = action.payload.id;
        const index = draft.canvas.findIndexOfObjectHasId(id);
        if (index != null) {
          const objects = draft.canvas.getObjects();
          objects[index].opacity = 0;
          objects[index].selectable = false;
          objects[index].evented = false;
          draft.canvas.renderAll();
        }
        break;
      }

      case types.UNHIDE_OBJECT_HAS_ID: {
        if (!draft.canvas) return;

        const id: string = action.payload.id;
        const index = draft.canvas.findIndexOfObjectHasId(id);
        if (index != null) {
          const objects = draft.canvas.getObjects();
          objects[index].opacity = 1;
          objects[index].selectable = true;
          objects[index].evented = true;
          draft.canvas.renderAll();
        }
        break;
      }

      case types.OVERWRITE_ALL_OBJECT_Z_INDEX: {
        if (!draft.canvas) return;

        const listZIndex: number[] = action.payload.listZIndex;
        const objects = draft.canvas.getObjects();
        for (let i = 0; i < listZIndex.length; i++) {
          objects[i].zIndex = listZIndex[i];
        }
        console.log(listZIndex);
        draft.canvas.sortObjects();
        draft.canvas.renderAll();
        update();
        break;
      }

      case types.UNDO: {
        break;
      }

      case types.RESET_ALL: {
        if (!draft.canvas) return;

        const objects = draft.canvas.getObjects();
        objects.map(object => {
          if (
            !["BACKGROUND", "UPPER_BACKGROUND", "CLIP_PATH_BORDER"].includes(
              object.typeObject,
            )
          )
            draft?.canvas?.remove(object);
        });
        draft.canvas.renderAll();
        update();
        break;
      }
    }
  });

export default editorReducer;
