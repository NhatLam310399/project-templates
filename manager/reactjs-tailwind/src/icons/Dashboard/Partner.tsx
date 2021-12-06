/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const PartnerIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.672 6.76423C18.5879 6.75251 18.5037 6.75251 18.4196 6.76423C16.5566 6.70562 15.0781 5.21678 15.0781 3.38798C15.0781 1.524 16.6287 0 18.5518 0C20.463 0 22.0255 1.51228 22.0255 3.38798C22.0135 5.21678 20.5351 6.70562 18.672 6.76423Z"
      fill="currentColor"
    />
    <path
      d="M22.591 14.8881C21.2447 15.7674 19.3576 16.0956 17.6148 15.8729C18.0715 14.9116 18.3119 13.8448 18.3239 12.7194C18.3239 11.5471 18.0595 10.4334 17.5547 9.46034C19.3336 9.22588 21.2207 9.55412 22.5789 10.4334C24.4781 11.6526 24.4781 13.6572 22.591 14.8881Z"
      fill="currentColor"
    />
    <path
      d="M5.34148 6.76423C5.42562 6.75251 5.50976 6.75251 5.5939 6.76423C7.45696 6.70562 8.93538 5.21678 8.93538 3.38798C8.93538 1.51228 7.38484 0 5.46168 0C3.55054 0 2 1.51228 2 3.38798C2 5.21678 3.47843 6.70562 5.34148 6.76423Z"
      fill="currentColor"
    />
    <path
      d="M5.47499 12.7196C5.47499 13.8567 5.7274 14.9352 6.18415 15.9083C4.48937 16.0841 2.72247 15.7324 1.42434 14.9001C-0.474779 13.6692 -0.474779 11.6645 1.42434 10.4336C2.71045 9.58951 4.52543 9.24954 6.23223 9.43711C5.73942 10.4219 5.47499 11.5355 5.47499 12.7196Z"
      fill="currentColor"
    />
    <path
      d="M12.1699 16.2601C12.0738 16.2483 11.9656 16.2483 11.8574 16.2601C9.64581 16.1897 7.87891 14.4195 7.87891 12.239C7.89093 10.0117 9.72994 8.2063 12.0257 8.2063C14.3095 8.2063 16.1605 10.0117 16.1605 12.239C16.1485 14.4195 14.3936 16.1897 12.1699 16.2601Z"
      fill="currentColor"
    />
    <path
      d="M8.26358 18.6864C6.4486 19.8704 6.4486 21.8165 8.26358 22.9888C10.331 24.3369 13.7205 24.3369 15.7879 22.9888C17.6029 21.8048 17.6029 19.8587 15.7879 18.6864C13.7326 17.3383 10.343 17.3383 8.26358 18.6864Z"
      fill="currentColor"
    />
  </svg>
);

export default PartnerIcon;