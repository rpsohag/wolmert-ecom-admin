import DataTable from "datatables.net-dt";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import patient from "./../../assets/img/patients/patient1.jpg";
import { useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";

const Role = () => {
  useEffect(() => {
    new DataTable(".datatable");
  }, []);
  return (
    <>
      <PageHeader title="Roles" />
      <ModalPopup target="RoleModalPopup">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          assumenda laboriosam, exercitationem doloribus dolorem sequi quae
          totam rerum ipsam, natus neque fugiat eum ex inventore est nihil ab
          voluptate sed!
        </p>
      </ModalPopup>
      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary mb-3"
            data-target="#RoleModalPopup"
            data-toggle="modal"
          >
            Add new Role
          </button>
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                <table className="datatable table table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th>Speciality</th>
                      <th>Patient Name</th>
                      <th>Apointment Time</th>
                      <th>Status</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h2 className="table-avatar">
                          <a
                            href="profile.html"
                            className="avatar avatar-sm mr-2"
                          >
                            <img
                              className="avatar-img rounded-circle"
                              src={patient}
                              alt="Role Image"
                            />
                          </a>
                          <a href="profile.html">Dr. Ruby Perrin</a>
                        </h2>
                      </td>
                      <td>Dental</td>
                      <td>
                        <h2 className="table-avatar">
                          <a
                            href="profile.html"
                            className="avatar avatar-sm mr-2"
                          >
                            <img
                              className="avatar-img rounded-circle"
                              src={patient}
                              alt="Role Image"
                            />
                          </a>
                          <a href="profile.html">Charlene Reed </a>
                        </h2>
                      </td>
                      <td>
                        9 Nov 2019{" "}
                        <span className="text-primary d-block">
                          11.00 AM - 11.15 AM
                        </span>
                      </td>
                      <td>
                        <div className="status-toggle">
                          <input
                            type="checkbox"
                            id="status_1"
                            className="check"
                          />
                          <label htmlFor="status_1" className="checktoggle">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="text-right">$200.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Role;
