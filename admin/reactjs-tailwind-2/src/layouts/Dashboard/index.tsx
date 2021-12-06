import React, { useState } from "react";

import Drawer from "./components/Drawer";
import TopBar from "./components/TopBar";

const AdminLayout: React.FC = props => {
    const { children } = props;

    return (
        <div className="relative items-stretch block w-full laptop:grid grid-cols-auto-1fr">
            <Drawer />
            <div className="min-h-screen min-w-0 bg-white ">
                <TopBar />
                <main className="w-full px-2 pt-2 pb-3 laptop:px-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
