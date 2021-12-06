import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";

function bindMiddleware(middleware: any) {
  // Just use redux devtools in dev mode
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
}

function makeStore<T>(initialState?: T) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware]),
  );
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}

// console.clear();
export const wrapper = createWrapper(makeStore, { debug: false });
