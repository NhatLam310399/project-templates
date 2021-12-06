export interface IImageSizeInput {
  width?: number;
  height?: number | null;
}
export interface ICustomSizeImages {
  default?: string;
  medium?: string;
  small?: string;
}
export interface ICustomSizeImagesInput {
  medium?: IImageSizeInput;
  small?: IImageSizeInput;
}

export interface IURLCustomSizeImages extends ICustomSizeImages {}
