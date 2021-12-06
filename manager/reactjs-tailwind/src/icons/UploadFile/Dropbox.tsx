/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const Dropbox: React.FC<IIconSVGProps> = props => (
  <svg
    width="33"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_1230:25593)">
      <path
        d="M16.5242 7.53335L8.52424 12.6424L16.5242 17.7515L8.52424 22.8606L0.5 17.703L8.51818 12.594L0.5 7.53335L8.51818 2.42426L16.5242 7.53335ZM8.47576 24.4667L16.4758 19.3576L24.4758 24.4667L16.4758 29.5758L8.47576 24.4667ZM16.5242 17.703L24.5242 12.594L16.5242 7.52729L24.4818 2.42426L32.5 7.53335L24.4818 12.6424L32.5 17.7455L24.4818 22.8546L16.5242 17.703Z"
        fill="#0086FF"
      />
    </g>
    <defs>
      <clipPath id="clip0_1230:25593">
        <rect width="32" height="32" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export default Dropbox;
