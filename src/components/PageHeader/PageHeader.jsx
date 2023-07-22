import React from "react";
import useAuthUser from "../../hooks/useAuthUser";

const PageHeader = ({ title }) => {
  const { user } = useAuthUser();
  return (
    <div class="page-header">
      <div class="row">
        <div class="col">
          <h3 class="page-title">{title}</h3>
          <ul class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">{title}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
