import React from "react";
import reg from "../../assets/others/signup.png";

const Registration = () => {
  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <div className="hero min-h-screen px-3">
        <div
          className="hero-content flex-col mt-8 mb-8 rounded-box lg:flex-row md:flex-row "
          style={{ backgroundColor: "#FFFFFF" }} >
          {/* 1st part  */}
          <div className="text-center lg:text-left">
            <h1 className="text-xl font-bold">Signup now!</h1>
            <img src={reg} alt="" style={{ maxWidth: "80%", height: "auto" }} />
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* retype password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Retype Password</span>
                </label>
                <input
                  type="password"
                  placeholder="retype password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <p className="label-text-alt ">Forgot password?</p>
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
