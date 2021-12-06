import {
  IMongoObjectId,
  ICustomSizeImages,
  IUser,
  IProvince,
  IRecruitment,
  ICategoryLevel2,
  IBenefit,
  IUpload,
} from "@common/typings";

export interface IWorkExperience {
  companyName?: string;
  jobName?: string;
  timeStart?: Date;
  timeEnd?: Date;
  experience?: number;
  description?: string;
}

export interface IEducation {
  schoolName?: string;
  degree?: string;
  major?: string;
  timeStart?: Date;
  timeEnd?: Date;
  description?: string;
}

export interface IEmployerSeenRecord {
  employer: IUser;
  date: Date;
  views: number;
}

export interface IRecord {
  _id?: IMongoObjectId;
  user?: IUser;
  jobType?: string[];
  generalInformation?: string;
  workExperience?: IWorkExperience[];
  education?: IEducation[];
  workPlace: IProvince;
  career: ICategoryLevel2[];
  jobLevelWanted: string;
  salaryWanted: number;
  benefitsWanted: IBenefit[];
  employerSeenRecord: IEmployerSeenRecord[];
  description: string;
  urlCV: string;
  fileNameCV: string;
  slug: string;
  keywords: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRecordInput {
  user?: string;
  candidateCode?: string;
  generalInformation?: string;
  workExperience?: IWorkExperience[];
  education?: IEducation[];
  workPlace?: string;
  career?: string[];
  jobLevelWanted?: string;
  salaryWanted?: number;
  benefitsWanted?: string[];
  slug?: string;
  keywords?: string;
  urlCV?: IUpload;
  fileNameCV?: string;
  description?: string;
}


export interface IFilterRecord {
  displayName?: string;
  candidateCode?: string;
  point?: number;
  province?: string;
  experience?: number;
  jobType?: string;
}

export interface IGetAllRecord {
  filterRecord?: IFilterRecord;
  page?: number;
  size?: number;
}

export interface IGetRecordById {
  id: string | string[];
}

export interface IGetRecordByUserId {
  userId: string;
}

export interface IRecordUpdateInput {
  id: string;
  recordUpdateInput: IRecordInput;
}

export interface IRecordCreateInput {
  recordCreateInput: IRecordInput;
}
