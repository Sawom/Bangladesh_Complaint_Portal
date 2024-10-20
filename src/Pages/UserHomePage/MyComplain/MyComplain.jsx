import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../../Authentication/useAuth/useAuth";

const MyComplain = () => {
  const { user, setUser } = useAuth();
  const [complainInfo, setComplainInfo] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // complain data load
  useEffect(() => {
    if (user && user?.email) {
      axios
        .get(`http://localhost:5000/complains?email=${user.email}`)
        .then((response) => {
          setComplainInfo(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [user, refresh]);

  return (
    <div className="p-3" style={{ backgroundColor: "#FFFFFF" }}>
      <h3 className="lg:text-3xl mb-5 md:text-2xl text-xl font-bold ml-4 ">
        Total Complain: {complainInfo?.length}
      </h3>

      {/* show complains */}
      {complainInfo.map((complains) => (
        <div
          key={complains._id}
          className="card w-full bg-base-100 shadow-lg my-4"
        >
          <div className="card-body text-left text-black">
            <h2 className="card-title "> Name: {complains.name} </h2>
            <h2 className="card-title"> Email: {complains.email} </h2>
            <p>
              <span className="font-bold">Complain:</span> {complains.complain}
            </p>
            <p>
              <span className="font-bold">Provelink:</span>
              <span>
                <a
                  style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    display: "block", // Use block for the link inside flex container
                    maxWidth: "60%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  href={complains.provelink}
                  target="_blank"
                >
                  {complains.provelink}
                </a>
              </span>
            </p>
            <p>
              <span className="font-bold">Problem Category:</span>
              {complains.problem}
            </p>
            <p>
              <span className="font-bold">Submission Date:</span>
              {complains.date}
            </p>
            <p>
              <span className="font-bold">Division:</span> {complains.division}
            </p>
            <p>
              <span className="font-bold">District:</span> {complains.district}
            </p>
            <p>
              <span className="font-bold">Sub District:</span>
              {complains.subDistrict}
            </p>
            {/* complain status */}
            <p>
              <span className="font-bold">Status:</span>{" "}
              <span
                className="font-bold"
                style={{ color: complains?.status ? "green" : "black" }}
              >
                {complains?.status || "Pending"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyComplain;
