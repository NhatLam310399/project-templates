export const getScaleWidthHeightFromObject = (object: fabric.Object) => {
  const { width = 100, height = 100, scaleX = 1, scaleY = 1 } = object;
  return {
    width: Number((width * scaleX).toFixed(1)),
    height: Number((height * scaleY).toFixed(1)),
    scaleX,
    scaleY,
  };
};
