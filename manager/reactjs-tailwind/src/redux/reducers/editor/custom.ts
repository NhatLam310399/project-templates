import { fabric } from "fabric";
import { store } from "index";
import { EditorDeleteIcon } from "icons/EditorDelete";
import { updateEditor } from "redux/actions/editor";

fabric.Canvas.prototype.exportBase64PNG = function (
  scaleToWidth?: number | undefined,
) {
  if (!this) return "";

  const clipPath = this.clipPathContainer;

  const backgroundColor = this.backgroundColor;
  // Before take a shoot, we need to remove upper background and background color
  this.getObjects().forEach(object => {
    if (["BACKGROUND", "UPPER_BACKGROUND"].includes(object.typeObject)) {
      object.opacity = 0;
    }
  });
  this.backgroundColor = "transparent";
  const backgroundImageTemp = this.backgroundImage;
  this.backgroundImage = null as any;

  // Hide clipPath border
  const borderClipPath = this.getObjects().find(
    obj => obj.typeObject === "CLIP_PATH_BORDER",
  );
  borderClipPath?.set("stroke", "transparent");

  let multiplier = 1;

  if (scaleToWidth) {
    multiplier = scaleToWidth / (clipPath?.width || 400);
  }

  // Take screen shoot
  const base64ImageData = this.toDataURL({
    format: "png",
    quality: 1,
    left: clipPath?.left,
    top: clipPath?.top,
    width: clipPath?.width,
    height: clipPath?.height,
    multiplier,
  });

  // Redo
  this.getObjects().forEach(object => {
    if (["BACKGROUND", "UPPER_BACKGROUND"].includes(object.typeObject)) {
      object.opacity = 1;
    }
  });
  this.backgroundColor = backgroundColor;
  this.backgroundImage = backgroundImageTemp;

  return base64ImageData;
};

fabric.Canvas.prototype.exportMainObjects = function () {
  if (!this) return [];
  const data: fabric.Object[] = this.getObjects().filter(
    item =>
      !["BACKGROUND", "UPPER_BACKGROUND", "CLIP_PATH_BORDER"].includes(
        item.typeObject,
      ),
  );
  return data || [];
};

fabric.Canvas.prototype.importObjects = function (objects: fabric.Object[]) {
  for (let i = 0; i < objects.length; i++) {
    this.add(objects[i]);
  }
};

fabric.Canvas.prototype.sortObjects = function () {
  if (!this) return;
  this._objects.sort((a, b) => (a.zIndex > b.zIndex ? 1 : -1));
  this.renderAll();
};

fabric.Canvas.prototype.findIndexOfObjectHasId = function (id: string) {
  try {
    const index = this.getObjects().findIndex(object => object.id === id);
    return index;
  } catch (error) {
    console.error(error);
    return null;
  }
};

fabric.Canvas.prototype.removeObjectHasTypeObject = function (
  typeObject: fabric.ITypeObject,
) {
  if (typeObject && this) {
    const object = this.getObjects().find(obj => obj.typeObject === typeObject);
    if (object) {
      this.remove(object);
      return true;
    }
  }
  return false;
};

// Render Cursor
const deleteIconImage = document.createElement("img");
deleteIconImage.src = EditorDeleteIcon;

fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = "#49ffff";
fabric.Object.prototype.cornerStyle = "circle";
fabric.Object.prototype.cornerSize = 10;
fabric.Object.prototype.borderDashArray = [5, 5];
fabric.Object.prototype.borderColor = "#49ffff";
fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  cursorStyle: "pointer",
  mouseUpHandler: function (eventData, transform) {
    const target = transform.target;
    const canvas = target.canvas;
    if (canvas) {
      canvas.remove(target);
      canvas.renderAll();
      store.dispatch(updateEditor());
    }
    return true;
  },
  render: function (ctx, left, top, styleOverride, fabricObject) {
    const size = 24;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
    ctx.drawImage(deleteIconImage, -size / 2, -size / 2, size, size);
    ctx.restore();
  },
});
