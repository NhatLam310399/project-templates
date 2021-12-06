import React, { useEffect } from "react";
import { History } from "history";
import i18n from "language";
import { I18nextProvider } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/reducers";
import { LANGUAGE_KEY } from "constants/localStore";
import { setLanguage } from "redux/actions/_config";
import { ConnectedRouter } from "connected-react-router";
import Routes from "routes";

// Style
import "common/styles/index.scss";
import "@szhsin/react-menu/dist/index.css";
import "react-tagsinput/react-tagsinput.css";

interface IAppProps {
    history: History;
}

const App: React.FC<IAppProps> = (props: IAppProps) => {
    const dispatch = useDispatch();

    const { history } = props;

    const { language = "vi" } = useSelector(
        (state: IRootState) => state._config,
    );

    useEffect(() => {
        let languageSelected = "vi";
        if (typeof window.localStorage !== "undefined") {
            languageSelected = localStorage.getItem(LANGUAGE_KEY) || language;
        }
        i18n.changeLanguage(languageSelected);
        dispatch(setLanguage(languageSelected));
    }, [language]);

    return (
        <I18nextProvider i18n={i18n}>
            <ConnectedRouter history={history}>
                <Routes />
            </ConnectedRouter>
        </I18nextProvider>
    );
};

export default App;
