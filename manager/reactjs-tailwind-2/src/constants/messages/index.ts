export type IMessage = {
  en: string;
  vi: string;
};

export const messages: IMessage[] = [
  {
    en: "The phone number must be of the registered account!",
    vi: "Số điện thoại của bạn chưa được đăng kí!. Vui lòng đăng kí trước khi tạo yêu cầu!",
  },
  {
    en: "The request phoneNumber is exist!",
    vi: "Số điện thoại đã tồn tại. Vui lòng nhập số khác!",
  },
  {
    en: "Phone number, email or username already exists !",
    vi: "Số điện thoại / email / tên tài khoản đã tồn tại. Vui lòng thử lại!",
  },
  {
    en: "Phone number already exists!",
    vi: "Số điện thoại đã tồn tại!",
  },
  {
    en: "The Karaoke isn't exists !",
    vi: "Công ty hoặc quán karaoke không tồn tại. Vui lòng kiểm tra lại!",
  },
];

export const verifierMessages = [
  {
    code: "auth/invalid-phone-number",
    vi: "Sô điện thoại không hợp lệ!",
  },
  {
    code: "auth/captcha-check-failed",
  },
];
