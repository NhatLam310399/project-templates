import React, { useEffect, useState } from "react";
import i18n, { t } from "language";
import { useDispatch, useSelector } from "react-redux";
import {
    IContentWebsiteUpdateInput,
    IRootState,
    IUpdateContentWebsite,
} from "common/formatTypes";
import { resetAction } from "redux/actions/common";
import { PATH } from "constants/routes";
import {
    getContentWebsiteById,
    updateContentWebsite,
} from "redux/actions/generalSetting";
import SingleImageUploader from "components/SingleImageUploader";
import Input from "designs/Input";
import { regexEmail, regexPhoneNumber } from "common/functions";
import Editor from "designs/Editor";
import { ValidatorForm } from "react-material-ui-form-validator";
import Button from "designs/Button";
import { setBreadcrumb } from "redux/actions/_config";
import TextArea from "designs/TextArea";
import {
    CUSTOM_SIZE_UPLOAD_LOGO,
    CUSTOM_SIZE_UPLOAD_PAGE_IMAGE,
} from "constants/image";
import { ASPECT_RATIO_16_9 } from "constants/aspect";

const CONTENT_WEBSITE_ID = "6108b313c388de2b31947186";

const CommonSettings = () => {
    const { language } = i18n;

    const dispatch = useDispatch();
    const { contentWebsite } = useSelector(
        (state: IRootState) => state.generalSetting,
    );
    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [formField, setFormField] = useState<IContentWebsiteUpdateInput>({});
    const [footerUser, setFooterUser] = useState<Record<string, string>>({
        footerInfo1: "",
        footerInfo2: "",
        footerInfo3: "",
        footerInfo4: "",
    });
    const [footerEmployer, setFooterEmployer] = useState<
        Record<string, string>
    >({ footerInfo1: "", footerInfo2: "", footerInfo3: "", footerInfo4: "" });

    useEffect(() => {
        getContentWebsiteAPI();
    }, []);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
        }
    }, [actionSuccess]);

    const getContentWebsiteAPI = () => {
        dispatch(getContentWebsiteById({ id: CONTENT_WEBSITE_ID }));
    };

    const handleSubmit = () => {
        const footerUserInfo = Object.values(footerUser);
        const footerEmployerInfo = Object.values(footerEmployer);
        const input = {
            ...formField,
            footerUserInfo,
            footerEmployerInfo,
            customSizeImageForWhiteLogo: CUSTOM_SIZE_UPLOAD_PAGE_IMAGE,
            customSizeImageForColorLogo: CUSTOM_SIZE_UPLOAD_PAGE_IMAGE,
        };
        const payload: IUpdateContentWebsite = {
            fieldsToUpdate: input,
            id: CONTENT_WEBSITE_ID,
        };
        dispatch(updateContentWebsite(payload));
    };

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("generalSetting.breadcrumb"),
                },
            ]),
        );
    };

    useEffect(() => {
        setupBreadcrumb();
    }, []);

    const {
        whiteLogo: whiteLogoValue,
        colorLogo: colorLogoValue,
        photos: photosValue,
    } = contentWebsite;

    return (
        <div className="w-full pb-3">
            <h1 className="mb-2 font-bold text-xxl">
                {t("generalSetting.breadcrumb")}
            </h1>
            <ValidatorForm
                onSubmit={handleSubmit}
                className="mt-3 space-y-2 font-medium font-sfpro"
            >
                <div className="grid items-stretch grid-cols-1 gap-2 laptop:grid-cols-2">
                    <div>
                        <p className="">
                            {t("generalSetting.white_logo")}
                            <span className="text-body">
                                {t("common.image-help-input")}
                            </span>
                        </p>
                        <SingleImageUploader
                            image={whiteLogoValue?.small || ""}
                            onChange={whiteLogo => {
                                setFormField(state => ({
                                    ...state,
                                    whiteLogo,
                                }));
                            }}
                            aspect={ASPECT_RATIO_16_9}
                            imageCrop={false}
                        />
                    </div>
                    <div>
                        <p className="">
                            {t("generalSetting.color_logo")}
                            <span className="text-body">
                                {t("common.image-help-input")}
                            </span>
                        </p>
                        <SingleImageUploader
                            image={colorLogoValue?.small || ""}
                            onChange={colorLogo => {
                                setFormField(state => ({
                                    ...state,
                                    colorLogo,
                                }));
                            }}
                            aspect={ASPECT_RATIO_16_9}
                        />
                    </div>
                    <div>
                        <p className="">
                            {t("generalSetting.main_img")}
                            <span className="text-body">
                                {t("common.image-help-input")}
                            </span>
                        </p>
                        <SingleImageUploader
                            image={photosValue?.small || photosValue?.default}
                            onChange={photos => {
                                setFormField(state => ({
                                    ...state,
                                    photos,
                                }));
                            }}
                            aspect={1}
                        />
                    </div>
                </div>
                <div className="grid items-stretch grid-cols-1 gap-2 laptop:grid-cols-2">
                    <Input
                        label={t("common.address")}
                        value={contentWebsite?.address}
                        name="address"
                        onChange={address => {
                            setFormField(state => ({
                                ...state,
                                address,
                            }));
                        }}
                    />
                    <Input
                        label={t("common.phone-number")}
                        value={contentWebsite?.phone}
                        name="phoneNumber"
                        onChange={phone => {
                            setFormField(state => ({
                                ...state,
                                phone,
                            }));
                        }}
                        validates={{
                            matchRegexp: {
                                regexp: regexPhoneNumber,
                                errorMessage: t("common.validate-phone"),
                            },
                        }}
                    />
                </div>
                <div className="grid grid-cols-1 gap-2 laptop:grid-cols-2">
                    <div>
                        <p className="mb-1 text-lg font-medium text-black">
                            {t("generalSetting.footer_user_1")}
                        </p>
                        <Editor
                            initValue={contentWebsite?.footerUserInfo?.[0]}
                            onChange={footerInfo1 => {
                                setFooterUser(state => ({
                                    ...state,
                                    footerInfo1,
                                }));
                            }}
                        />
                    </div>
                    <div>
                        <p className="mb-1 text-lg font-medium text-black">
                            {t("generalSetting.footer_user_2")}
                        </p>
                        <Editor
                            initValue={contentWebsite?.footerUserInfo?.[1]}
                            onChange={footerInfo2 => {
                                setFooterUser(state => ({
                                    ...state,
                                    footerInfo2,
                                }));
                            }}
                        />
                    </div>
                    <div>
                        <p className="mb-1 text-lg font-medium text-black">
                            {t("generalSetting.footer_user_3")}
                        </p>
                        <Editor
                            initValue={contentWebsite?.footerUserInfo?.[2]}
                            onChange={footerInfo3 => {
                                setFooterUser(state => ({
                                    ...state,
                                    footerInfo3,
                                }));
                            }}
                        />
                    </div>
                    <div>
                        <p className="mb-1 text-lg font-medium text-black">
                            {t("generalSetting.footer_user_4")}
                        </p>
                        <Editor
                            initValue={contentWebsite?.footerUserInfo?.[3]}
                            onChange={footerInfo4 => {
                                setFooterUser(state => ({
                                    ...state,
                                    footerInfo4,
                                }));
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2 laptop:grid-cols-2">
                    <div>
                        <p className="mb-1 text-lg font-medium text-black">
                            {t("generalSetting.footer_employer_1")}
                        </p>
                        <Editor
                            initValue={contentWebsite?.footerEmployerInfo?.[0]}
                            onChange={footerInfo1 => {
                                setFooterEmployer(state => ({
                                    ...state,
                                    footerInfo1,
                                }));
                            }}
                        />
                    </div>
                    <div>
                        <p className="mb-1 text-lg font-medium text-black">
                            {t("generalSetting.footer_employer_2")}
                        </p>
                        <Editor
                            initValue={contentWebsite?.footerEmployerInfo?.[1]}
                            onChange={footerInfo2 => {
                                setFooterEmployer(state => ({
                                    ...state,
                                    footerInfo2,
                                }));
                            }}
                        />
                    </div>
                    <div>
                        <p className="mb-1 text-lg font-medium text-black">
                            {t("generalSetting.footer_employer_3")}
                        </p>
                        <Editor
                            initValue={contentWebsite?.footerEmployerInfo?.[2]}
                            onChange={footerInfo3 => {
                                setFooterEmployer(state => ({
                                    ...state,
                                    footerInfo3,
                                }));
                            }}
                        />
                    </div>
                    <div>
                        <p className="mb-1 text-lg font-medium text-black">
                            {t("generalSetting.footer_employer_4")}
                        </p>
                        <Editor
                            initValue={contentWebsite?.footerEmployerInfo?.[3]}
                            onChange={footerInfo4 => {
                                setFooterEmployer(state => ({
                                    ...state,
                                    footerInfo4,
                                }));
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2 laptop:grid-cols-2">
                    <div>
                        <p className="mb-1 text-lg font-medium text-black">
                            {t("generalSetting.custom_code_header")}
                        </p>
                        <TextArea
                            label=""
                            name="customCodeHeader"
                            value={contentWebsite?.customCodeHeader}
                            onChange={customCodeHeader => {
                                setFormField(state => ({
                                    ...state,
                                    customCodeHeader,
                                }));
                            }}
                        />
                    </div>
                    <div>
                        <p className="mb-1 text-lg font-medium text-black">
                            {t("generalSetting.custom_code_footer")}
                        </p>
                        <TextArea
                            label=""
                            name="customCodeFooter"
                            value={contentWebsite?.customCodeFooter}
                            onChange={customCodeFooter => {
                                setFormField(state => ({
                                    ...state,
                                    customCodeFooter,
                                }));
                            }}
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        primary
                        className="w-13"
                        innerClassName="font-medium h-5 w-full"
                    >
                        {t("common.confirm")}
                    </Button>
                </div>
            </ValidatorForm>
        </div>
    );
};

export default CommonSettings;
