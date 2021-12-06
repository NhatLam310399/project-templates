import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import Button from "@designs/Button";
import InputBox from "@designs/Input";

import { Container, Form, Title, Wrapper } from "./style";
import { showNotification } from "@components/ToastNotification";
import { useDispatch, useSelector } from "react-redux";
import {
  IGraphQLResponse,
  IRootState,
  IUpdateUserPassword,
} from "@common/typings";
import { setLoading } from "@redux/actions/common";
import { PATH } from "@routes";
import { useRedirect } from "@common/hooks/useRedirect";
import { updateUserPassword } from "@services/auth";
import { removeCurrentUser } from "@redux/actions/auth";
import { errorMessageGraphql } from "@common/functions/printError";
import { useEffect, useState } from "react";

const ChangePassword: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation(["common", "job-management"]);
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const [enableChange, setEnableChange] = useState(true);
  const redirect = useRedirect();

  const userInfo = currentUser?.userInfo || {};
  useEffect(() => {
    if (!isEmpty(userInfo)) {
      const provider = userInfo?.provider;
      if (provider === "facebook" || provider === "google") {
        setEnableChange(false);
      }
    }
  }, [userInfo]);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      oldPassword: Yup.string().required(t("password.required")),
      newPassword: Yup.string().required(t("password.required")),
      confirmPassword: Yup.string().required(t("password.required")),
    }),

    onSubmit: (values) => {
      const newPass = values.newPassword;
      const confirmPass = values.confirmPassword;
      if (newPass === confirmPass) {
        const payload: IUpdateUserPassword = {
          updatePasswordInput: {
            username: userInfo?.username,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          },
        };
        updateUserPasswordAPI(payload);
      } else {
        showNotification({
          type: "error",
          title: t("common:notification.password-not-match"),
        });
      }
    },
  });
  const updateUserPasswordAPI = async (payload: IUpdateUserPassword) => {
    try {
      dispatch(setLoading(true));
      const response: IGraphQLResponse = await updateUserPassword(payload);
      dispatch(setLoading(false));

      const { updateUserPassword: result } = response?.data || {};

      if (result) {
        const redirectPath = PATH.LOGIN;
        showNotification({
          type: "success",
          title: t("common:notification.update-password-success"),
        });
        redirect(redirectPath);
        dispatch(removeCurrentUser());
      } else {
        const errorMessage = errorMessageGraphql(response);
        showNotification({
          type: "error",
          title: t("common:notification.update-password-failed"),
          message: errorMessage,
        });
      }
    } catch (error) {
      showNotification({
        type: "error",
        title: t("common:notification.update-password-failed"),
        message: error,
      });
    }
  };
  return (
    <Container>
      <Title>{t("header.change-password")}</Title>
      <Form onSubmit={formik.handleSubmit}>
        <Wrapper>
          <InputBox
            disabled={!enableChange}
            required
            label={t("password.old-password")}
            id="oldPassword"
            type="password"
            {...formik.getFieldProps("oldPassword")}
            {...formik.getFieldMeta("oldPassword")}
          />
        </Wrapper>
        <Wrapper>
          <InputBox
            disabled={!enableChange}
            required
            label={t("password.new-password")}
            id="newPassword"
            type="password"
            {...formik.getFieldProps("newPassword")}
            {...formik.getFieldMeta("newPassword")}
          />
        </Wrapper>
        <Wrapper>
          <InputBox
            disabled={!enableChange}
            required
            label={t("password.re-enter-newpassword")}
            id="confirmPassword"
            type="password"
            {...formik.getFieldProps("confirmPassword")}
            {...formik.getFieldMeta("confirmPassword")}
          />
        </Wrapper>
        <Wrapper>
          <Button className="px-5 py-1.5" primary type="submit">
            {t("common:update")}
          </Button>
        </Wrapper>
      </Form>
    </Container>
  );
};

export default ChangePassword;
