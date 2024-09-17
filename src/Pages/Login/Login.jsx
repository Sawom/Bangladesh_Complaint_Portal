import React, { useState } from "react";
import eyeClosed from "../../assets/others/eye_closed.svg";
import eyeOpen from "../../assets/others/eye_open.svg";
import login from "../../assets/others/login.png";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // password visible or not
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
            <img
              src={login}
              alt=""
              style={{ maxWidth: "90%", height: "auto" }}
            />
          </div>

          {/* 2nd part  */}
          <div className="card w-full max-w-sm shrink-0 ">
            <form className="card-body">
              {/* email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* password */}
              <div >
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <label style={{backgroundColor: "#E8F0FE"}} className=" input input-bordered flex items-center gap-2">
                  <button type="button" onClick={togglePasswordVisibility}>
                    <img
                      src={isPasswordVisible ? eyeOpen : eyeClosed}
                      alt="Show Password" style={{width:'20px'}}
                    />
                  </button>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="password"
                    className="border-none focus:outline-none focus:ring-0"
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
