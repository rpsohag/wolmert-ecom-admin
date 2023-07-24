import DataTable from "datatables.net-dt";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { createToast } from "../../utility/toastAlert";
import swal from "sweetalert";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice";
import {
  createPermission,
  deletePermission,
  getAllPermission,
} from "../../features/user/userApiSlice";

const Permission = () => {
  const dispatch = useDispatch();
  const { permissions, error, message } = useSelector(getAllPermissionData);
  const [input, setInput] = useState({
    name: "",
  });
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreatePermission = (e) => {
    e.preventDefault();
    if (!input.name) {
      createToast("All fields are required!", "error");
    } else {
      dispatch(createPermission(input));
      setInput({
        name: "",
      });
    }
  };
  const handlePermissionDelete = (id) => {
    swal({
      title: "Delete Permission",
      text: "Are you sure ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePermission(id));
      }
    });
  };

  useEffect(() => {
    if (error) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    new DataTable(".datatable");
  }, []);

  useEffect(() => {
    dispatch(getAllPermission());
  }, [dispatch]);

  return (
    <>
      <PageHeader title="Permissions" />
      <ModalPopup target="PermissionModalPopup" title="Add New Permission">
        <form onSubmit={handleCreatePermission}>
          <div className="my-3">
            <label htmlFor="name">Permission Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <button type="submit" className="btn btn-primary float-right">
              Save Permission
            </button>
          </div>
        </form>
      </ModalPopup>
      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary mb-3"
            data-target="#PermissionModalPopup"
            data-toggle="modal"
          >
            Add new Permission
          </button>
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                <table className="datatable table table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Created At</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions &&
                      [...permissions].reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: "50px" }}>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>3 min ago</td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                />
                                <label
                                  htmlFor="status_1"
                                  className="checktoggle"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="text-right">
                              <div className="actions">
                                <a
                                  className="btn btn-sm bg-success-light"
                                  data-toggle="modal"
                                  href="#edit_specialities_details"
                                >
                                  <i className="fe fe-pencil"></i> Edit
                                </a>
                                <a
                                  data-toggle="modal"
                                  href="#delete_modal"
                                  className="btn btn-sm bg-danger-light"
                                  onClick={() =>
                                    handlePermissionDelete(item._id)
                                  }
                                >
                                  <i className="fe fe-trash"></i> Delete
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
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

export default Permission;
