import React from "react";
import login from "../../assets/others/login.png";

const Login = () => {
  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      {/* login form */}
      <div className="hero min-h-screen px-3" >
        <div className="hero-content flex-col mt-8 mb-8 rounded-box lg:flex-row-reverse md:flex-row-reverse " 
        style={{ backgroundColor: "#FFFFFF" }} >
          {/* 1st part  */}
          <div className="text-center lg:text-left">
            <h1 className="text-xl font-bold">Login now!</h1>
            <img src={login} alt="" style={{maxWidth: '90%', height: 'auto'}} />
          </div>

          {/* 2nd part  */}
          <div className="card w-full max-w-sm shrink-0 ">
            
            <form className="card-body">
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
                <label className="label">
                  <p className="label-text-alt ">
                    Forgot password?
                  </p>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn " style={{ backgroundColor: "#016A4E", color: 'white', fontStyle:"bold" }} >Login</button>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
