import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumb } from "redux/actions/_config";
import { t } from "language";
import { PATH } from "constants/routes";
import { useEffect, useState } from "react";
import Input from "designs/Input";
import { IRootState, IUpdatePointSetting } from "common/formatTypes";
import {
    getPointSetting,
    updatePointSetting,
} from "redux/actions/otherSetting";
import { ValidatorForm } from "react-material-ui-form-validator";
import Button from "designs/Button";

interface IPointSetting {}

const PointSetting: React.FC<IPointSetting> = props => {
    const dispatch = useDispatch();

    const { pointSetting } = useSelector(
        (state: IRootState) => state.otherSetting,
    );

    const [inputField, setInputField] = useState<IPointSetting>({});

    useEffect(() => {
        setupBreadcrumb();
        getPointSettingAPI();
    }, []);

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.point-setting"),
                },
            ]),
        );
    };

    const getPointSettingAPI = () => {
        dispatch(getPointSetting());
    };

    const handleChangeInput = (
        // using for all input have value with type below:
        value = "",
        name?: string,
    ) => {
        name && setInputField({ ...inputField, [name]: Number(value) });
    };

    const handleSubmit = () => {
        const payload: IUpdatePointSetting = {
            pointSettingInput: inputField,
        };
        dispatch(updatePointSetting(payload));
    };

    return (
        <div className="w-full">
            <h1 className="font-semibold text-xxl">
                {t("breadcrumb.point-setting")}
            </h1>
            <ValidatorForm
                onSubmit={handleSubmit}
                className="mt-3 font-medium font-sfpro"
            >
                <div className="grid grid-cols-2 gap-2">
                    <Input
                        className="col-span-2 laptop:col-span-1"
                        label={t("otherSetting.point.post")}
                        value={pointSetting?.postPoint}
                        name="postPoint"
                        onChange={handleChangeInput}
                        type="number"
                        helpInputText={t("otherSetting.point.help.post")}
                        placeholder={t("otherSetting.point.placeholder.post")}
                    />
                    <Input
                        className="col-span-2 laptop:col-span-1"
                        label={t("otherSetting.point.expired")}
                        value={pointSetting?.expiredTime}
                        name="expiredTime"
                        onChange={handleChangeInput}
                        type="number"
                        helpInputText={t("otherSetting.point.help.expired")}
                        placeholder={t(
                            "otherSetting.point.placeholder.expired",
                        )}
                    />
                    <Input
                        className="col-span-2 laptop:col-span-1"
                        label={t("otherSetting.point.rating")}
                        value={pointSetting?.ratePoint}
                        name="ratePoint"
                        onChange={handleChangeInput}
                        type="number"
                        helpInputText={t("otherSetting.point.help.rating")}
                        placeholder={t("otherSetting.point.placeholder.rating")}
                    />
                    <Input
                        className="col-span-2 laptop:col-span-1"
                        label={t("otherSetting.point.default")}
                        value={pointSetting?.defaultPoint}
                        name="defaultPoint"
                        onChange={handleChangeInput}
                        type="number"
                        helpInputText={t("otherSetting.point.help.default")}
                        placeholder={t(
                            "otherSetting.point.placeholder.default",
                        )}
                    />
                    <Input
                        className="col-span-2 laptop:col-span-1"
                        label={t("otherSetting.point.view")}
                        value={pointSetting?.viewPoint}
                        name="viewPoint"
                        onChange={handleChangeInput}
                        type="number"
                        helpInputText={t("otherSetting.point.help.view")}
                        placeholder={t("otherSetting.point.placeholder.view")}
                    />
                </div>
                <div className="flex justify-end w-full mt-3">
                    <Button
                        type="submit"
                        primary
                        className="w-16"
                        innerClassName="font-medium h-4.5 w-full normal-case text-lg"
                    >
                        {t("otherSetting.point.update")}
                    </Button>
                </div>
            </ValidatorForm>
        </div>
    );
};

export default PointSetting;
