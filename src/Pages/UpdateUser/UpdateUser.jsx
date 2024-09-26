import React from "react";

const UpdateUser = () => {
  return (
    <div
      style={{ backgroundColor: "#E5E5E5", minHeight: "70vh" }}
      className="p-3"
    >
      <br />

      <div className="container mx-auto mt-4 mb-4 flex justify-center items-center">
        
        {/* update form */}
        <div className="card w-full max-w-lg shrink-0 p-5 " style={{ backgroundColor: "#FFFFFF" }}  >
          <h2 className="text-xl"> Update your profile </h2>
          <form className="card-body">
            {/* web id */}
            <div className="form-control">
              <label className="label">
                <span className="label-text"> Web ID </span>
              </label>
              <input
                type="text"
                placeholder="Web ID"
                className="input input-bordered"
                name="web"
              />
            </div>

            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                name="name"
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
                name="address"
              />
            </div>

            {/* img */}
            <div className="form-control">
              <label className="label">
                <span className="label-text"> Upload your picture </span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered  w-full "
                placeholder="upload your picture"
                name="propic"
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
                name="nid"
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
                name="email"
              />
            </div>

            {/* sign up button */}
            <div className="form-control mt-6">
              <button
                className="btn "
                style={{
                  backgroundColor: "#016A4E",
                  color: "white",
                  fontStyle: "bold",
                }}
              >
                Update profile
              </button>
            </div>

          </form>
        </div>

      </div>

      <br />
    </div>
  );
};

export default UpdateUser;