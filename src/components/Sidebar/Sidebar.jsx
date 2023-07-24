import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              <li>
                <Link to="/">
                  <i className="fe fe-home"></i> <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/products">
                  <i className="fe fe-users"></i> <span>Products</span>
                </Link>
              </li>
              <li>
                <Link to="/orders">
                  <i className="fe fe-users"></i> <span>Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/users">
                  <i className="fe fe-users"></i> <span>Users</span>
                </Link>
              </li>
              <li>
                <Link to="/roles">
                  <i className="fe fe-users"></i> <span>Roles</span>
                </Link>
              </li>
              <li>
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
