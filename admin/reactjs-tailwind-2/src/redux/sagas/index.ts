import { all } from "redux-saga/effects";
import auth from "./auth";
import location from "./location";
import types from "./types";
import ads from "./ads";
import company from "./company";
import blog from "./blog";
import generalSetting from "./generalSetting";
import listUsers from "./listUsers";
import job from "./job";
import newsConfig from "./newsConfig";
import rating from "./rating";
import profile from "./profile";
import contact from "./contact";
import otherSetting from "./otherSetting";
import overview from "./overview";
export default function* rootSaga() {
    yield all([
        auth(),
        location(),
        types(),
        ads(),
        company(),
        blog(),
        generalSetting(),
        listUsers(),
        job(),
        rating(),
        profile(),
        contact(),
        otherSetting(),
        overview(),
        newsConfig(),
    ]);
}
