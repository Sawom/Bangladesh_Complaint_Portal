import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { divisionsData, problemCategory } from "./bdData";
import useAuth from "../../Authentication/useAuth/useAuth";
import useAxiosSecure from "../../Authentication/useAxiosSecure/useAxiosSecure";

const PostComplain = ({ userInfo, setUserInfo }) => {
  const { handleSubmit, control, watch, register, reset } = useForm();
  const [axiosSecure] = useAxiosSecure();

  // Watch for the changes in division and district fields
  const watchDivision = watch("division");
  const watchDistrict = watch("district");

  // watch problem category
  const watchProblem = watch("category");

  const { user } = useAuth();
  // const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  // load single user by email
  useEffect(() => {
    if (user && user?.email) {
      axiosSecure.get(`/users?email=${user?.email}`)
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
  }, [user,setUserInfo]);

  // Get the selected division and district data dynamically
  const selectedDivisionData = divisionsData.find(
    (div) => div.division === watchDivision
  );
  const selectedDistrictData = selectedDivisionData?.district.find(
    (dist) => dist.districtname === watchDistrict
  );

  // get problem category
  const probCategory = problemCategory.find(
    (problems) => problems.category === watchProblem
  );

  // form submit
  // before submit I show a message because in future user can not delete this.
  const onSubmit = (data) => {
    console.log("Selected Data:", data);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to edit or delete this. Check again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        const {
          name,
          email,
          problem,
          division,
          district,
          subDistrict,
          complain,
          provelink,
          date,
        } = data;
        axios.post("http://localhost:5000/complains", data).then((data) => {
          if (data.data.insertedId) {
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thanks!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <div
      style={{ backgroundColor: "#E5E5E5", minHeight: "70vh" }}
      className="p-3"
    >
      <Helmet>
        <title> Your Complain? </title>
      </Helmet>
      <br />
      <div className="container mx-auto mt-4 mb-4 flex justify-center items-center">
        {/* update form */}
        <div
          className="card w-full max-w-lg shrink-0 p-5 "
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <h2 className="text-lg"> what is your complain? tell us </h2>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name*</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                name="name"
                defaultValue={userInfo?.name}
                readOnly
                {...register("name", { required: true })}
              />
            </div>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email*</span>
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

            {/* problem category input */}
            <div>
              <label>Problem Category* </label>
              <div>
                <Controller
                  name="problem"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      style={{
                        outline: "none",
                        border: "2px solid #7E7E7E",
                        padding: "10px",
                        borderRadius: "4px",
                        width: "100%",
                        backgroundColor: "white",
                        color: "black",
                        transition: "border-color 0.5s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "grey";
                        e.target.style.boxShadow = "none";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "grey";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <option value="">Select problem category</option>
                      {problemCategory.map((problems, idx) => (
                        <option key={idx} value={problems.category}>
                          {problems.category}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
            </div>

            {/* Division Input */}
            <div>
              <label>Division* </label>
              <div>
                <Controller
                  name="division"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      style={{
                        outline: "none",
                        border: "2px solid #7E7E7E",
                        padding: "10px",
                        borderRadius: "4px",
                        width: "100%",
                        backgroundColor: "white",
                        color: "black",
                        transition: "border-color 0.5s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "grey";
                        e.target.style.boxShadow = "none";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "grey";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <option value="">Select Division</option>
                      {divisionsData.map((division, idx) => (
                        <option key={idx} value={division.division}>
                          {division.division}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
            </div>

            {/* District Input */}
            <div>
              <label>District* (select division first) </label>
              {watchDivision && (
                <div>
                  <Controller
                    name="district"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select
                        {...field}
                        style={{
                          outline: "none",
                          border: "2px solid #7E7E7E",
                          padding: "10px",
                          borderRadius: "4px",
                          width: "100%",
                          backgroundColor: "white",
                          color: "black",
                          transition: "border-color 0.5s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "grey";
                          e.target.style.boxShadow = "none";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "grey";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        <option value="">Select District</option>
                        {selectedDivisionData?.district.map((district, idx) => (
                          <option key={idx} value={district.districtname}>
                            {district.districtname}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
              )}
            </div>

            {/* sub district */}
            <div>
              <label>Sub District* (select district first) </label>
              {watchDistrict && (
                <div>
                  <Controller
                    name="subDistrict"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select
                        {...field}
                        style={{
                          outline: "none",
                          border: "2px solid #7E7E7E",
                          padding: "10px",
                          borderRadius: "4px",
                          width: "100%",
                          backgroundColor: "white",
                          color: "black",
                          transition: "border-color 0.5s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "grey";
                          e.target.style.boxShadow = "none";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "grey";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        <option value="">Select sub District</option>
                        {selectedDistrictData?.subdistrict.map(
                          (subDistrict, idx) => (
                            <option key={idx} value={subDistrict}>
                              {subDistrict}
                            </option>
                          )
                        )}
                      </select>
                    )}
                  />
                </div>
              )}
            </div>

            {/* complain */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your complain* </span>
              </label>
              <textarea
                className="textarea textarea-bordered h-36"
                name="complain"
                placeholder="Write your complain here. Either bangla or english. no banglish acceptable"
                required
                {...register("complain", { required: true })}
              ></textarea>
            </div>

            {/* prove */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  prove link* <br />
                  prove can be img or video link. upload your prove if any in
                  google drive and send the link. if no prove write none{" "}
                </span>
              </label>
              <input
                type="text"
                placeholder="drive or cloud link"
                className="input input-bordered"
                name="provelink"
                required
                {...register("provelink", { required: true })}
              />
            </div>

            {/* date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date* </span>
              </label>
              {/* Controller for Date Input */}
              <Controller
                name="date" // The name of the form field
                control={control} // React Hook Form's control
                defaultValue="" // Default value for the date
                render={({ field }) => (
                  <input
                    type="date"
                    className="input input-bordered"
                    {...field} // This links the input with the form control
                    placeholder="Select a date"
                  />
                )}
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

export default PostComplain;
