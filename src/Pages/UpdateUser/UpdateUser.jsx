import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const [update, setUpdate] = useState({});
  const { id } = useParams();

  // single user data load
  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUpdate(data);
      })
  }, []);

  // update name
  const handleNameChange = (event) => {
    const updateName = event.target.value;
    const updatedUser = {
      name: updateName,
      address: update.address,
      nid: update.nid,
      img: update.img,
    };
    setUpdate(updatedUser);
  };

  return (
    <div
      style={{ backgroundColor: "#E5E5E5", minHeight: "70vh" }}
      className="p-3"
    >
      <br />

      <div className="container mx-auto mt-4 mb-4 flex justify-center items-center">
        {/* update form */}
        <div
          className="card w-full max-w-lg shrink-0 p-5 "
          style={{ backgroundColor: "#FFFFFF" }}
        >
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
                defaultValue={update._id || ""}  readOnly
              />
            </div>

            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Update Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                name="name"
                onChange={handleNameChange}
                defaultValue={update.name || ""}
              />
            </div>

            {/* address */}
            <div className="form-control">
              <label className="label">
                <span className="label-text"> Update Address </span>
              </label>
              <input
                type="text"
                placeholder="address"
                className="input input-bordered"
                name="address" 
                defaultValue={update.address || ""}
              />
            </div>

            {/* img */}
            <div className="form-control">
              <label className="label">
                <span className="label-text"> Update your picture </span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered  w-full "
                placeholder="upload your picture"
                name="propic"
                defaultValue={update.img || ""}
              />
            </div>

            {/* nid */}
            <div className="form-control">
              <label className="label">
                <span className="label-text"> Update NID no </span>
              </label>
              <input
                type="number"
                placeholder="nid"
                className="input input-bordered"
                name="nid"
                defaultValue={update.nid || ""}
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
                defaultValue={update.email || ""} readOnly
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
