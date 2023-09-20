import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthUser();

  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              {user?.role?.permissions?.includes("te") && (
                <li className={`${location.pathname === "/" ? "active" : ""}`}>
                  <Link to="/">
                    <i className="fe fe-home"></i> <span>Dashboard</span>
                  </Link>
                </li>
              )}

              <li
                className={`${
                  location.pathname === "/products" ? "active" : ""
                }`}
              >
                <Link to="/products">
                  <i className="fe fe-users"></i> <span>Products</span>
                </Link>
              </li>
              <li
                className={`${location.pathname === "/orders" ? "active" : ""}`}
              >
                <Link to="/orders">
                  <i className="fe fe-users"></i> <span>Orders</span>
                </Link>
              </li>
              <li
                className={`${location.pathname === "/brand" ? "active" : ""}`}
              >
                <Link to="/brand">
                  <i className="fe fe-feather"></i> <span>Brand</span>
                </Link>
              </li>
              <li
                className={`${location.pathname === "/users" ? "active" : ""}`}
              >
                <Link to="/users">
                  <i className="fe fe-users"></i> <span>Users</span>
                </Link>
              </li>
              <li
                className={`${location.pathname === "/roles" ? "active" : ""}`}
              >
                <Link to="/roles">
                  <i className="fe fe-users"></i> <span>Roles</span>
                </Link>
              </li>
              <li
                className={`${
                  location.pathname === "/permissions" ? "active" : ""
                }`}
              >
                <Link to="/permissions">
                  <i className="fe fe-users"></i> <span>Permissions</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
