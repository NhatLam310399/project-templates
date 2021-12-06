/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

export const OutlineIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.79297 7.3328H9.16434V20.511V21.261H9.91434H13.6716H14.4216V20.511V7.3328H18.793H19.543V6.5828V3.42383V2.67383H18.793H4.79297H4.04297V3.42383V6.5828V7.3328H4.79297Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
