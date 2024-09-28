import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useFirebase from "../../Authentication/useFirebase/useFirebase";

const img_hosting_url = `https://api.imgbb.com/1/upload?key=32fbe21a538bf8adb6c7b5b1d0abe993`;

const UpdateUser = () => {
  const [update, setUpdate] = useState({});
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const { user, setUser } = useFirebase();

  // single user data load
  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then((response) => setUpdate(response.data))
      .catch((err) => console.error("Error loading user data:", err));
  }, [id]);

  // update function
  const handleUpdate = async (data) => {
    try {
      let imageUrl = update.img; // Start with the existing image URL

      // Check if a new image is provided
      if (data.img && data.img[0]) {
        const formData = new FormData();
        formData.append("image", data.img[0]); // Append new image if present

        // Upload the image to Imgbb
        const uploadResponse = await axios.post(
          "https://api.imgbb.com/1/upload?key=32fbe21a538bf8adb6c7b5b1d0abe993",
          formData
        );
        if (uploadResponse.data.success) {
          imageUrl = uploadResponse.data.data.url; // Get the new image URL
        } else {
          console.error("Image upload failed:", uploadResponse.data.message);
          return; // Exit if image upload fails
        }
      }

      // Prepare the updated user object
      const updatedUser = {
        name: data.name || update.name, // Use new or existing value
        address: data.address || update.address,
        img: imageUrl, // Use new image URL (or existing if no new image was uploaded)
        nid: data.nid || update.nid,
        email: data.email || update.email,
      };

      // Perform the PUT operation
      const response = await axios.put(`http://localhost:5000/users/${id}`, updatedUser);

      if (response.data.modifiedCount > 0) {
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated!",
          showConfirmButton: false,
          timer: 1500,
        });
        // Reset the form after update 
        useEffect(() => {
          if (update) {
            reset({
              name: update.name || "",
              address: update.address || "",
              img: update.img || "", // Set the existing image URL or empty string
              nid: update.nid || "",
              email: update.email || ""
            });
          }
        }, [update, reset]); 
        // update user info in reset function
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
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
          <form className="card-body" onSubmit={handleSubmit(handleUpdate)}>
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
                {...register("name")}
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
                {...register("address")}
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
                accept="image/*"
                className="file-input file-input-bordered  w-full "
                placeholder="upload your picture"
                name="propic"
                {...register("img")}
                
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
                {...register("nid")}
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
                {...register("email")}
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