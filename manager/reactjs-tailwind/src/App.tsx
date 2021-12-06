import React from "react";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";
import Routes from "routes";
import "common/scss/index.scss";

//css library
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface IAppProps {
  history: History;
}

const App: React.FC<IAppProps> = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  );
};

export default App;
