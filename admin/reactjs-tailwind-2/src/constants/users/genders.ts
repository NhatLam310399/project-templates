import { t } from "language";
import { IGender } from "common/formatTypes";

export const renderGenderOptions = () => {
    const genderOptions: IGender[] = [
        {
            name: t("common.male"),
            gender: "male",
        },
        {
            name: t("common.female"),
            gender: "female",
        },
    ];
    return genderOptions;
};
