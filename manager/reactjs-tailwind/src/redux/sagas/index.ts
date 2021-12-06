import { all } from "redux-saga/effects";
import auth from "./auth";
import location from "./location";
import types from "./types";
import ads from "./ads";
import user from "./user";
import help from "./help";
import category from "./category";
import clipArt from "./clipArt";
import premiumImage from "./premiumImage";
import challenge from "./challenge"

export default function* rootSaga() {
  yield all([auth(), location(), types(), ads(), user(), category(), help(), clipArt(), challenge(), premiumImage()]);
}

