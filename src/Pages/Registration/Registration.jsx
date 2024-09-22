import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eyeClosed from "../../assets/others/eye_closed.svg";
import eyeOpen from "../../assets/others/eye_open.svg";
import reg from "../../assets/others/signup.png";
import initializeFirebase from "../../Authentication/Firebase/firebase.init";
// import { useAuthState } from 'react-firebase-hooks/auth';

initializeFirebase();

const Registration = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");

  const auth = getAuth();

  const navigate = useNavigate();
  // navigate
  if (user?.email) {
    navigate("/home");
  }

  // password visible or not
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // handle email
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  // handle password
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  // handle confirm password
  const handleConfirmpass = (event) => {
    setConfirmpass(event.target.value);
  };

  // verify email
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {})
      .catch((error) => {
        setError(error.message);
      });
  };

  // register new user
  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Signed up
        const user = result.user;
        setError("");
        verifyEmail();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  // create a register user
  const handleRegistration = (event) => {
    event.preventDefault();
    if (password !== confirmpass) {
      setError("Your password did not match! ");
      return;
    }
    // must two upper case
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("Password Must contain 2 upper case");
      return;
    }
    if (password.length < 6) {
      setError("Password Must be at least 6 characters long.");
      return;
    }
    registerNewUser(email, password);
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
            <form className="card-body" onSubmit={handleRegistration}  >
              {/* name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  
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
                  onBlur={handleEmail} 
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
                    onBlur={handlePassword}
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
                    onBlur={handleConfirmpass}
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
              <p className='text-red-600' > {error} </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;