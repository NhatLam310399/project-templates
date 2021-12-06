import { fabric } from "fabric";
import * as types from "redux/types/editor";
import { IColor, IColorSchema, IRectCanvas } from "typings";

export const initCanvas = (payload: fabric.Canvas) => ({
  type: types.INIT_CANVAS,
  payload,
});

export const setClipPath = (payload: IRectCanvas) => ({
  type: types.SET_CLIP_PATH,
  payload,
});

export const setCurrentActiveObjectID = (payload: string | null) => ({
  type: types.SET_CURRENT_ACTIVE_OBJECT_ID,
  payload,
});

export const updateEditor = () => ({
  type: types.UPDATE_EDITOR,
});

export const sortObjects = () => ({
  type: types.SORT_OBJECTS,
});

export const duplicateCurrentActiveObject = () => ({
  type: types.DUPLICATE_CURRENT_ACTIVE_OBJECT,
});

// BG
export const setHeatherBackground = (imageSrc: string | null) => ({
  type: types.SET_HEATHER_BACKGROUND,
  payload: imageSrc,
});

export const setUpperBackground = (image: fabric.Image) => ({
  type: types.SET_UPPER_BACKGROUND,
  payload: image,
});

export const setListColors = (color: IColor[]) => ({
  type: types.SET_LIST_COLORS,
  payload: color,
});

export const addVector = (vector: fabric.Object, zIndex?: number) => ({
  type: types.ADD_VECTOR,
  payload: { vector, zIndex },
});

export const addImage = (image: fabric.Image, zIndex?: number) => ({
  type: types.ADD_IMAGE,
  payload: { image, zIndex },
});

export const addText = (text: fabric.Text, zIndex?: number) => ({
  type: types.ADD_TEXT,
  payload: { text, zIndex },
});

export const setActiveObjectHasId = (id: string | null) => ({
  type: types.SET_ACTIVE_OBJECT_HAS_ID,
  payload: { id },
});

export const removeObjectHasId = (id: string) => ({
  type: types.REMOVE_OBJECT_HAS_ID,
  payload: { id },
});

export const hideObjectHasId = (id: string) => ({
  type: types.HIDE_OBJECT_HAS_ID,
  payload: { id },
});

export const unhideObjectHasId = (id: string) => ({
  type: types.UNHIDE_OBJECT_HAS_ID,
  payload: { id },
});

export const lockObjectHasId = (id: string) => ({
  type: types.LOCK_OBJECT_HAS_ID,
  payload: { id },
});

export const unlockObjectHasId = (id: string) => ({
  type: types.UNLOCK_OBJECT_HAS_ID,
  payload: { id },
});

export const overwriteAllObjectZIndex = (listZIndex: number[]) => ({
  type: types.OVERWRITE_ALL_OBJECT_Z_INDEX,
  payload: { listZIndex },
});

export const undo = () => ({
  type: types.UNDO,
});

export const redo = () => ({
  type: types.REDO,
});

export const resetAll = () => ({
  type: types.RESET_ALL,
});
