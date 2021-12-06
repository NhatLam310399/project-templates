import { Redirect, Route } from "react-router-dom";
import { IRoute } from "common/formatTypes";
import { isAuthenticated } from "common/utils/auth";
import { PATH } from "constants/routes";
import Meta from "components/Meta";

export default function PrivateRoute(props: IRoute): JSX.Element {
    const { Component, ...rest } = props;

    return (
        <Route
            {...rest}
            render={props => {
                const { name } = rest;
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
                        <Meta title={name} />
                        <Component {...props} />
                    </>
                );
            }}
        />
    );
}
