export interface IPointSetting {
    postPoint?: number;
    ratePoint?: number;
    viewPoint?: number;
    expiredTime?: number;
    defaultPoint?: number;
}

export interface IPointSettingInput {
    postPoint?: number;
    ratePoint?: number;
    viewPoint?: number;
    expiredTime?: number;
    defaultPoint?: number;
}

export interface IUpdatePointSetting {
    pointSettingInput: IPointSettingInput;
}
