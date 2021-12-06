/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const UploadNormal: React.FC<IIconSVGProps> = props => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.65693 7.48661H5.87943C4.18359 7.48661 2.80859 8.86161 2.80859 10.5574L2.80859 14.6199C2.80859 16.3149 4.18359 17.6899 5.87943 17.6899H15.1544C16.8503 17.6899 18.2253 16.3149 18.2253 14.6199V10.5491C18.2253 8.85827 16.8544 7.48661 15.1636 7.48661H14.3778"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5182 1.82533V11.8595"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.08594 4.26562L10.5151 1.82562L12.9451 4.26562"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default UploadNormal;
