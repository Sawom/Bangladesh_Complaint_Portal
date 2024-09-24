import React from "react";
import { Link } from "react-router-dom";

const UserHome = () => {
  return (
    <div
      className="container mx-auto mt-4 mb-4 bg-white"
      style={{ minHeight: "100vh" }}
    >
      <div className=" ">
        <div className="p-4 flex justify-between" style={{ backgroundColor: "#016A4E" }}>
          <h1 className="lg:text-lg md:text-lg text-sm text-white"> Profile details </h1>
          {/* <Link className="lg:text-lg md:text-lg text-sm text-white" > Edit profile </Link> */}
        </div>
        {/* profile info */}
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 p-6 ">
          {/* img */}
          <div className="mb-6">
            <img
              className=" mb-2 lg:w-[200px] lg:h-[200px] md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-full object-cover"
              src="https://via.placeholder.com/200"
              alt="Avatar" />
              <Link className=" text-sm " > Edit profile </Link>
          </div>
          {/* others info */}
          <div className="text-lg ">
            <p className="mb-4 flex" > <span className="font-bold pr-2" > Name: </span> eryeyeyyti6ri6555 ytititi </p>
            <p className="mb-4"> <span className="font-bold " > Address: </span> </p>
            <p className="mb-4"> <span className="font-bold" > Nid: </span> </p>
            <p className="mb-4"> <span className="font-bold" > Email: </span> </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
