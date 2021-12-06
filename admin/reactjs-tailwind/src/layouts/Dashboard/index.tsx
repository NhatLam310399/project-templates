import React, { useState } from "react";

import Drawer from "./components/Drawer";
import TopBar from "./components/TopBar";

const AdminLayout: React.FC = props => {
  const { children } = props;

  return (
    <div className="relative w-full h-full grid-cols-1 admin-layout phone:grid laptop:grid-cols-auto-1fr">
      <Drawer />
      <div className="h-screen max-h-screen overflow-y-auto right-side-bar">
        <TopBar />
        <main className="w-full px-1.5 pb-5 laptop:px-4 ">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
