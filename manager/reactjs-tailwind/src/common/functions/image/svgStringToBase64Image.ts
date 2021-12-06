import { createImage } from ".";

export const svgStringToImage = async (
  svgString: string,
  width: number,
  height: number,
  format: "png" | "jpeg" = "png",
) => {
  const svgData = btoa(unescape(encodeURIComponent(svgString)));
  // create canvas in memory(not in DOM)
  const canvas = document.createElement("canvas");
  // get canvas context for drawing on canvas
  const context = canvas.getContext("2d");
  // set canvas size
  canvas.width = width;
  canvas.height = height;

  // create image in memory(not in DOM)
  const image = await createImage(svgData);

  context?.clearRect(0, 0, width, height);
  context?.drawImage(image, 0, 0, width, height);

  const data = canvas.toDataURL(`image/${format}`);
  return data;
};
