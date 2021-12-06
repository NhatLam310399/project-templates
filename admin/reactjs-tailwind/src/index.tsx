import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore, history } from "redux/store";
import { ToastProvider } from "react-toast-notifications";
import { PersistGate } from "redux-persist/integration/react";
import Notification from "components/Notification";
import Progress from "components/Progress";
import { defaultMaterialTheme } from "common/styles/muiTheme";
import { ThemeProvider } from "@material-ui/core";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

export const { store, persister } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={defaultMaterialTheme}>
      <PersistGate loading={<div />} persistor={persister}>
        <ToastProvider>
          <Progress />
          <Notification />
          <App history={history} />
        </ToastProvider>
      </PersistGate>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root"),
);

reportWebVitals();
