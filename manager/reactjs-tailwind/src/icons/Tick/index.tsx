/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const TickIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.6534 8.05372L20.6535 8.05355C21.2388 7.46829 21.2388 6.53171 20.6535 5.94645C20.0683 5.36118 19.1317 5.36118 18.5464 5.94645L9 15.4929L5.85355 12.3464C5.26829 11.7612 4.3317 11.7612 3.74644 12.3464C3.16118 12.9317 3.16118 13.8683 3.74644 14.4536L7.93644 18.6436C8.5217 19.2288 9.46829 19.2288 10.0535 18.6436L20.6534 8.05372Z"
      fill="white"
      stroke="black"
    />
  </svg>
);

export default TickIcon;
