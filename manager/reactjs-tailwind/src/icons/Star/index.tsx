/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const StarIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.49956 11.5135L11.2662 13.1868C11.7729 13.4935 12.3929 13.0402 12.2596 12.4668L11.5262 9.32017L13.9729 7.20017C14.4196 6.8135 14.1796 6.08017 13.5929 6.0335L10.3729 5.76017L9.11289 2.78684C8.88623 2.24684 8.11289 2.24684 7.88623 2.78684L6.62623 5.7535L3.40623 6.02684C2.81956 6.0735 2.57956 6.80684 3.02623 7.1935L5.47289 9.3135L4.73956 12.4602C4.60623 13.0335 5.22623 13.4868 5.73289 13.1802L8.49956 11.5135Z"
      fill="currentColor"
    />
  </svg>
);

export default StarIcon;
