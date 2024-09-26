import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const [update, setUpdate] = useState({});
  const { id } = useParams();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=32fbe21a538bf8adb6c7b5b1d0abe993`;

  // single user data load
  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUpdate(data);
      });
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

  // update address
  const handleAddressChange = (event) => {
    const updateAddress = event.target.value;
    const updatedUser = {
      name: update.name,
      address: updateAddress,
      nid: update.nid,
      img: update.img,
    };
    setUpdate(updatedUser);
  };

  // update nid
  const handleNidChange = (event) => {
    const updateNid = event.target.value;
    const updatedUser = {
      name: update.name,
      address: update.address,
      nid: updateNid,
      img: update.img,
    };
    setUpdate(updatedUser);
  };

  // update img
  const handleImgChange = (event) => {
    const updateImg = event.target.value;
    const updatedUser = {
      name: update.name,
      address: update.address,
      nid: update.nid,
      img: updateImg,
    };
    setUpdate(updatedUser);
  };

  // update function
  const handleUpdate = (event) => {
    event.preventDefault();
    const url = `http://localhost:5000/users/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Updated!",
            showConfirmButton: false,
            timer: 1500,
          });
          setUpdate({});
          event.target.reset();
        }

      });
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
          <form className="card-body"  onSubmit={handleUpdate} >
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
                defaultValue={update._id || ""}
                readOnly
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
                onChange={handleAddressChange}
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
                onChange={handleImgChange}
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
                onChange={handleNidChange}
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
                defaultValue={update.email || ""}
                readOnly
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
