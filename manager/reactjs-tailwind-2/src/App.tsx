import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { History } from "history";
import Routes from "routes";
import { ConnectedRouter } from "connected-react-router";

import "common/styles/index.scss";

interface IAppProps {
  history: History;
}

const App: React.FC<IAppProps> = (props: IAppProps) => {
  const dispatch = useDispatch();
  const { history } = props;
  return (
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  );
};

export default App;
