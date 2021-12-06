import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import _config from "./_config";
import notification from "./notification";
import common from "./common";
import auth from "./auth";
import register from "./register";
import coupon from "./coupon";
import booking from "./booking";
import location from "./location";
import users from "./users";
import place from "./place";
import room from "./room";
import closingTime from "./closingTime";
import document from "./document";
import trade from "./trade";
import types from "./types";
import project from "./project";
import rating from "./rating";
import notificationApi from "./notificationApi";
import careStaff from "./careStaff";
import homepage from "./homepage";
import revenueKaraoke from "./revenueKaraoke";

export function createRootReducer(history: History) {
  return combineReducers({
    _config,
    notification,
    common,
    auth,
    register,
    booking,
    location,
    users,
    place,
    coupon,
    room,
    closingTime,
    document,
    trade,
    types,
    project,
    rating,
    notificationApi,
    careStaff,
    homepage,
    revenueKaraoke,
    router: connectRouter(history),
  });
}

/**
 * @description Use IRootState to set interface for state for callback
 *  in useSelector
 */
export type IRootState = ReturnType<ReturnType<typeof createRootReducer>>;
