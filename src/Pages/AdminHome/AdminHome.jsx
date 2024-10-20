import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAdmin from "../../Authentication/useAdmin/useAdmin";
import useAuth from "../../Authentication/useAuth/useAuth";
import useAxiosSecure from "../../Authentication/useAxiosSecure/useAxiosSecure";

const AdminHome = ({ userInfo, setUserInfo }) => {
  const { user, loading, setLoading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [isAdmin] = useAdmin();
  const [stats, setStats] = useState({});

  // Fetch user data by email when component mounts
  useEffect(() => {
    if (user && user?.email && isAdmin) {
      axiosSecure
        .get(`/users?email=${user?.email}`)
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
    } else {
      // If no user or email, reset the profile data
      setUserInfo({});
    }
  }, [user, setUserInfo]);

  // stats data load
  useEffect(() => {
    axiosSecure
      .get(`/admin-stats`)
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "#E5E5E5" }} className="p-3">
      <Helmet>
        <title> AdminHome </title>
      </Helmet>
      <br />
      {/* profile */}
      <div
        className="container mx-auto mt-10 mb-10"
        style={{ backgroundColor: "#FFFFFF", minHeight: "50vh" }}
      >
        <div
          className="p-4 flex justify-between"
          style={{ backgroundColor: "#016A4E" }}
        >
          <h1 className="lg:text-lg md:text-lg text-sm text-white font-bold">
            Profile details
          </h1>
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 p-6">
          {/* Profile Image */}
          <div className="mb-6">
            <img
              className="mb-2 w-[200px] h-[200px] rounded-full object-cover"
              src={userInfo?.img || "https://via.placeholder.com/200"}
              alt="Avatar"
            />
            <Link className="text-sm" to={`/userhome/update/${userInfo?._id}`}>
              <span style={{ color: "#016A4E", fontWeight: "bold" }}>
                Edit profile
              </span>
            </Link>
          </div>

          {/* User Information */}
          <div className=" lg:text-lg md:text-lg text-sm ">
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
              <span className="font-bold pr-3">Nid:</span>{" "}
              {userInfo?.nid || "N/A"}
            </p>
            <p className="mb-4">
              <span className="font-bold pr-3">Email:</span>
              {userInfo?.email || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* admin stats */}
      <div className="container mx-auto mt-10">
        <div style={{ backgroundColor: "#FFFFFF" }} className="p-3">
          <h1 className="text-center font-bold lg:text-2xl md:text-2xl text-xl mb-5 mt-5">
            Statistic
          </h1>
          <div>
            <p> <span className="font-bold">Number of total hotline: </span> {stats.hotline}</p>
            <p> <span className="font-bold">Number of total users: </span> {stats.users} </p>
            <p> <span className="font-bold">Number of total reviews: </span> {stats.reviews} </p>
            <p> <span className="font-bold">Number of total homereview: </span> {stats.homereview} </p>
            <p> <span className="font-bold">Number of total complains: </span> {stats.complains} </p> 
          </div>

        </div>
      </div>
      <br />
    </div>
  );
};

export default AdminHome;