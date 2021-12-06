import { Redirect, Route } from "react-router-dom";
import { IRoute } from "common/typings";
import { isAuthenticated } from "common/utils/auth";
import { PATH } from "constants/routes";
import Meta from "components/Meta";

export default function PrivateRoute(props: IRoute): JSX.Element {
  const { Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated()) {
          return (
            <Redirect
              to={{
                pathname: PATH.ACCOUNT.LOGIN,
                state: { from: props.location },
              }}
            />
          );
        }
        return (
          <>
            <Meta title={rest.name} />
            <Component {...props} />
          </>
        );
      }}
    />
  );
}
