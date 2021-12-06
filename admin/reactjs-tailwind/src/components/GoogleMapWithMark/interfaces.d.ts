export type ILatLng = {
  lat?: number;
  lng?: number;
};

export type IMark = {
  position: ILatLng;
};

export interface IGoogleMapsProps {
  className?: string;
  center?: ILatLng;
  zoom?: number;
  marks?: IMark[];
}
