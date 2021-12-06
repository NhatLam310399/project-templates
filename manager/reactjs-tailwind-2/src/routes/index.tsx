import React, { Suspense, useMemo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";
import Progress from "components/Progress";
import DashboardLayout from "layouts/Dashboard";
import {
  flattenedRoutes as routes,
  notFoundRoutes,
  homeRoutes,
  shareLinkRouter,
} from "./Routes";

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
    <Suspense fallback={<Progress />}>
      <Router>
        <Switch>
          <Route
            exact
            path={notFoundRoutes.path}
            component={notFoundRoutes.Component}
          />
          {/* Dashboard routes */}
          <Route path="/dashboard">
            <DashboardLayout {...props}>
              <Suspense fallback={<Progress />}>
                <Switch>
                  {privateRoutes.map((route, index) => {
                    return (
                      route.Component && (
                        <PrivateRoute
                          exact
                          {...route}
                          key={`route-i-${String(index)}`}
                        />
                      )
                    );
                  })}
                  <Redirect path="*" to={notFoundRoutes.path} />
                </Switch>
              </Suspense>
            </DashboardLayout>
          </Route>

          {/* Public routes */}
          {publicRoutes?.map((route, index) => {
            return (
              route.Component && (
                <Route
                  path={route.path}
                  exact
                  component={route.Component}
                  key={`public-route-${String(index)}`}
                />
              )
            );
          })}

          {/* Root route */}
          <Route path={["/home", "/"]} exact>
            <Redirect to={homeRoutes.path} />
          </Route>
          <Route
            exact
            path={shareLinkRouter.path}
            component={shareLinkRouter.Component}
          />
          <Route path="*">
            <Redirect to={notFoundRoutes.path} />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routers;
