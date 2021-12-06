export type IMongoObjectId = string;
export type RenderProp<M, R = React.ReactNode> = R | ((modifiers: M) => R);

export interface IUrlParams {
  [k: string]: any;
}
export interface IById {
  id: string | undefined;
}
