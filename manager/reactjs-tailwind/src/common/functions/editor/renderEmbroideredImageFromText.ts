export const stitchIt = (
  text: string,
  stitchLen: number,
  stitchOffset: number,
  threadThickness: number,
  size: number,
  font: string,
  col1: string,
  col2: string,
  shadowColor: string,
  offset: number,
  blur: number,
) => {
  const can = document.createElement("canvas");
  const ctx = can.getContext("2d");

  if (!ctx) throw console.error(new Error("Context is not defined!"));

  ctx.font = size + "px " + font;
  const width = ctx.measureText(text).width;
  can.width = width;
  can.height = size;
  ctx.font = size + "px " + font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.globalCompositeOperation = "source-over";
  ctx.lineCap = "butt";
  ctx.lineJoin = "bevel";
  ctx.fillStyle = col2;
  ctx.setTransform(1, 0, 0, 1, width / 2, size / 2);
  ctx.fillText(text, 0, 0);
  ctx.setLineDash([stitchLen, stitchLen]);
  var w = size,
    off = 0;
  ctx.globalCompositeOperation = "source-atop";
  while (w > 0) {
    ctx.lineWidth = w;
    ctx.strokeStyle = col1;
    ctx.lineDashOffset = off;
    ctx.strokeText(text, 0, 0);
    if (w > threadThickness) {
      w -= threadThickness / 2;
      ctx.lineWidth = w;
      ctx.lineDashOffset = off + stitchLen;
      ctx.strokeStyle = col2;
      ctx.strokeText(text, 0, 0);
      off += stitchLen * stitchOffset;
      w -= threadThickness / 2;
    } else {
      break;
    }
  }
  ctx.globalCompositeOperation = "destination-out";
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = col2;
  ctx.lineWidth = threadThickness / 2;
  ctx.lineDashOffset = off + stitchLen;
  ctx.strokeText(text, 0, 0);
  ctx.globalCompositeOperation = "destination-over";
  ctx.save();
  ctx.shadowColor = "#000";
  ctx.shadowOffsetX = offset;
  ctx.shadowOffsetY = offset;
  ctx.shadowBlur = blur;
  ctx.fillText(text, 0, 0);
  ctx.restore();
  ctx.globalCompositeOperation = "source-over";
  return can;
};

type ITextOption = {
  text: string;
  fontFamily: string;
};

export const renderEmbroideredImageFromText = (option: ITextOption) => {
  const { text, fontFamily } = option;
  const color = ["#DDD", "#888"];
  const image = stitchIt(
    text,
    4,
    18 / 100 + 0.8,
    4,
    80,
    fontFamily,
    color[0],
    color[1],
    "#0004",
    4,
    5,
  );
  return image.toDataURL();
};
