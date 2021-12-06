import { IMongoObjectId } from "common/formatTypes";

export interface INotifySetting {
    _id?: IMongoObjectId;
    name?: string;
    description?: string;
    permission?: string;
    keywords?: string;
    createdAt?: Date;
}

export interface IFilterNotifySetting {
    name?: string;
}

export interface IGetAllNotifySetting {
    filterNotifySetting: IFilterNotifySetting;
    page?: number;
    size?: number;
}

export interface INotifySettingInput {
    name: string;
    description?: string;
    permission?: string;
}

export interface ICreateNotifySetting {
    notifySettingInput: INotifySettingInput;
}

export interface IUpdateNotifySetting {
    id: string;
    notifySettingInput: INotifySettingInput;
}
