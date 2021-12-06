import React, { useMemo, Suspense } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";
import DashboardLayout from "layouts/Dashboard";
import Loading from "designs/Loading";
import { flattenedRoutes as routes, notFoundRoutes } from "./Routes";
import ErrorBoundary from "components/ErrorBoundary";

const Routers: React.FC = props => {
    const privateRoutes = useMemo(
        () => routes.filter(route => route.isPrivate),
        [],
    );
    const publicRoutes = useMemo(
        () => routes.filter(route => !route.isPrivate),
        [],
    );

    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path={notFoundRoutes.path}
                    component={notFoundRoutes.Component}
                />
                {/* Public routes */}
                <Route path="/account">
                    <Suspense fallback={<Loading />}>
                        <ErrorBoundary>
                            <Switch>
                                {publicRoutes.map((route, index) => {
                                    return (
                                        route.Component && (
                                            <Route
                                                path={route.path}
                                                exact
                                                component={route.Component}
                                                key={`public-route-${String(
                                                    index,
                                                )}`}
                                            />
                                        )
                                    );
                                })}
                                <Redirect path="*" to={notFoundRoutes.path} />
                            </Switch>
                        </ErrorBoundary>
                    </Suspense>
                </Route>

                {/* Dashboard routes */}
                <Route path="/">
                    <DashboardLayout {...props}>
                        <Suspense fallback={<Loading />}>
                            <ErrorBoundary>
                                <Switch>
                                    {privateRoutes.map((route, index) => {
                                        return (
                                            route.Component && (
                                                <PrivateRoute
                                                    exact
                                                    {...route}
                                                    key={`route-i-${String(
                                                        index,
                                                    )}`}
                                                />
                                            )
                                        );
                                    })}
                                    <Redirect
                                        path="*"
                                        to={notFoundRoutes.path}
                                    />
                                </Switch>
                            </ErrorBoundary>
                        </Suspense>
                    </DashboardLayout>
                </Route>
                {/* <Redirect path="*" to={notFoundRoutes.path} /> */}
            </Switch>
        </Router>
    );
};

export default Routers;
