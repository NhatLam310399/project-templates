import React, { useEffect, useState } from "react";
import i18n, { t } from "language";
import { useDispatch, useSelector } from "react-redux";
import { IUpdateSeoInput, IRootState, IUpdateSeo } from "common/formatTypes";
import { resetAction } from "redux/actions/common";
import Breadcrumb from "components/Breadcrumb";
import { PATH } from "constants/routes";
import { getSeo, updateSeo } from "redux/actions/generalSetting";
import Input from "designs/Input";
import Editor from "designs/Editor";
import { ValidatorForm } from "react-material-ui-form-validator";
import Button from "designs/Button";

import { RouteComponentProps } from "react-router-dom";
import { setBreadcrumb } from "redux/actions/_config";
import InputTags from "designs/InputTags";

const SeoSetting: React.FC<RouteComponentProps> = () => {
    const { language } = i18n;

    const dispatch = useDispatch();
    const { seo } = useSelector((state: IRootState) => state.generalSetting);
    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [formField, setFormField] = useState<IUpdateSeoInput>({
        language,
    });

    useEffect(() => {
        getSeoAPI();
    }, []);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
        }
    }, [actionSuccess]);

    const getSeoAPI = () => {
        dispatch(getSeo({ language: "vi" }));
    };

    const handleSubmit = () => {
        const payload: IUpdateSeo = {
            fieldsToUpdate: formField,
        };
        dispatch(updateSeo(payload));
    };

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.seo_setting"),
                },
            ]),
        );
    };

    useEffect(() => {
        setupBreadcrumb();
    }, []);
    return (
        <div>
            <h1 className="font-bold text-xxl">
                {t("breadcrumb.seo_setting")}
            </h1>
            <div className="">
                <ValidatorForm
                    onSubmit={handleSubmit}
                    className="mt-3 space-y-2 font-medium font-sfpro"
                >
                    <div className="grid items-stretch grid-cols-1 gap-2 laptop:grid-cols-2">
                        <div>
                            <p className="">
                                {t("generalSetting.seo.title")}{" "}
                                <span className="text-body">
                                    {t("generalSetting.seo.required-title")}
                                </span>{" "}
                            </p>
                            <Input
                                value={seo?.seoTitle}
                                name="seoTitle"
                                onChange={seoTitle => {
                                    setFormField(state => ({
                                        ...state,
                                        seoTitle,
                                    }));
                                }}
                            />
                        </div>
                        <div>
                            <p className="">
                                {t("generalSetting.seo.description")}{" "}
                                <span className="text-body">
                                    {t("generalSetting.seo.required-des")}
                                </span>{" "}
                            </p>
                            <Input
                                value={seo?.seoDescription}
                                name="seoDescription"
                                onChange={seoDescription => {
                                    setFormField(state => ({
                                        ...state,
                                        seoDescription,
                                    }));
                                }}
                            />
                        </div>

                        <Input
                            label="SEO Sitemap"
                            value={seo?.seoSiteMap}
                            name="seoSiteMap"
                            onChange={seoSiteMap => {
                                setFormField(state => ({
                                    ...state,
                                    seoSiteMap,
                                }));
                            }}
                        />
                        <InputTags
                            label={t("generalSetting.seo.keyword")}
                            value={seo?.seoKeyword}
                            onChange={seoKeyword => {
                                setFormField(state => ({
                                    ...state,
                                    seoKeyword,
                                }));
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-2 laptop:grid-cols-2">
                        <div>
                            <p className="mb-1 text-lg font-medium text-black">
                                {t("generalSetting.seo.content-homepage")}
                            </p>
                            <Editor
                                initValue={seo?.footerContentOfHomepage}
                                onChange={footerContentOfHomepage => {
                                    setFormField(state => ({
                                        ...state,
                                        footerContentOfHomepage,
                                    }));
                                }}
                            />
                        </div>
                        <div>
                            <p className="mb-1 text-lg font-medium text-black">
                                {t("generalSetting.seo.content-recruit-news")}
                            </p>
                            <Editor
                                initValue={seo?.footerContentOfJobPosting}
                                onChange={footerContentOfJobPosting => {
                                    setFormField(state => ({
                                        ...state,
                                        footerContentOfJobPosting,
                                    }));
                                }}
                            />
                        </div>
                        <div>
                            <p className="mb-1 text-lg font-medium text-black">
                                {t("generalSetting.seo.content-recruitment")}
                            </p>
                            <Editor
                                initValue={seo?.footerContentOfEmployee}
                                onChange={footerContentOfEmployee => {
                                    setFormField(state => ({
                                        ...state,
                                        footerContentOfEmployee,
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
        </div>
    );
};
export default SeoSetting;
