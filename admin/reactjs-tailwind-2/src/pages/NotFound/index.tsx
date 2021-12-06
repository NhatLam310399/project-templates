import React from "react";
import Button from "designs/Button";
import SVG from "designs/SVG";
import { useHistory } from "react-router-dom";
import i18n, { t } from "language";

const NotFound: React.FC = () => {
    const history = useHistory();

    return (
        <div className="flex items-center justify-center h-screen phone:px-5">
            <div className="container flex flex-col-reverse px-7 items-center justify-between mx-auto laptop:flex-row">
                <div className="flex flex-col items-center w-full mt-4 laptop:items-start laptop:w-auto laptop:mt-0 font-sfpro">
                    <div className="w-full text-4xl font-black leading-tight text-center laptop:text-5xl text-primary laptop:text-left">
                        {t("notFoundPage.title-404")}
                    </div>
                    <div className="w-full text-2xl font-bold text-center phone:text-3xl desktop:text-4xl text-primary laptop:text-left desktop:-mt-2">
                        {t("notFoundPage.title")}
                    </div>
                    <div className="w-full mt-2 mb-4 text-xl text-center phone:text-20 laptop:text-left">
                        {t("notFoundPage.content")}
                    </div>
                    <div
                        className="w-full py-1 text-xl font-bold text-center text-white uppercase rounded cursor-pointer laptop:w-30 bg-gradient-to-b from-primary to-linear"
                        onClick={() => {
                            history.goBack();
                        }}
                    >
                        {t("notFoundPage.go-back")}
                    </div>
                </div>
                <SVG
                    name="error/not-found"
                    className="block mx-auto laptop:m-0"
                />
            </div>
        </div>
    );
};

export default NotFound;
