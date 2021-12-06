import { IProvince, ICompany } from "@common/typings";

export interface IWorkLocation {
  _id?: string;
  name?: string;
  province?: IProvince;
  location?: string;
  company?: ICompany;
  createdAt?: Date;
  updateAt?: Date;
}

export interface IGetWorkLocationByCompany {
  companyId: string;
}

export interface IWorkLocationInput {
  name?: string;
  province?: string;
  location?: string;
  company: string;
}

export interface ICreateWorkLocation {
  workLocationInput: IWorkLocationInput;
}

export interface IDeleteWorkLocation {
  id: string;
}

export interface IUpdateWorkLocation {
  id: string;
  workLocationInput: IWorkLocationInput;
}
