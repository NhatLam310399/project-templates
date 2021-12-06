export declare namespace IFindJobRoute {
  export interface Queries {
    career?: string;
    level?: string;
    salary?: string;
    type?: string;
    province?: string;
    page?: string | number;
    k?: string; // keywords
  }

  export type FullQueries = Queries;
}
