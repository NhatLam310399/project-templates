export interface ITypePoint {
  type: string;
}

export interface IPointGeometry {
  type: ITypePoint;
  coordinates: number[];
}
export interface IPointInput {
  type: string;
  coordinates: number[];
}
