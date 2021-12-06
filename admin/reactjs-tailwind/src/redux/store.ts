import { createBrowserHistory } from "history";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// Redux
import { createRootReducer } from "redux/reducers";
import { applyMiddleware, compose, createStore } from "redux";

// Saga
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<any>(
  persistConfig,
  createRootReducer(history),
);

export const configureStore = () => {
  const composeEnhancer: typeof compose =
    (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(sagaMiddleware)),
  );

  const persister = persistStore(store);

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("redux/reducers", () => {
      store.replaceReducer(persistedReducer);
    });
  }
  sagaMiddleware.run(rootSaga);
  return { store, persister };
};

export default {
  configureStore,
  history,
};
