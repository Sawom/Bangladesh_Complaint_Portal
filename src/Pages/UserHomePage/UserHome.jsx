import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFirebase from "../../Authentication/useFirebase/useFirebase";

const UserHome = () => {
  const { user, setUser } = useFirebase();
  const [userInfo, setUserInfo] = useState({}); // To store fetched user info
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user data by email when component mounts
  useEffect(() => {
    if (user && user.email) {
      axios.get(`http://localhost:5000/users?email=${user?.email}`)
        .then((response) => {
          if (response.data.length > 0) {
            setUserInfo(response.data[0]); // user data is in the first index
          } else {
            setUserInfo({}); // If no data found, keep userInfo as an empty object
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user data:", err);
          setUserInfo({}); // If there's an error, keep userInfo as an empty object
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching
        });
    } else {
      // If no user or email, reset the profile data
      setUserInfo({});
      setLoading(false);
    }
  }, [user]);

  return (
    <div style={{ backgroundColor: "#E5E5E5" }} className="p-3">
      <br />
      {/* profile */}
      <div
        className="container mx-auto mt-10 mb-10"
        style={{ backgroundColor: "#FFFFFF", minHeight: "60vh" }} >
        <div
          className="p-4 flex justify-between"
          style={{ backgroundColor: "#016A4E" }} >
          <h1 className="lg:text-lg md:text-lg text-sm text-white">Profile details</h1>
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 p-6">
          {/* Profile Image */}
          <div className="mb-6">
            <img
              className="mb-2 w-[200px] h-[200px] rounded-full object-cover"
              src={userInfo?.img || "https://via.placeholder.com/200"}
              alt="Avatar"
            />
            <Link className="text-sm" to={`/userhome/update/${userInfo._id}`} >
              Edit profile
            </Link>
          </div>

          {/* User Information */}
          <div className="text-lg">
            <p className="mb-4 flex">
              <span className="font-bold pr-3">Web id:</span>
              {userInfo?._id || "N/A"}
            </p>
            <p className="mb-4 flex">
              <span className="font-bold pr-3">Name:</span>
              {userInfo?.name || "N/A"}
            </p>
            <p className="mb-4">
              <span className="font-bold pr-3">Address:</span>
              {userInfo?.address || "N/A"}
            </p>
            <p className="mb-4">
              <span className="font-bold pr-3">Nid:</span> {userInfo?.nid || "N/A"}
            </p>
            <p className="mb-4">
              <span className="font-bold pr-3">Email:</span>
              {userInfo?.email || "N/A"}
            </p>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default UserHome;