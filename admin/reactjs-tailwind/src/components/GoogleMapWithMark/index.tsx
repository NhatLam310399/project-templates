import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { IGoogleMapsProps, ILatLng, IMark } from "./interfaces";

const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;

const GoogleMapWithMarks = (props: IGoogleMapsProps) => {
  const {
    center = {
      lat: 10.840661,
      lng: 106.745649,
    },
    marks = [],
    zoom = 15,
    className = "",
  } = props;

  return (
    <div className={` relative w-full ${className}`}>
      <Map
        googleMapURL={GOOGLE_MAP_URL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={zoom}
        center={center}
        marks={marks}
      />
    </div>
  );
};

export default GoogleMapWithMarks;

const Map = withScriptjs(
  withGoogleMap(
    (props: { center: ILatLng; defaultZoom: number; marks: IMark[] }) => {
      const { center: defaultCenter, defaultZoom, marks } = props;

      return (
        <GoogleMap defaultZoom={defaultZoom} center={defaultCenter}>
          {marks.map(mark => (
            <Marker position={mark.position} />
          ))}
        </GoogleMap>
      );
    },
  ),
);
