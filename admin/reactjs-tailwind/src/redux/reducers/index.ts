import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import _config from "./_config";
import auth from "./auth";
import ads from "./ads";
import booking from "./booking";
import common from "./common";
import coupon from "./coupon";
import company from "./company";
import categories from "./categories";
import document from "./document";
import karaoke from "./karaoke";
import location from "./location";
import notification from "./notification";
import notificationApi from "./notificationApi";
import orders from "./orders";
import profile from "./profile";
import request from "./request";
import room from "./room";
import staticPage from "./staticPage";
import types from "./types";
import users from "./users";
import homepage from "./homepage";
import careStaff from "./careStaff";
import transaction from "./transaction";
import trade from "./trade";

export function createRootReducer(history: History) {
  return combineReducers({
    _config,
    auth,
    notification,
    common,
    location,
    users,
    coupon,
    types,
    ads,
    staticPage,
    company,
    karaoke,
    profile,
    request,
    categories,
    document,
    notificationApi,
    orders,
    booking,
    room,
    homepage,
    careStaff,
    transaction,
    trade,
    router: connectRouter(history),
  });
}

/**
 * @description Use IRootState to set interface for state for callback
 *  in useSelector
 */
export type IRootState = ReturnType<ReturnType<typeof createRootReducer>>;
