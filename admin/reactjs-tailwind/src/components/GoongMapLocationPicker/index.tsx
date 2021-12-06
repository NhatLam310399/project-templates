/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "@goongmaps/goong-map-react";
import { ViewState } from "@goongmaps/goong-map-react/src/goong/goong";

import "@goongmaps/goong-js/dist/goong-js.css";
import { ILatLng } from "common/typings";
import SVG from "designs/SVG";

const ACCESS_TOKEN = `${process.env.REACT_APP_GOONG_MAP_TILES_KEY}`;

interface IGoongMapProps {
  className?: string;
  center?: ILatLng;
  zoom?: number;
  onChangeCenter?: (centerPoint: ILatLng) => void;
}

const GoongMapLocationPicker = (props: IGoongMapProps) => {
  const { center, zoom = 9, className = "", onChangeCenter } = props;
  const [viewport, setViewport] = useState<ViewState>({
    latitude: center?.lat || 10.840661,
    longitude: center?.lng || 106.745649,
    zoom,
  });

  useEffect(() => {
    if (center) {
      setViewport(state => ({
        ...state,
        latitude: center?.lat,
        longitude: center?.lng,
      }));
    }
  }, [center]);

  const handleViewportChange = (view: ViewState) => {
    setViewport(view);
    onChangeCenter?.({ lat: view.latitude, lng: view.longitude });
  };
  return (
    <>
      <ReactMapGL
        width="100%"
        height="100%"
        style={{ maxWidth: "100%" }}
        {...viewport}
        onViewportChange={handleViewportChange}
        goongApiAccessToken={ACCESS_TOKEN}
      >
        <Marker longitude={viewport.longitude} latitude={viewport.latitude}>
          <SVG
            name="common/map-marker"
            className="CENTER-POINT transform -translate-x-1/2 -translate-y-full"
          />
        </Marker>
      </ReactMapGL>
    </>
  );
};

export default GoongMapLocationPicker;
