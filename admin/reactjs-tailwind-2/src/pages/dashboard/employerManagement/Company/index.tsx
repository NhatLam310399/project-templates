import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";

import { ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";

import {
    IUser,
    ICompanyInput,
    IUpdateCompany,
    ICompany,
    ICreateCompany,
    IRootState,
    IUpdateCompanyInput,
    ICustomUploadInput,
} from "common/formatTypes";
import { regexPhoneNumber, regexUrl } from "common/functions/string/regex";

import { companySizes } from "constants/company";
import { PATH } from "constants/routes";
import { ASPECT_RATIO_16_9 } from "constants/aspect";
import {
    CUSTOM_SIZE_UPLOAD_LOGO,
    CUSTOM_SIZE_UPLOAD_PAGE_IMAGE,
} from "constants/image";

import MultipleImagesUploader, {
    IImage,
} from "components/MultipleImagesUploader";
import SingleImageUploader from "components/SingleImageUploader";

import Button from "designs/ButtonNormal";
import Input from "designs/Input";
import Select from "designs/Select";

import TextArea from "designs/TextArea";
import SVG from "designs/SVG";
import Checkbox from "designs/Checkbox";

import { createCompany, updateCompany } from "redux/actions/company";
import { setBreadcrumb } from "redux/actions/_config";
import { t } from "language";
import { resetAction } from "redux/actions/common";
import Editor from "designs/Editor";
import CareerSelect from "./components/CareerSelect";

const ActionCompanyPage: React.FC<RouteComponentProps> = props => {
    const state = props.location.state as IUser;
    const { employerCreated = {} } = useSelector(
        (state: IRootState) => state.listUser,
    );
    const { actionSuccess } = useSelector((state: IRootState) => state.common);
    const [editFieldCompany, setEditFieldCompany] = useState<ICompany>();
    const [user, setUser] = useState<IUser>();
    const [formFieldCompany, setFormFieldCompany] = useState<ICompanyInput>({});
    const [sizeSelected, setSizeSelected] = useState("");
    const [accuracy, setAccuracy] = useState(false);
    const [highlight, setHighlight] = useState(false);
    const [listImage, setListImage] = useState<ICustomUploadInput[]>([]);
    const [urlImages, setUrlImages] = useState<string[]>([]);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            history.push({
                pathname: PATH.MANAGE_EMPLOYER.SELF,
            });
        }
    }, [actionSuccess]);
    useEffect(() => {
        if (state) {
            if (state?.company) {
                setEditFieldCompany(state.company);
                state?.company?.highlight &&
                    setHighlight(state?.company?.highlight);
                state?.company?.isIdentified &&
                    setAccuracy(state?.company?.isIdentified);
                const imgs = state?.company?.images?.map(img => ({
                    type: "STRING",
                    url: {
                        default: img.default,
                        medium: img.medium,
                        small: img.small,
                    },
                })) as ICustomUploadInput[];
                setListImage(imgs);

                const listUrlImage = state?.company?.images?.map(
                    img => img.default || "",
                );
                setUrlImages(listUrlImage || []);
            }
            setUser(state);
        }
        setupBreadcrumb();
    }, [state]);

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.add-employer"),
                },
            ]),
        );
    };

    const onChangeCareer = (career: string[]) => {
        setFormFieldCompany(state => ({ ...state, career }));
    };

    const handleSubmitCompany = () => {
        const customLogo: ICustomUploadInput = {
            type: "STRING",
            url: {
                default: editFieldCompany?.logo?.default,
                small: editFieldCompany?.logo?.small,
                medium: editFieldCompany?.logo?.medium,
            },
        };

        if (formFieldCompany?.logo) {
            customLogo.file = formFieldCompany?.logo;
            (customLogo.type = "FILE"), delete customLogo.url;
        }

        const customImageCreate: File[] = listImage?.map(image => image.file!);
        const input: ICompanyInput = {
            ...formFieldCompany,
            customSizeForUploadLogo: CUSTOM_SIZE_UPLOAD_LOGO,
            images: customImageCreate,
            customSizeForUploadImage: CUSTOM_SIZE_UPLOAD_PAGE_IMAGE,
        };

        const inputUpdate: IUpdateCompanyInput = {
            career: formFieldCompany?.career,
            code: formFieldCompany?.code,
            name: formFieldCompany?.name,
            phoneNumber: formFieldCompany?.phoneNumber,
            contactName: formFieldCompany?.contactName,
            size: formFieldCompany?.size,
            videos: formFieldCompany?.videos,
            description: formFieldCompany?.description,
            logo: customLogo,
            images: listImage,
            highlight: formFieldCompany?.highlight,
            isIdentified: formFieldCompany?.isIdentified,
        };
        if (editFieldCompany) {
            const payload: IUpdateCompany = {
                id: editFieldCompany?._id!,
                companyUpdateInput: inputUpdate,
            };
            dispatch(updateCompany(payload));
        } else {
            const payload: ICreateCompany = {
                companyCreateInput: {
                    ...input,
                    user: employerCreated?._id || user?._id,
                },
            };
            dispatch(createCompany(payload));
        }
    };

    const handleChangeCompanyInput = (
        // using for all input have value with type below:
        value = "",
        name?: string,
    ) => {
        name && setFormFieldCompany({ ...formFieldCompany, [name]: value });
    };

    const handleBack = () => {
        history.push({
            pathname: PATH.MANAGE_EMPLOYER.ADD.ACCOUNT,
            state,
        });
    };
    const handleChangeListImage = (images: ICustomUploadInput[]) => {
        const customImage = images?.map(img => {
            if (typeof img === "string") {
                return {
                    type: "STRING",
                    url: {
                        default: img,
                        medium: img,
                        small: img,
                    },
                };
            }
            return {
                type: "FILE",
                file: img,
            };
        }) as ICustomUploadInput[];
        setListImage(customImage);
    };

    return (
        <div className="w-full">
            <h1 className="flex items-center mb-3 font-semibold leading-none text-xxl gap-x-3">
                <SVG
                    name="common/back"
                    onClick={handleBack}
                    className="cursor-pointer"
                />
                {t("manageEmployer.add-employer")}
            </h1>
            <h2 className="text-xl font-bold leading-none text-primary">
                {t("manageEmployer.company.title")}
            </h2>
            <ValidatorForm
                onSubmit={handleSubmitCompany}
                className="mt-2 font-medium font-sfpro"
            >
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col col-span-2 laptop:col-span-1 gap-y-2">
                        <Input
                            label={t("manageEmployer.company.name")}
                            value={editFieldCompany?.name}
                            name="name"
                            placeholder={t("manageEmployer.company.name")}
                            onChange={handleChangeCompanyInput}
                            validates={{
                                required: {
                                    errorMessage: t(
                                        "manageEmployer.error.company.name",
                                    ),
                                },
                            }}
                        />
                        <Input
                            label={t("manageEmployer.company.phone-number")}
                            type="number"
                            value={editFieldCompany?.phoneNumber}
                            name="phoneNumber"
                            placeholder={t(
                                "manageEmployer.placeholder.phone-number",
                            )}
                            onChange={handleChangeCompanyInput}
                            validates={{
                                required: {
                                    errorMessage: t(
                                        "manageEmployer.error.company.phone-number",
                                    ),
                                },
                                matchRegexp: {
                                    regexp: regexPhoneNumber,
                                    errorMessage: t("common.validate-phone"),
                                },
                            }}
                        />
                        <Input
                            label={t("manageEmployer.company.code")}
                            value={editFieldCompany?.code}
                            name="code"
                            type="number"
                            placeholder={t("manageEmployer.placeholder.code")}
                            onChange={handleChangeCompanyInput}
                        />
                        <Input
                            label={t("manageEmployer.company.contact-name")}
                            value={editFieldCompany?.contactName}
                            name="contactName"
                            placeholder={t(
                                "manageEmployer.placeholder.contact-name",
                            )}
                            onChange={handleChangeCompanyInput}
                        />
                        <Select
                            label={t("manageEmployer.company.size")}
                            options={companySizes}
                            value={sizeSelected}
                            placeholder={t("manageEmployer.placeholder.size")}
                            onSelectOption={option => {
                                setSizeSelected(option.name!);
                                setFormFieldCompany(state => ({
                                    ...state,
                                    size: option.name,
                                }));
                            }}
                        />
                    </div>
                    <div className="flex flex-col col-span-2 laptop:col-span-1 gap-y-2">
                        <div>
                            <p className="text-lg font-medium text-black mb-0.5">
                                {t("manageEmployer.company.logo")}
                            </p>
                            <SingleImageUploader
                                aspect={ASPECT_RATIO_16_9}
                                image={
                                    editFieldCompany?.logo?.default ||
                                    editFieldCompany?.logo?.small
                                }
                                onChange={logo => {
                                    setFormFieldCompany(state => ({
                                        ...state,
                                        logo,
                                    }));
                                }}
                            />
                        </div>
                        <div>
                            <p className="text-lg font-medium text-black mb-0.5">
                                {t("manageEmployer.company.image")}
                            </p>
                            <MultipleImagesUploader
                                images={urlImages}
                                onChange={handleChangeListImage}
                                imageCrop={false}
                                maxNumberImage={5}
                            />
                        </div>
                        <Input
                            label={t("manageEmployer.company.video")}
                            value={editFieldCompany?.videos}
                            name="videos"
                            placeholder={t("manageEmployer.placeholder.video")}
                            onChange={handleChangeCompanyInput}
                            validates={{
                                matchRegexp: {
                                    regexp: regexUrl,
                                    errorMessage:
                                        "Vui lòng nhập đúng định dạng đường dẫn",
                                },
                            }}
                        />
                    </div>
                </div>
                <CareerSelect
                    className="mt-2"
                    onChangeCareer={onChangeCareer}
                    company={editFieldCompany}
                />
                <Editor
                    className="mt-2"
                    label={t("manageEmployer.company.description")}
                    name="description"
                    initValue={editFieldCompany?.description}
                    onChange={handleChangeCompanyInput}
                    required
                    errorMessage={t("manageEmployer.error.company.description")}
                />
                <div className="mt-2">
                    <Checkbox
                        label={t("manageEmployer.company.is-auth")}
                        isChecked={accuracy}
                        onChange={isCheck => {
                            setAccuracy(isCheck),
                                setFormFieldCompany(state => ({
                                    ...state,
                                    isIdentified: isCheck,
                                }));
                        }}
                    />
                </div>
                <div className="mt-2">
                    <Checkbox
                        label={t("manageEmployer.company.highlight")}
                        isChecked={highlight}
                        onChange={isCheck => {
                            setHighlight(isCheck),
                                setFormFieldCompany(state => ({
                                    ...state,
                                    highlight: isCheck,
                                }));
                        }}
                    />
                </div>
                <div className="flex justify-end mt-3 gap-x-2">
                    {/* <Button
                        className="w-16 h-4.5 border border-primary text-primary"
                        to={PATH.MANAGE_EMPLOYER.SELF}
                    >
                        {t("manageEmployer.cancel")}
                    </Button> */}
                    <Button
                        type="submit"
                        className="w-16 h-4.5 bg-primary text-white"
                        primary
                    >
                        {t("manageEmployer.done")}
                    </Button>
                </div>
            </ValidatorForm>
        </div>
    );
};

export default ActionCompanyPage;
