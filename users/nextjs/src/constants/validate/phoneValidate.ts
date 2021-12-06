export const phoneRegExp = /([0|84]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;

export const regexPhoneNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

export const isPhoneNumber = (phone: string): boolean => {
  return regexPhoneNumber.test(phone);
};
