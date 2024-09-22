import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
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

  // logout user
  const logoutUser = ()=>{
    signOut(auth).then( ()=>{

    } ).catch( (error)=>{
        const errorMessage = error.message;
        setError(error.message);
    } )
  }


  return {
    user,
    setUser,
    error,
    setError,
    loading,
    setLoading,
    logoutUser,
    registerNewUser,
  };
};

export default useFirebase;
