import { all } from "redux-saga/effects";
import auth from "./auth";
import ads from "./ads";
import booking from "./booking";
import coupon from "./coupon";
import company from "./company";
import categories from "./categories";
import document from "./document";
import karaoke from "./karaoke";
import notificationApi from "./notificationApi";
import orders from "./orders";
import location from "./location";
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

export default function* rootSaga() {
  yield all([
    auth(),
    users(),
    location(),
    types(),
    ads(),
    coupon(),
    staticPage(),
    company(),
    karaoke(),
    profile(),
    request(),
    categories(),
    document(),
    notificationApi(),
    orders(),
    booking(),
    room(),
    homepage(),
    careStaff(),
    transaction(),
    trade(),
  ]);
}
