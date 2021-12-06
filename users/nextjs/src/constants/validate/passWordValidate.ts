export const passWordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const isPassWord = (password: string): boolean => {
  return passWordRegExp.test(password);
};
