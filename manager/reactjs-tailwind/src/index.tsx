import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore, history } from "redux/store";
import Toast from "components/Toast";
import PageLoading from "components/PageLoading";

export const { store, persister } = configureStore();

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persister}>
        <Toast>
          <PageLoading />
          <App history={history} />
        </Toast>
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById("root"),
);

reportWebVitals();
