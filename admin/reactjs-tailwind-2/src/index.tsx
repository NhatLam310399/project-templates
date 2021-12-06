import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore, history } from "redux/store";
import Notification from "components/Notification";
import LinearProgress from "components/LinearProgress";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Loading from "designs/Loading";

export const { store, persister } = configureStore();

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persister}>
                <Suspense fallback={<Loading />}>
                    <ToastProvider>
                        <LinearProgress />
                        <Notification />
                        <App history={history} />
                    </ToastProvider>
                </Suspense>
            </PersistGate>
        </Provider>
    </StrictMode>,
    document.getElementById("root"),
);

reportWebVitals();
