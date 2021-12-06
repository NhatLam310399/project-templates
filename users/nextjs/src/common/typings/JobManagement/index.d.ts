export * from "./my-job";
export * from "./employer-view-profile";

export interface ILayoutJobManagement {
  active?:
    | "PERSONAL_INFO"
    | "EVALUATED"
    | "MY_JOB"
    | "CHANGE_PASSWORD"
    | "EMPLOYER_VIEW_PROFILE";
}
