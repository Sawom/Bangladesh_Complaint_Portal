import React, { useState } from "react";
import reg from "../../assets/others/signup.png";
import eyeClosed from "../../assets/others/eye_closed.svg";
import eyeOpen from "../../assets/others/eye_open.svg";

const Registration = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // password visible or not
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <div className="hero min-h-screen px-3">
        <div
          className="hero-content flex-col mt-8 mb-8 rounded-box lg:flex-row md:flex-row "
          style={{ backgroundColor: "#FFFFFF" }} >
          {/* 1st part  */}
          <div className="text-center lg:text-left">
            <h1 className="text-xl font-bold">Signup now!</h1>
            <img src={reg} alt="" style={{ maxWidth: "90%", height: "auto" }} />
          </div>

          {/* 2nd part  */}
          <div className="card w-full max-w-sm shrink-0 ">
            <form className="card-body">
              {/* name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* address */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Address </span>
                </label>
                <input
                  type="text"
                  placeholder="address"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* img */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Upload your picture </span>
                </label>
                <input
                  type="file"
                  placeholder="upload your pic"
                  className="file-input file-input-ghost input-bordered"
                  required
                />
              </div>

              {/* nid */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> NID no </span>
                </label>
                <input
                  type="number"
                  placeholder="nid"
                  className="input input-bordered"
                  required
                />
              </div>

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
              </div>

              {/* retype password */}
              <div >
                <label className="label">
                  <span className="label-text">Retype Password</span>
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
                    placeholder="retype password"
                    className="border-none focus:outline-none focus:ring-0"
                    required
                  />
                </label>
              </div>

              <div className="form-control mt-6">
                <button
                  className="btn "
                  style={{
                    backgroundColor: "#016A4E",
                    color: "white",
                    fontStyle: "bold",
                  }} >
                  Signup
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;