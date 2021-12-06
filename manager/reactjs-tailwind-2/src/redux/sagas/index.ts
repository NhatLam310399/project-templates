import { all } from "redux-saga/effects";
import auth from "./auth";
import booking from "./booking";
import locationSaga from "./location";
import users from "./users";
import place from "./place";
import request from "./request";
import room from "./room";
import coupon from "./coupon";
import closingTime from "./closingTime";
import project from "./project";
import document from "./document";
import trade from "./trade";
import types from "./types";
import rating from "./rating";
import notificationApi from "./notificationApi";
import careStaff from "./careStaff";
import message from "./message";
import homepage from "./homepage";
import revenueKaraoke from "./revenueKaraoke";

export default function* rootSaga() {
  yield all([
    auth(),
    booking(),
    locationSaga(),
    users(),
    place(),
    request(),
    room(),
    coupon(),
    closingTime(),
    project(),
    document(),
    trade(),
    types(),
    rating(),
    notificationApi(),
    careStaff(),
    message(),
    homepage(),
    revenueKaraoke(),
  ]);
}
