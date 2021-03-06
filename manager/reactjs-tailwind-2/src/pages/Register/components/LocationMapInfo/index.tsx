import { MutableRefObject, useEffect, useState } from "react";

import { renderLocation } from "common/functions/string/renderLocation";
import { ILocation, IPlaceCreateInput, ILatLng } from "common/typings";

import GoongMapLocationPicker from "components/GoongMapLocationPicker";
import { HA_NOI_LOCATION } from "constants/location";

import { getPlaceAutoComplete, getPlaceDetail } from "services/goongMap";

interface ILocationMapInfo {
  field: MutableRefObject<IPlaceCreateInput>;
  location: MutableRefObject<ILocation>;
}

const LocationMapInfo: React.FC<ILocationMapInfo> = props => {
  const { field, location } = props;
  const { province, district, ward } = location.current;
  const [centerPosition, setCenterPosition] =
    useState<ILatLng>(HA_NOI_LOCATION);
  const searchTextMap = renderLocation([
    ward?.name,
    district?.name,
    province?.name,
  ]);

  const updateField = ({ lat, lng }: ILatLng) => {
    field.current.location.coordinates[0] = lng;
    field.current.location.coordinates[1] = lat;
  };

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

  const handleGoogleMapChange = (centerMark: ILatLng) => {
    if (!centerMark) return;
    updateField(centerMark);
  };

  return (
    <>
      <p className="mt-4 mb-2 leading-none text-lg text-black">
        Kéo thả vị trí trên bản đồ để định vị trí chính xác nhất.
      </p>
      <div id="geocoder" />
      <div className="w-full h-40">
        <GoongMapLocationPicker
          center={centerPosition}
          onChangeCenter={handleGoogleMapChange}
        />
      </div>
    </>
  );
};

export default LocationMapInfo;
