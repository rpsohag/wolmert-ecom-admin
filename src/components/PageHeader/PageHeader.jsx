import React from "react";
import useAuthUser from "../../hooks/useAuthUser";

const PageHeader = ({ title }) => {
  const { user } = useAuthUser();
  return (
    <div className="page-header">
      <div className="row">
        <div className="col">
          <h3 className="page-title">{title}</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">{title}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
