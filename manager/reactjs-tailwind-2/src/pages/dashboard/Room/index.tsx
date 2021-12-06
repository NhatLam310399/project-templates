import { PATH } from "constants/routes";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { setBreadCrumb } from "redux/actions/_config";
import CalendarManager from "./CalendarManager";
import RoomManager from "./RoomManager";

const Room: React.FC = props => {
  const dispatch = useDispatch();
  const { search = "" } = useLocation();

  const [navigationSelect, setNavigationSelect] = useState("room");

  useEffect(() => {
    if (search) {
      const searchParams = new URLSearchParams(search).get("q");
      setNavigationSelect(searchParams || "room");
    }
  }, [search]);

  return navigationSelect === "calendar" ? (
    <CalendarManager />
  ) : (
    <RoomManager />
  );
};

export default Room;
