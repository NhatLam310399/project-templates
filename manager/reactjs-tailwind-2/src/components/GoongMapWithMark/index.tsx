/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useMemo, useState } from "react";
import ReactMapGL, { Marker } from "@goongmaps/goong-map-react";
import { ViewState } from "@goongmaps/goong-map-react/src/goong/goong";
import "@goongmaps/goong-js/dist/goong-js.css";

import { ILatLng, IMark } from "common/typings";
import SVG from "designs/SVG";

const ACCESS_TOKEN = `${process.env.REACT_APP_GOONG_MAP_TILES_KEY}`;

interface IGoongMapProps {
  className?: string;
  center?: ILatLng;
  zoom?: number;
  marks?: IMark[];
}

const GoongMapWithMark = (props: IGoongMapProps) => {
  const { center, zoom = 9, className = "", marks } = props;
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
  };

  const renderMarkers = useMemo(
    () =>
      marks?.map((mark, index) => (
        <Marker
          key={String(index)}
          longitude={mark?.position?.lng}
          latitude={mark?.position?.lat}
        >
          <SVG
            name="common/google-map-location-picker"
            className="CENTER-POINT transform -translate-x-1/2 -translate-y-full"
          />
        </Marker>
      )),
    [marks],
  );

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
        {renderMarkers}
      </ReactMapGL>
    </>
  );
};

export default GoongMapWithMark;
