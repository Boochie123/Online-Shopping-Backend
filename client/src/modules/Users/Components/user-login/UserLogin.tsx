import React, { useState } from "react";
import "../../../../index.css";
import { Link, useNavigate } from "react-router-dom";
import {  loginUser,getUser } from "../../../../redux/users/counterSlice";
import { useDispatch } from "react-redux";
import { dispatchAction } from "../../../../redux/store";
interface IUser {
  email: string;
  password: string;
}
interface IUserError {
  emailError: string;
  passwordError: string;
}
let UserLogin: React.FC = () => {
  const navigate=useNavigate()
  let dispatch = useDispatch<dispatchAction>();
  let [userState, setUserState] = useState<IUser>({
    email: "",
    password: "",
  });
  let [errorUserState, setErrorUserState] = useState<IUserError>({
    emailError: "",
    passwordError: "",
  });

  let updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserState({
      ...userState,
      password: event.target.value,
    });
    let regexp = /^[a-zA-Z]\w{7,14}$/;
    if (!regexp.test(event.target.value)) {
      setErrorUserState({
        ...errorUserState,
        passwordError: "Enter a valid password",
      });
    } else {
      setErrorUserState({
        ...errorUserState,
        passwordError: "",
      });
    }
  };

  let updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserState({
      ...userState,
      email: event.target.value,
    });
    let regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexp.test(event.target.value)) {
      setErrorUserState({
        ...errorUserState,
        emailError: "Enter a valid email",
      });
    } else {
      setErrorUserState({
        ...errorUserState,
        emailError: "",
      });
    }
  };

   let lin = async () => {
   await dispatch(loginUser(userState ))
  await dispatch(getUser());
     navigate('/');
     console.log(userState);
  };


  
  return (
    <React.Fragment>
      <div className="container">
        <div className="row ">
          <div className="col-md-4 m-auto mt-5">
            <div className="back card">
              <div className="card-header text-center text-white">
                <h3>Login</h3>
              </div>
              <div className="card-body">
                <form className="form-group">
                  <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={updateEmail}
                    className={`form-control mb-2 ${
                      errorUserState.emailError.length > 0 ? "is-invalid" : ""
                    }`}
                  />
                  {errorUserState.emailError.length > 0 ? (
                    <small className="text-danger">
                      {errorUserState.emailError}
                    </small>
                  ) : (
                    ""
                  )}
                  <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={updatePassword}
                    name="password"
                    className={`form-control mb-2 ${
                      errorUserState.passwordError.length > 0
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {errorUserState.passwordError.length > 0 ? (
                    <small className="text-danger">
                      {errorUserState.passwordError}
                    </small>
                  ) : (
                    ""
                  )}
                </form>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-outline-light" onClick={lin}>
                  Login
                </button>
                <br />
                <span className="mt-4">
                  Don't have an account?{" "}
                  <Link
                    to="/users/register"
                    className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                  >
                    Register
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UserLogin;

