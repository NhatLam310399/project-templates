/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

export const ShadowIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.1963 24.0002V4.9052H3.37695V1.01758H21.6406V4.9052H14.837V24.0002H10.1963Z"
      fill="currentColor"
    />
    <path
      d="M9.17875 22.9826V3.88762H2.35938V0H20.623V3.888H13.8194V22.983H9.17875V22.9826Z"
      fill="currentColor"
    />
  </svg>
);
