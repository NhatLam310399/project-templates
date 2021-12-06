import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import _config from "./_config";
import auth from "./auth";
import notification from "./notification";
import common from "./common";
import location from "./location";
import types from "./types";
import ads from "./ads";
import listUser from "./listUsers";
import company from "./company";
import blog from "./blog";
import generalSetting from "./generalSetting";
import job from "./job";
import newsConfig from "./newsConfig";
import rating from "./rating";
import profile from "./profile";
import contact from "./contact";
import otherSetting from "./otherSetting";
import overview from "./overview";
export function createRootReducer(history: History) {
    return combineReducers({
        _config,
        auth,
        notification,
        common,
        location,
        types,
        ads,
        listUser,
        company,
        blog,
        generalSetting,
        job,
        rating,
        profile,
        contact,
        otherSetting,
        overview,
        newsConfig,
        router: connectRouter(history),
    });
}

/**
 * @description Use IRootState to set interface for state for callback
 *  in useSelector
 */
export type IRootState = ReturnType<ReturnType<typeof createRootReducer>>;
