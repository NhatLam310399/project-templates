import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import firebase from "common/utils/firebase";
import "firebase/auth";
import { t } from "language";
import { setUserCookies, removeUserCookies } from "common/utils/auth";
import { IRootState, IPermissionType } from "common/formatTypes";
import { actionRemoveCurrentUser, getToken } from "redux/actions/auth";
import InputWithIcon from "designs/InputWithIcon";
import { setLoading } from "redux/actions/common";
import SVG from "designs/SVG";
import * as Icons from "designs/Icons/index";
import NotificationModal from "components/NotificationPopup";
import Button from "./component/Button";
import { regexPhoneNumber } from "common/functions";
import { showNotification } from "redux/actions/notification";

const window: {
    appVerifier: firebase.auth.RecaptchaVerifier | undefined;
    confirmResult: firebase.auth.ConfirmationResult | undefined;
} = {
    appVerifier: undefined,
    confirmResult: undefined,
};

// Disable this when Release the product
firebase.auth().settings.appVerificationDisabledForTesting = true;

const LoginPage: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isPassPhone, setIsPassPhone] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otpCode, setOtpCode] = useState("");

    const [errorAction, setErrorAction] = useState("");

    const { currentUser } = useSelector((state: IRootState) => state.auth);

    const handleLoginPhone = async (phone: string) => {
        const phoneNumberStandard = `+84${phone.slice(1, phone.length)}`;
        dispatch(setLoading(true));
        const captchaVerifier = new firebase.auth.RecaptchaVerifier("captcha", {
            size: "invisible",
        });
        window.appVerifier = captchaVerifier;
        try {
            const confirmResult = await firebase
                .auth()
                .signInWithPhoneNumber(phoneNumberStandard, window.appVerifier);
            if (!confirmResult) {
                setErrorAction(t("login.error-message.invalid-phone-number"));
            }
            setErrorAction("");
            setIsPassPhone(true);
            dispatch(setLoading(false));
            window.confirmResult = confirmResult;
        } catch (error) {
            console.error(error);
            dispatch(setLoading(false));
            setErrorAction(t("login.error-message.invalid-phone-number"));
        }
    };
    const handleVerifyOtpCode = async (otp: string) => {
        dispatch(setLoading(true));

        if (window.confirmResult) {
            try {
                const result = await window.confirmResult.confirm(otp);
                if (result) {
                    fnSendRequest();
                    setErrorAction("");
                }
            } catch (error) {
                console.error(error);

                setErrorAction(t("login.error-message.wrong-otp"));
                dispatch(setLoading(false));
            }
        }
    };

    const fnSendRequest = async () => {
        try {
            if (firebase.auth()?.currentUser) {
                const idToken: string =
                    (await firebase.auth().currentUser?.getIdToken(true)) || "";
                dispatch(getToken({ idToken }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const checkPermissionAccess = (permission: IPermissionType | undefined) => {
        if (permission === "ADMIN" || permission === "MANAGER") {
            dispatch(
                showNotification({
                    type: "success",
                    message: t("login.success-message.login"),
                }),
            );
            setTimeout(() => {
                history.push("/dashboard/overview");
            }, 1000);
        } else {
            dispatch(
                showNotification({
                    type: "warning",
                    message: t("login.error-message.permission"),
                }),
            );
            setTimeout(() => {
                location.reload();
            }, 2500);
            removeUserCookies();
            dispatch(actionRemoveCurrentUser());
        }
    };

    useEffect(() => {
        if (currentUser) {
            setUserCookies(currentUser);
            dispatch(setLoading(false));
            checkPermissionAccess(currentUser?.userInfo?.permission);
        }
    }, [currentUser]);
    return (
        <div className="items-center grid-cols-2 laptop:grid bg-primary">
            <div className="z-10 grid items-center h-full min-h-screen bg-white">
                <div className="max-w-lg px-2 mx-auto leading-none phone:px-5 font-sfpro">
                    <div className="mb-4 text-2xl text-center text-primary laptop:text-left phone:text-3xl">
                        <h1 className="mb-2 text-3xl font-bold">
                            {t("login.title")}
                        </h1>
                        <span className="block text-lg font-medium leading-normal phone:text-xl">
                            {t("login.message")}
                        </span>
                    </div>
                    <div className="mb-1 text-black rounded">
                        {!isPassPhone ? (
                            <InputWithIcon
                                label={t("login.phone")}
                                key="PHONE"
                                onChange={newValue => {
                                    setPhoneNumber(newValue);
                                }}
                                minLength={10}
                                maxLength={11}
                                initialValue={phoneNumber}
                                type="number"
                                className="bg-white"
                                placeholder={t("login.phone")}
                                Icon="+84"
                                onPressEnter={handleLoginPhone}
                                required
                                pattern={regexPhoneNumber}
                            />
                        ) : (
                            <InputWithIcon
                                label={t("login.otp")}
                                key="OPT"
                                initialValue={otpCode}
                                className="bg-white"
                                Icon=""
                                type="number"
                                placeholder={t("login.action.otp")}
                                onChange={value => {
                                    setOtpCode(value);
                                }}
                                maxLength={6}
                                onPressEnter={handleVerifyOtpCode}
                                required
                            />
                        )}
                        {errorAction && (
                            <span className="flex flex-row text-sm text-error">
                                <SVG
                                    name="common/error-icon"
                                    className="mr-0.5 text-error"
                                />
                                {errorAction}
                            </span>
                        )}
                    </div>

                    <div className="">
                        <Button
                            onClick={() => {
                                isPassPhone
                                    ? handleVerifyOtpCode(otpCode)
                                    : handleLoginPhone(phoneNumber);
                            }}
                            className="w-full bg-primary"
                        >
                            {t("login.action.login")}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="relative self-stretch hidden min-h-screen pr-10 laptop:flex">
                <Icons.BackgroundLogin className="inline-block mx-auto align-middle" />
            </div>
            <div id="captcha" />
        </div>
    );
};

export default LoginPage;
