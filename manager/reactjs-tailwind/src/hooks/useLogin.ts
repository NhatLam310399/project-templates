import { useState } from "react";
import { toast } from "react-toastify";

import { useRedirect } from "./useRedirect";
import { IGraphQLResponse, ILogin } from "typings";
import { login as loginService } from "services/auth";
import { setUserCookies } from "common/utils/auth";
import { PATH } from "common/constants/routes";
const useLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const redirect = useRedirect();
  const login = async (variables: ILogin) => {
    try {
      setLoading(true);
      const response: IGraphQLResponse = await loginService(variables);
      console.log("variables", variables)
      setLoading(false);
      const { login: result } = response?.data;
      console.log("result", result)
      if (result) {
        setUserCookies(result);
        redirect(PATH.DASHBOARD);
      } else {
        setError(
          "Please provide a valid email address and password. If you continue to have issues logging into your account, contact out ",
        );
      }
    } catch (error) { }
  };
  return { error, setError, login, loading };
};
export default useLogin;
