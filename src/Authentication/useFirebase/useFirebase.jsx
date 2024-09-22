import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import initializeFirebase from "../Firebase/firebase.init";

initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

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

  // observer: if user signin or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
  }, [auth]);

  // handle login with email
  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
      })
      .then(() => {
        Swal.fire({
          title: "User Login Successful!",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // reset password
  const resetPassword = async () => {
    if (email) {
      await sendPasswordResetEmail(auth, email)
        .then((result) => {
          Swal.fire({
            title: "Email sent. Check your email.",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      Swal.fire({
        title: "Please enter your email address",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  };

  // logout user
  const logoutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        const errorMessage = error.message;
        setError(error.message);
      });
  };

  return {
    user,
    setUser,
    error,
    setError,
    loading,
    setLoading,
    logoutUser,
    registerNewUser,
    handleLogin,
    resetPassword,
  };
};

export default useFirebase;
