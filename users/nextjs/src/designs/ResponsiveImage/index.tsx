import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

interface IResponsiveImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  smallSrc: string;
  largeSrc: string;
  alt: string;
  width: string | number;
  height: string | number;
  breakpoint?: number;
}

const ResponsiveImage: React.FC<IResponsiveImageProps> = (props) => {
  const { smallSrc = "", largeSrc = "", breakpoint = 700, ...rest } = props;
  return (
    <picture>
      <source media={`(min-width:${breakpoint}px)`} srcSet={largeSrc} />
      <source media={`(max-width:${breakpoint - 1}px)`} srcSet={smallSrc} />
      <img src={largeSrc} {...rest} />
    </picture>
  );
};

export default ResponsiveImage;
