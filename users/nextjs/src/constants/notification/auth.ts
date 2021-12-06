import { useTranslation } from "next-i18next";

export const notificationMapping = (message: string) => {
  const { t } = useTranslation(["signin"]);

  switch (message) {
    case "Error.login phoneNumber or email or password incorrect !":
      return t("dialog-login-error");

    case "Error.createRecruitment Recruitment.expiredDate must be greater than current time !":
      return "Thời gian hết hạn bài đăng phải lớn hiện tại!";
    default:
      return message;
  }
};
