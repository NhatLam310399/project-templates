import { MutableRefObject, useEffect, useState } from "react";

import { renderLocation } from "common/functions/string/renderLocation";
import { ILocationType, IPlaceCreateInput, ILatLng } from "common/typings";
import { HA_NOI_LOCATION } from "constants/location";
import GoongMapLocationPicker from "components/GoongMapLocationPicker";
import { getPlaceAutoComplete, getPlaceDetail } from "services/goongMap";

interface ILocationMapInfo {
  field: MutableRefObject<IPlaceCreateInput>;
  location: MutableRefObject<ILocationType>;
  centerCoordinates?: number[];
}

const LocationMapInfo: React.FC<ILocationMapInfo> = props => {
  const { field, location, centerCoordinates } = props;
  const { province, district, ward } = location.current;
  const [centerPosition, setCenterPosition] =
    useState<ILatLng>(HA_NOI_LOCATION);

  useEffect(() => {
    if (centerCoordinates) {
      const [lng, lat] = centerCoordinates;
      setCenterPosition({ lng, lat });
    }
  }, [centerCoordinates]);

  const searchTextMap = renderLocation([
    ward?.name,
    district?.name,
    province?.name,
  ]);

  useEffect(() => {
    if (searchTextMap.length > 3) {
      getLatLngFromSearchText(searchTextMap);
    }
  }, [searchTextMap]);

  const getLatLngFromSearchText = async (searchText: string) => {
    try {
      const response = await getPlaceAutoComplete(searchText);
      const firstResult = response?.data?.predictions?.[0];
      if (firstResult) {
        const placeResponse = await getPlaceDetail(firstResult?.place_id);
        const { location: geoLocation } =
          placeResponse?.data?.result?.geometry || {};
        setCenterPosition(geoLocation);
        updateField(geoLocation);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateField = ({ lat, lng }: ILatLng) => {
    field.current.location.coordinates[0] = lng;
    field.current.location.coordinates[1] = lat;
  };

  const handleGoogleMapChange = (centerMark: ILatLng) => {
    if (!centerMark) return;
    updateField(centerMark);
  };

  return (
    <>
      <div id="geocoder" />
      <div className="w-full h-40">
        <GoongMapLocationPicker
          center={centerPosition}
          onChangeCenter={handleGoogleMapChange}
          zoom={12}
        />
      </div>
    </>
  );
};

export default LocationMapInfo;
