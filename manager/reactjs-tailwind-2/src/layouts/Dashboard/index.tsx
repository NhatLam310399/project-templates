import React from "react";

import Drawer from "./components/Drawer";
import TopBar from "./components/TopBar";

const AdminLayout: React.FC = props => {
  const { children } = props;
  return (
    <div className="layout w-full h-full laptop:grid grid-cols-auto-1fr">
      <Drawer />
      <div
        id="scrollableMain"
        className="right-side-bar w-full max-h-screen overflow-y-auto  "
      >
        <div className="max-w-122 m-auto px-1.5 pb-3 laptop:px-3">
          <TopBar />
          <main className="w-full h-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
