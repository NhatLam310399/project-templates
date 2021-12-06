import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { flattenedRoutes as routes, notFoundRoutes } from "./Routes";
import PrivateRoute from "components/PrivateRoute";
import DashboardLayout from "layouts/Dashboard";
import AuthLayout from "layouts/Auth";
import HelpCenterLayout from "layouts/HelpCenter";

const Routers: React.FC = props => {
  const [privateRoutes] = useState(() =>
    routes.filter(route => route.isPrivate && !route.helpCenterRoute),
  );
  const [publicRoutes] = useState(() =>
    routes.filter(route => !route.isPrivate),
  );
  const [helpCenterRoutes] = useState(() =>
    routes.filter(route => route.isPrivate && route.helpCenterRoute),
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
        <Route path="/auth">
          <AuthLayout>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {publicRoutes.map(({ Component, path }) => {
                  return (
                    Component && (
                      <Route
                        key={path}
                        path={path}
                        exact
                        component={Component}
                      />
                    )
                  );
                })}
              </Switch>
            </Suspense>
          </AuthLayout>
        </Route>

        {/*Help center routes*/}
        <Route path="/help-center">
          <HelpCenterLayout {...props}>
            <Suspense fallback={<div>Loading</div>}>
              <Switch>
                {helpCenterRoutes.map(route => {
                  return (
                    route.Component && (
                      <PrivateRoute key={route.path} exact {...route} />
                    )
                  );
                })}
                <Redirect path="*" to={notFoundRoutes.path} />
              </Switch>
            </Suspense>
          </HelpCenterLayout>
        </Route>

        {/* Dashboard routes */}
        <Route path="/">
          <DashboardLayout {...props}>
            <Suspense fallback={<div>Loading</div>}>
              <Switch>
                {privateRoutes.map(route => {
                  return (
                    route.Component && (
                      <PrivateRoute key={route.path} exact {...route} />
                    )
                  );
                })}
                <Redirect path="*" to={notFoundRoutes.path} />
              </Switch>
            </Suspense>
          </DashboardLayout>
        </Route>
        {/* <Redirect path="*" to={notFoundRoutes.path} /> */}
      </Switch>
    </Router>
  );
};

export default Routers;
