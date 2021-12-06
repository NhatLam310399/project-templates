import React from "react";
import Routes from "routes";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";

import "@szhsin/react-menu/dist/index.css";
import "common/styles/index.scss";

interface IAppProps {
  history: History;
}

const App: React.FC<IAppProps> = (props: IAppProps) => {
  const { history } = props;

  return (
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  );
};

export default App;
