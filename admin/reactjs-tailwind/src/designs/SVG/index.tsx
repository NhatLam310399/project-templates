import React from "react";

interface ISVGProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  className?: string;
  /**
   * @description Name of svg file
   * @example
   *  We have a folder tree like this
   *   + assets/svg
   *   |-- dog.svg    --> <SVG name="dog" />
   *   |-- cat.svg    --> <SVG name="cat" />
   *   |-- animal
   *       |-- ant.svg --> <SVG name="animal/ant" />
   */
  name: string;
}

const SVG: React.FC<ISVGProps> = props => {
  const { name = "", ...rest } = props;

  return (
    <img
      src={require(`assets/svg/${name}.svg`)?.default}
      alt={`${name} icon`}
      {...(rest as any)}
    />
  );
};

export default SVG;
