import { AnyAction, CombinedState, combineReducers, Reducer } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import _app from "./_app";
import actions from "./common";
import ads from "./ads";
import auth from "./auth";
import blog from "./blog";
import company from "./company";
import contentWebsite from "./contentWebsite";
import careerCounseling from "./careerCounseling";
import category from "./category";
import job from "./job";
import location from "./location";
import position from "./position";
import recruitment from "./recruitment";
import record from "./record";
import staticPages from "./staticPages";
import tag from "./tag";
import user from "./user";
import workLocation from "./workLocation";
import benefit from "./benefit";
import rating from "./rating";
import requestReview from "./requestReview";
import evaluate from "./evaluate";
import notify from "./notifications";
const reducers = combineReducers({
  _app,
  actions,
  ads,
  auth,
  blog,
  company,
  contentWebsite,
  careerCounseling,
  category,
  job,
  location,
  position,
  recruitment,
  record,
  staticPages,
  tag,
  user,
  workLocation,
  benefit,
  rating,
  requestReview,
  evaluate,
  notify,
});

const rootReducer: Reducer<CombinedState<IRootState>, AnyAction> = (
  state,
  action,
) => {
  /**
   * @description We are using Next-Redux-Wrapper and Saga
   * so, server will execute the dispatch in server, after dispatch new state will be passed to
   * client by dispatch the HYDRATE
   */
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return reducers(state, action);
  }
};
export default rootReducer;

/**
 * @description Use IRootState to set interface for callback's state
 *  in useSelector
 * @example
 *      const { cat } = useSelector(( state: IRootState ) => state.animal);
 */
export type IRootState = ReturnType<typeof reducers>;
