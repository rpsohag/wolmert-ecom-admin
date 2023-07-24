import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logoWhite from "./../../assets/img/logo-white.png";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../features/auth/authApiSlice";
import { createToast } from "../../utility/toastAlert";
import { setMessageEmpty } from "../../features/auth/authSlice";

const Reset = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const { error, message } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    password: "",
    cpassword: "",
  });
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserRegister = (e) => {
    e.preventDefault();
    if (!input.password || !input.cpassword) {
      createToast("All fields are required!", "error");
    } else if (input.password !== input.cpassword) {
      createToast("Password not matched!", "error");
    } else {
      dispatch(
        resetPassword({
          password: input.password,
          token: token,
        })
      );
      setInput({
        password: "",
        cpassword: "",
      });
    }
  };

  useEffect(() => {
    if (error) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
      navigate("/login");
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
                  <h1>Reset</h1>
                  <p className="account-subtitle">change your password</p>

                  <form onSubmit={handleUserRegister}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={input.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Confirm Password"
                        name="cpassword"
                        value={input.cpassword}
                        onChange={handleInputChange}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
