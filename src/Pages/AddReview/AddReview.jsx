import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFirebase from "../../Authentication/useFirebase/useFirebase";
import axios from "axios";

const AddReview = () => {
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = useState(null);
  const { user } = useFirebase();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  // load single user by email
  useEffect(() => {
    if (user && user.email) {
      axios.get(`http://localhost:5000/users?email=${user?.email}`)
        .then((response) => {
          if (response.data.length > 0) {
            setUserInfo(response.data[0]); // user data is in the first index
          } 
        })
        .catch((err) => {
          console.error("Failed to fetch user data:", err);
          setUserInfo({}); // If there's an error, keep userInfo as an empty object
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching
        });
    }
  }, []);

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
          <h2 className="text-xl"> Add your review to update our service </h2>
          <form className="card-body">
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
                defaultValue={userInfo?.name} readOnly
                {...register("name", { required: true })}
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
                defaultValue={userInfo?.email}
                readOnly
                {...register("email", { required: true })}  
              />
            </div>

            {/* review */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Review</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32"
                placeholder="Review"
                {...register("comments", { required: true })} required 
              ></textarea>
            </div>

            {/* rating */}
            <div className="form-control rating ">
              <label className="label">
                <span className="label-text">Your Review</span>
              </label>
              {/* Radio buttons for 5-star rating */}
              <div className="flex">
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                />
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                />
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                />
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                />
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                />
              </div>
            </div>

            {/* sign up button */}
            <div className="form-control mt-6">
              <button
                className="btn "
                style={{
                  backgroundColor: "#016A4E",
                  color: "white",
                  fontStyle: "bold",
                }}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <br />
    </div>
  );
};

export default AddReview;
