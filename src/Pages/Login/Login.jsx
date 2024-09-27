import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import eyeClosed from "../../assets/others/eye_closed.svg";
import eyeOpen from "../../assets/others/eye_open.svg";
import login from "../../assets/others/login.png";
import useFirebase from "../../Authentication/useFirebase/useFirebase";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, handleLogin, resetPassword,error } = useFirebase();

  // after login load previous page
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // password visible or not
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // email
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  // password
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  // user login
  const handleUserLogin = (event) => {
    event.preventDefault();
    handleLogin(email, password);
    setError('');
    navigate(from, {replace: true});
  };

  // reset password
  const handleResetPassword = (event)=>{
    resetPassword();
  }

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      {/* login form */}
      <div className="hero min-h-screen px-3">
        <div
          className="hero-content flex-col mt-8 mb-8 rounded-box lg:flex-row-reverse md:flex-row-reverse "
          style={{ backgroundColor: "#FFFFFF" }}
        >
          {/* 1st part  */}
          <div className="text-center lg:text-left">
            <h1 className="text-xl font-bold">Login now!</h1>
            <img src={login} alt="" style={{ width: "90%" }} />
          </div>

          {/* 2nd part  */}
          <div className="card w-full max-w-sm shrink-0 ">
            <form className="card-body" onSubmit={handleUserLogin}   >
              {/* email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  onBlur={handleEmail} 
                  required
                />
              </div>

              {/* password */}
              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <label
                  style={{ backgroundColor: "#E8F0FE" }}
                  className=" input input-bordered flex items-center gap-2"
                >
                  <button type="button" onClick={togglePasswordVisibility}>
                    <img
                      src={isPasswordVisible ? eyeOpen : eyeClosed}
                      alt="Show Password"
                      style={{ width: "20px" }}
                    />
                  </button>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="password"
                    className="border-none focus:outline-none focus:ring-0"
                    onBlur={handlePassword} 
                    required
                  />
                </label>

                <label className="label">
                  <p className="label-text-alt ">Forgot password?</p>
                </label>
              </div>

              {/* login button */}
              <div className="form-control mt-6">
                <button
                  className="btn "
                  style={{
                    backgroundColor: "#016A4E",
                    color: "white",
                    fontStyle: "bold",
                  }}
                >
                  Login
                </button>
              {/* error */}
              <p className='text-red-600' > {error} </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;