import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import _config from "./_config";
import authReducer from "./auth";
import notification from "./notification";
import common from "./common";
import location from "./location";
import types from "./types";
import ads from "./ads";
import register from "./register";
import resetPassword from "./resetPassword";
import editor from "./editor";
import editorController from "./editorController";
import productTemplate from "./productTemplate";
import fileLibrary from "./fileLibrary";
import orderImport from "./orderImport";
import billingMethod from "./billingMethod";
import billingWallet from "./billingWallet";
import store from "./store";
import help from "./help";
import settingAccount from "./settingAccount";
import category from "./category";
import product from "./product";

import clipArt from "./clipArt"
import premiumImage from "./premiumImage"
import challenge from "./challenge"
export function createRootReducer(history: History) {
  return combineReducers({
    _config,
    auth: authReducer,
    notification,
    common,
    location,
    types,
    ads,
    register,
    resetPassword,
    editor,
    editorController,
    productTemplate,
    orderImport,
    billingMethod,
    billingWallet,
    fileLibrary,
    store,
    help,
    settingAccount,
    category,
    product,
    clipArt,
    premiumImage,
    challenge,
    router: connectRouter(history),
  });
}

/**
 * @description Use IRootState to set interface for state for callback
 *  in useSelector
 */
export type IRootState = ReturnType<ReturnType<typeof createRootReducer>>;
