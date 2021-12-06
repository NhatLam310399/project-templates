import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Container, Button } from "./styles";
import firebase from "common/utils/firebase";
import { PATH } from "common/constants/routes";

import { useRedirect } from "hooks/useRedirect";
import SVG from "designs/SVG";
import { IGetToken, IGraphQLResponse, IRootState } from "typings";
import { getToken } from "redux/actions/auth";
import { resetAction } from "redux/actions/common";
import { checkExistEmailOtherProvider } from "services/user";

interface ILoginBySocialMedia {
  onError?: (error: string) => void;
}

const LoginBySocialMedia: React.FC<ILoginBySocialMedia> = ({ onError }) => {
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const [loading, setLoading] = useState(false);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);
  const [token, setToken] = useState<IGetToken>({
    data: {
      idToken: "",
    },
    loginMethod: "phone",
  });

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      if (token?.loginMethod !== "google" && token?.loginMethod !== "facebook")
        return;
      setTimeout(() => {
        redirect(PATH.DASHBOARD);
      }, 1000);
    }
  }, [actionSuccess]);

  const handleLoginWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      ?.signInWithPopup(provider)
      ?.then(function (result: any) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result?.credential?.accessToken;
        const payload: IGetToken = {
          data: {
            idToken: token,
          },
          loginMethod: "google",
        };
        setToken(payload);
        // checkEmail(profileUser?.email, payload);
      })
      .catch(function (error) {
        console.error({ error });
      });
  };

  const handleLoginWithGoogle = () => {
    onError && onError("");
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      ?.signInWithPopup(provider)
      ?.then(function (result: any) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result?.credential?.idToken;
        const payload: IGetToken = {
          data: {
            idToken: token,
          },
          loginMethod: "google",
        };
        setToken(payload);
        const profileUser = result?.additionalUserInfo?.profile;
        checkEmail(profileUser?.email, payload);
      })
      .catch(function (error) {
        console.error({ error });
      });
  };
  const checkEmail = async (email: string, payload: IGetToken) => {
    try {
      setLoading(true);
      const response: IGraphQLResponse = await checkExistEmailOtherProvider({
        email,
      });
      setLoading(false);
      const { isExistEmailOtherProvider: result } = response?.data;
      if (!result) {
        dispatch(getToken(payload));
      } else {
        const error =
          "The account's email is already in use by another account. If you continue to have issues logging into your account, contact out ";
        onError && onError(error);
      }
    } catch (error) {
      console.error({ error });
      setLoading(false);
    }
  };
  return (
    <Container>
      <Button
        size="lg"
        icon={<SVG name="auth/facebook" width="25" height="24" />}
        variant="secondary"
        loading={token?.loginMethod === "facebook" && loading}
        onClick={handleLoginWithFacebook}
      >
        Log in with Facebook
      </Button>
      <Button
        size="lg"
        icon={<SVG name="auth/google" width="25" height="24" />}
        variant="secondary"
        loading={token?.loginMethod === "google" && loading}
        onClick={handleLoginWithGoogle}
      >
        Log in with Google
      </Button>
    </Container>
  );
};

export default LoginBySocialMedia;
