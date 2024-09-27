import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import eyeClosed from "../../assets/others/eye_closed.svg";
import eyeOpen from "../../assets/others/eye_open.svg";
import reg from "../../assets/others/signup.png";
import useFirebase from "../../Authentication/useFirebase/useFirebase";

const img_hosting_url = `https://api.imgbb.com/1/upload?key=32fbe21a538bf8adb6c7b5b1d0abe993`;

const Registration = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { user, setUser, auth, error, setError, verifyEmail } = useFirebase();

  const navigate = useNavigate();
  // navigate
  if (user?.email) {
    navigate("/");
  }

  // password visible or not
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // create a new register user. with *react hook form*
  // user data with profile picture, without password 
  const onSubmit = (data) => {
    // destructure here
    const { password, confirmpass, email } = data;
    if (password !== confirmpass) {
      setError("Your password did not match! ");
      return;
    }
    // must two upper case condition
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("Password Must contain 2 upper case");
      return;
    }
    if (password.length < 6) {
      setError("Password Must be at least 6 characters long.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        //post to db
        const formData = new FormData();
        formData.append("image", data.img[0]);

        fetch(img_hosting_url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgResponse) => {
            if (imgResponse.success) {
              const imgUrl = imgResponse.data.display_url;
              console.log(imgUrl);
              const { name, address, nid, email, password, confirmpass } = data;
              const newUser = {  //test data
                name: name,
                address: address,
                img: imgUrl,
                nid: nid,
                email: email,
              };
              axios.post("http://localhost:5000/users", newUser)
                .then((data) => {
                  if (data.data.insertedId) {
                    setUser(data);
                    reset(); 

                    // **Store the registration success flag in localStorage**
                    localStorage.setItem("showSwal", "true");

                    // reload page for updating header img
                    window.location.reload();
                    console.log(data);
                  }

                });
            }
          });

        setError("");
        verifyEmail();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <div className="hero min-h-screen px-3">
        <div
          className="hero-content flex-col mt-8 mb-8 rounded-box lg:flex-row md:flex-row "
          style={{ backgroundColor: "#FFFFFF" }}
        >
          {/* 1st part  */}
          <div className="text-center lg:text-left">
            <h1 className="text-xl font-bold">Signup now!</h1>
            <img src={reg} alt="" style={{ width: "90%" }} />
          </div>

          {/* 2nd part  */}
          <div className="card w-full max-w-sm shrink-0 ">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("name", { required: true })}
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
                  name="address"
                  {...register("address", { required: true })}
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
                  className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                  placeholder="upload your picture"
                  name="propic"
                  {...register("img", { required: true })}
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
                  name="nid"
                  {...register("nid", { required: true })}
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
                  name="email"
                  {...register("email", { required: true })}
                  required
                />
              </div>

              {/* password */}
              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <label
                  style={{ backgroundColor: "#E8F0FE" }}
                  className=" input input-bordered flex items-center gap-2"
                >
                  <button type="button" onClick={togglePasswordVisibility}>
                    <img
                      src={isPasswordVisible ? eyeOpen : eyeClosed}
                      alt="Show Password"
                      style={{ width: "20px" }}
                    />
                  </button>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="password"
                    className="border-none focus:outline-none focus:ring-0"
                    name="password"
                    {...register("password", { required: true })}
                    required
                  />
                </label>
              </div>

              {/* retype password */}
              <div>
                <label className="label">
                  <span className="label-text">Retype Password</span>
                </label>

                <label
                  style={{ backgroundColor: "#E8F0FE" }}
                  className=" input input-bordered flex items-center gap-2"
                >
                  <button type="button" onClick={togglePasswordVisibility}>
                    <img
                      src={isPasswordVisible ? eyeOpen : eyeClosed}
                      alt="Show Password"
                      style={{ width: "20px" }}
                    />
                  </button>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="retype password"
                    className="border-none focus:outline-none focus:ring-0"
                    name="confirmpass"
                    {...register("confirmpass", { required: true })}
                    required
                  />
                </label>
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
                  Signup
                </button>
              </div>
              {/* error */}
              <p className="text-red-600"> {error} </p>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Registration;