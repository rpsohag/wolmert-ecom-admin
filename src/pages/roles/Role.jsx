import DataTable from "datatables.net-dt";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import useFormFields from "../../hooks/useFormFields";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice";
import { createToast } from "../../utility/toastAlert";
import {
  createRole,
  deleteRole,
  updateRole,
  updateRoleStatus,
} from "../../features/user/userApiSlice";
import { timeAgo } from "../../utility/timeAgo";

const Role = () => {
  const dispatch = useDispatch();
  const { permissions, role, error, message } =
    useSelector(getAllPermissionData);
  const [selected, setSelected] = useState([]);
  const { input, handleInputChange, resetForm } = useFormFields({
    name: "",
  });
  const [roleEdit, setRoleEdit] = useState({
    name: "",
    permissions: [],
  });

  const handleCheckboxChange = (e) => {
    const val = e.target.value;
    const updatedList = [...selected];
    const index = updatedList.indexOf(val);

    if (index !== -1) {
      updatedList.splice(index, 1);
    } else {
      updatedList.push(val);
    }
    setSelected(updatedList);
  };

  const handleRoleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createRole({
        name: input.name,
        permissions: [...selected],
      })
    );
    resetForm();
    setSelected([]);
  };
  const handleStatusUpdate = (id, status) => {
    dispatch(updateRoleStatus({ id, status }));
  };

  const handleRoleDelete = (id) => {
    swal({
      title: "Delete Permission",
      text: "Are you sure ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteRole(id));
      }
    });
  };

  const handleRoleEdit = (id) => {
    const editData = role.find((data) => data._id === id);
    setRoleEdit(editData);
    setSelected(editData.permissions);
  };

  const handleRoleEditChange = (e) => {
    setRoleEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateRole({
        id: roleEdit._id,
        name: roleEdit.name,
        permissions: selected,
      })
    );
  };
  useEffect(() => {
    new DataTable(".datatable");
  }, []);

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
  return (
    <>
      <PageHeader title="Roles" />
      <ModalPopup target="RoleModalPopup" title="Add new role">
        <form onSubmit={handleRoleCreate}>
          <div className="my-3">
            <label htmlFor="name">Role Name</label>
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
            <label htmlFor="name">Permissions</label>
            {permissions &&
              permissions.map((item, index) => {
                return (
                  <label className="d-block" key={index}>
                    <input
                      type="checkbox"
                      value={item.name}
                      onChange={handleCheckboxChange}
                      checked={selected.includes(item.name)}
                    />
                    {item.name}
                  </label>
                );
              })}
          </div>
          <div className="my-3">
            <button type="submit" className="btn btn-primary float-right">
              Save Role
            </button>
          </div>
        </form>
      </ModalPopup>
      <ModalPopup target="role_edit" title="Add new role">
        <form onSubmit={handleRoleUpdate}>
          <div className="my-3">
            <label htmlFor="name">Role Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={roleEdit.name}
              onChange={handleRoleEditChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="name">Permissions</label>
            {permissions &&
              permissions.map((item, index) => {
                return (
                  <label className="d-block" key={index}>
                    <input
                      type="checkbox"
                      value={item.name}
                      onChange={handleCheckboxChange}
                      checked={selected.includes(item.name)}
                      readOnly
                    />
                    {item.name}
                  </label>
                );
              })}
          </div>
          <div className="my-3">
            <button type="submit" className="btn btn-primary float-right">
              Save Role
            </button>
          </div>
        </form>
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
                {role && (
                  <table className="datatable table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Permissions</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...role].reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: "50px" }}>1</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>
                              {item.permissions.map((per, index) => {
                                return <li key={index}>{per}</li>;
                              })}
                            </td>
                            <td>{timeAgo(item.createdAt)}</td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id={`status_${item._id}`}
                                  className="check"
                                  checked={item.status ? true : false}
                                  readOnly
                                />
                                <label
                                  htmlFor={`status_${item._id}`}
                                  className="checktoggle"
                                  onClick={() =>
                                    handleStatusUpdate(item._id, item.status)
                                  }
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="text-right">
                              <div className="actions">
                                <button
                                  className="btn btn-sm bg-success-light"
                                  data-toggle="modal"
                                  data-target="#role_edit"
                                  href="#edit_specialities_details"
                                  onClick={() => handleRoleEdit(item._id)}
                                >
                                  <i className="fe fe-pencil"></i> Edit
                                </button>
                                <a
                                  data-toggle="modal"
                                  href="#delete_modal"
                                  className="btn btn-sm bg-danger-light"
                                  onClick={() => handleRoleDelete(item._id)}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Role;
