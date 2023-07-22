import React, { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import useAuthUser from "../../hooks/useAuthUser";
import { useDispatch, useSelector } from "react-redux";
import { createToast } from "../../utility/toastAlert";
import {
  updateAuthPassword,
  updateAuthProfile,
} from "../../features/auth/authApiSlice";
import LetterAvatar from "../../components/Avatar/LetterAvatar";
import { setMessageEmpty } from "../../features/auth/authSlice";

const Profile = () => {
  const { error, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { user } = useAuthUser();
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    address: user.address,
    bio: user.bio,
  });
  const [authPass, setAuthPass] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  useEffect(() => {
    setProfile({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      bio: user.bio,
    });
  }, [user]);
  const handleProfileData = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };
  const handlePasswordData = (e) => {
    setAuthPass({
      ...authPass,
      [e.target.name]: e.target.value,
    });
  };
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateAuthProfile(profile));
  };
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateAuthPassword({
        old_password: authPass.old_password,
        new_password: authPass.new_password,
      })
    );
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
  }, [error, message]);

  return (
    <div className="content container-fluid">
      <ModalPopup target="editProfile" title="Update Profile">
        <form onSubmit={handleProfileUpdate}>
          <div className="row form-row">
            <div className="col-12 col-sm-12">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={profile?.name}
                  onChange={handleProfileData}
                />
              </div>
            </div>

            <div className="col-12 col-sm-12">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={profile?.email}
                  onChange={handleProfileData}
                />
              </div>
            </div>
            <div className="col-12 col-sm-12">
              <div className="form-group">
                <label>Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={profile?.mobile || ""}
                  onChange={handleProfileData}
                />
              </div>
            </div>

            <div className="col-12 col-sm-12">
              <div className="form-group">
                <label>Adress</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={profile?.address || ""}
                  onChange={handleProfileData}
                />
              </div>
            </div>
            <div className="col-12 col-sm-12">
              <div className="form-group">
                <label>Bio</label>
                <input
                  type="text"
                  className="form-control"
                  name="bio"
                  value={profile?.bio || ""}
                  onChange={handleProfileData}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Save Changes
          </button>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <div className="profile-header">
            <div className="row align-items-center">
              <div className="col-auto profile-image">
                <a href="#">
                  <LetterAvatar name={profile.name} />
                </a>
              </div>
              <div className="col ml-md-n2 profile-user-info">
                <h4 className="user-name mb-0">{user?.name}</h4>
                <h6 className="text-muted">{user?.email}</h6>
                <div className="user-Location">
                  <i className="fe fe-map"></i> {user.address}
                </div>
                <div className="about-text">{user.bio}</div>
              </div>
            </div>
          </div>
          <div className="profile-menu">
            <ul className="nav nav-tabs nav-tabs-solid">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#per_details_tab"
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#password_tab">
                  Password
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content profile-tab-cont">
            <div className="tab-pane fade show active" id="per_details_tab">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title d-flex justify-content-between">
                        <span>Personal Details</span>
                        <button
                          className="btn btn-primary"
                          role="button"
                          data-target="#editProfile"
                          data-toggle="modal"
                        >
                          <i className="fe fe-edit mr-1"></i>Edit
                        </button>
                      </h5>
                      <div className="row">
                        <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                          Name
                        </p>
                        <p className="col-sm-10">{profile.name}</p>
                      </div>

                      <div className="row">
                        <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                          Email ID
                        </p>
                        <p className="col-sm-10">{profile.email}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                          Mobile
                        </p>
                        <p className="col-sm-10">{profile.mobile}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-2 text-muted text-sm-right mb-0">
                          Address
                        </p>
                        <p className="col-sm-10 mb-0">{profile.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="password_tab" className="tab-pane fade">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Change Password</h5>
                  <div className="row">
                    <div className="col-md-10 col-lg-6">
                      <form onSubmit={handlePasswordUpdate}>
                        <div className="form-group">
                          <label>Old Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="old_password"
                            value={authPass.old_password}
                            onChange={handlePasswordData}
                          />
                        </div>
                        <div className="form-group">
                          <label>New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="new_password"
                            value={authPass.new_password}
                            onChange={handlePasswordData}
                          />
                        </div>
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="confirm_password"
                            value={authPass.confirm_password}
                            onChange={handlePasswordData}
                          />
                        </div>
                        <button className="btn btn-primary" type="submit">
                          Save Changes
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
