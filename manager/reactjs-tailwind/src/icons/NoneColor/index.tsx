/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const NoneColorIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.7071 0.707108L0.707107 22.7071L0 22L22 9.21615e-07L22.7071 0.707108Z"
      fill="rgba(0, 0, 0, 0.3)"
    />
  </svg>
);

export default NoneColorIcon;
