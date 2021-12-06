import {
  IMongoObjectId,
  ICompany,
  IUser,
  IProvince,
  IDistrict,
  IWard,
  IStreet,
  ICustomSizeImages,
  IBenefit,
  ILocationTypeInput,
  ICategoryLevel2,
  IWorkLocation,
  IJobType,
  IJobLevel,
  IKeyWord,
  IBenefitType,
} from "@common/typings";

export interface IRecruitment {
  _id?: MongoObjectId;
  name?: string;
  type?: IJobType;
  level?: IJobLevel;
  view?: number;
  description?: string;
  requirement?: string;
  career?: ICategoryLevel2[];
  location?: IWorkLocation[];
  highlight?: boolean;
  user?: IUser;
  viewedUser?: IUser[];
  appliedUser?: IUser[];
  approvedUser?: IUser[];
  company?: ICompany;
  salaryMin?: number;
  salaryMax?: number;
  dealSalary?: boolean;
  email?: string;
  isApproved?: boolean;
  slug?: string;
  keywords?: IKeyWord[];
  expiredDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  companyName?: string;
  companySlug?: string;
  companySize?: string;
  companyLocation?: string;
  companyBenefit?: IBenefitType[];
  companyDescription?: string;
  companyLogo?: ICustomSizeImages;
  companyImages?: ICustomSizeImages[];
  companyVideo?: string;
}

export interface ISetSeenRecruitment {
  userId: string;
  recruitmentId: string;
}

export interface ISetAppliedRecruitment {
  userId: string;
  recruitmentId: string;
}

export interface ISetSavedRecruitment {
  userId: string;
  recruitmentId: string;
}

export interface IRemoveSavedRecruitment {
  userId: string;
  recruitmentId: string;
}

export type ISortTypeRecruitment =
  | "latest"
  | "oldest"
  | "highSalary"
  | "lowSalary";
enum SortType {
  latest,
  oldest,
  highSalary,
  lowSalary,
}

export interface IFilterRecruitment {
  name?: string;
  keywords?: string;
  slugProvince?: string;
  userCode?: string;
  slugCareer?: string;
  slugLevel?: string;
  slugLevelPrice?: string;
  highlight?: boolean;
  isApproved?: boolean;
  slugType?: string;
  sortType?: ISortTypeRecruitment;
  companyCode?: string;
  companyName?: string;
  companySlug?: string;
  isExpired?: boolean;
}

export interface IGetAllRecruitment {
  keyword?: string;
  filterRecruitment?: IFilterRecruitment;
  page?: number;
  size?: number;
}

export interface IGetRecruitmentByCompany {
  companyId: string;
}

export interface IGetRecruitmentByUser {
  userId: string;
}

export interface IRecruitmentInput {
  _id?: string;
  name?: string;
  type?: string;
  position?: string;
  number?: number;
  description?: string;
  requirement?: string;
  benefits?: IBenefit[];
  highlight?: boolean;
  user?: string;
  appliedUser?: IUser[];
  company?: string;
  salary?: number;
  showSalary?: boolean;
  language?: string;
  career?: string[];
  email?: string;
  keywords?: string;
  expiredDate?: Date | undefined | null;
  createdAt?: Date;
  updatedAt?: Date;
  isApproved?: boolean;
  locationTypeInput?: ILocationTypeInput;
}

export interface ICreateRecruitment {
  recruitmentCreateInput: IInputCreateRecruitment;
}
export interface IGetBestRecruitment {
  page?: number;
  size?: number;
}
