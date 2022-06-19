import React from "react";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import HeaderStats from "../components/Headers/HeaderStats.js";

import Auth from "HOC/Auth.js";

export default function Admin({ children }) {
  return (
    <Auth>
      <div>
      <Sidebar />
      <div className="relative md:ml-64 min-h-screen bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full   -m-24">
          {children}
        </div>
      </div>
      </div>
    </Auth>
  );
}
