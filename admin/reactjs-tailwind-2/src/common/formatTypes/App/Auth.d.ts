import { IMongoObjectId, IUser } from "common/formatTypes";

export interface IGetToken {
    idToken: string | null;
}
export interface IDecodeToken {
    exp: number;
    iat?: number;
    id?: string;
}

export interface IAuth {
    accessToken?: string;
    refreshToken?: string;
    userId?: {
        id?: IMongoObjectId;
    };
    userInfo?: IUser;
}
