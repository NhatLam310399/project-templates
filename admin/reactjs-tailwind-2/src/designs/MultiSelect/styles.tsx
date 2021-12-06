import { colors } from "common/styles/colors";
export const selectStyles = {
    menu: (base: any) => ({
        ...base,
        zIndex: 99,
        background: colors.white,
        fontWeight: "400",
    }),
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: colors.secondary,
        marginLeft: "10px",
        color: colors.white,
        borderRadius: "0px",
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        color: colors.white,
        lineHeight: "1",
        fontSize: "13px",
        fontWeight: "400",
    }),
    multiValueRemove: (base: any) => ({
        ...base,
        lineHeight: "1",
    }),
    menuList: (base: any) => ({
        maxHeight: "350px",
        overflow: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        gridColumnGap: "90px",
        padding: "10px",
    }),
    group: (base: any) => ({
        marginBottom: "20px",
        gridColumn: "span 4 / span 4",
    }),
    groupHeading: (base: any) => ({
        background: colors.white,
        color: colors.primary,
        fontSize: "16px",
        padding: "10px 20px",
    }),
    option: (base: any) => ({
        ...base,
        padding: "10px 20px",
        background: colors.white,
        color: colors.black,
        fontSize: "14px",
    }),
    placeholder: (base: any) => ({
        ...base,
        color: colors.body,
    }),
};

export const theme = (themeConfig: any) => ({
    ...themeConfig,
    spacing: {
        ...themeConfig.spacing,
        controlHeight: 50,
        baseUnit: 4,
    },
    colors: {
        ...themeConfig.colors,
        primary25: "rgba(36, 0, 70, 0.15)",
        primary50: "rgba(36, 0, 70, 0.50)",
        primary75: "rgba(36, 0, 70, 0.75)",
        primary: "#240046",
    },
});
