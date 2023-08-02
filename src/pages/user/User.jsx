import DataTable from "datatables.net-dt";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import { useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { generateRandomPassword } from "../../helpers";
import useFormFields from "../../hooks/useFormFields";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../features/user/userApiSlice";
import { setMessageEmpty } from "../../features/user/userSlice";
import { createToast } from "../../utility/toastAlert";
import { timeAgo } from "../../utility/timeAgo";

const User = () => {
  const dispatch = useDispatch();
  const { user, role, error, message } = useSelector((state) => state.user);
  const { input, handleInputChange, resetForm, setInput } = useFormFields({
    name: "",
    email: "",
    password: "",
  });
  const handleRandomPassword = (e) => {
    e.preventDefault();
    const random_password = generateRandomPassword();
    setInput((prevState) => ({
      ...prevState,
      password: random_password,
    }));
  };

  const handleRoleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      role: e.target.value,
    }));
  };

  const handleUserCreate = (e) => {
    e.preventDefault();
    dispatch(createUser(input));
    resetForm();
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
      <PageHeader title="users" />
      <ModalPopup target="userModalPopup">
        <form onSubmit={handleUserCreate}>
          <div className="my-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={input.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
            <a
              className="badge badge-info float-right"
              onClick={handleRandomPassword}
            >
              Random Password
            </a>
          </div>
          <div className="my-3">
            <label htmlFor="role">Select Role</label>
            <select
              name="role"
              id=""
              className="form-control"
              onChange={handleRoleChange}
            >
              <option>Select Role</option>
              {role?.map((item, index) => {
                return (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-3">
            <button className="btn btn-primary " type="submit">
              Create New User
            </button>
          </div>
        </form>
      </ModalPopup>
      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary mb-3"
            data-target="#userModalPopup"
            data-toggle="modal"
          >
            Add new user
          </button>
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                {user && (
                  <table className="datatable table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item?.role?.name}</td>
                            <td>{timeAgo(item.createdAt)}ago</td>
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
                              {" "}
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

export default User;
