import React, { useEffect, useState } from "react";
import logoWhite from "./../../assets/img/logo-white.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createToast } from "../../utility/toastAlert";
import { setMessageEmpty } from "../../features/auth/authSlice";
import { forgetPassword } from "../../features/auth/authApiSlice";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.auth);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetPassword({ email }));
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
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={logoWhite} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Forgot Password?</h1>
                  <p className="account-subtitle">
                    Enter your email to get a password reset link
                  </p>

                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Enter Email Here"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>

                  <div className="text-center dont-have">
                    Remember your password? <Link to="/login">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;
