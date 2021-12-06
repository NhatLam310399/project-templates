import { all } from "redux-saga/effects";
import contentWebsite from "./contentWebsite";
import staticPages from "./staticPages";
import auth from "./auth";
import location from "./location";
import recruitment from "./recruitment";
import ads from "./ads";
import carrerCounseling from "./careerCounseling";
import company from "./company";
import blog from "./blog";
import category from "./category";
import record from "./record";
import position from "./position";
import contact from "./contact";
import user from "./user";
import workLocation from "./workLocation";
import job from "./job";
import benefit from "./benefit";
import tag from "./tag";
import rating from "./rating";
import requestReview from "./requestReview";
import evaluate from "./evaluate";
import notify from "./notifications";
export default function* rootSaga() {
  yield all([
    auth(),
    contentWebsite(),
    staticPages(),
    recruitment(),
    location(),
    ads(),
    carrerCounseling(),
    company(),
    blog(),
    category(),
    record(),
    position(),
    contact(),
    user(),
    workLocation(),
    job(),
    tag(),
    benefit(),
    rating(),
    requestReview(),
    evaluate(),
    notify(),
  ]);
}
