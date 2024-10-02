import { Rating, ThinStar } from "@smastrom/react-rating";
import axios from "axios";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import useFirebase from "../../../Authentication/useFirebase/useFirebase";

const MyReviews = () => {
  const { user } = useFirebase();
  const [reviewInfo, setReviewInfo] = useState([]);


  // for refetch data load
  useEffect(() => {
    if (user && user.email) {
      axios
        .get(`http://localhost:5000/reviews?email=${user.email}`)
        .then((response) => {
          setReviewInfo(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [user]);

  // style for review star
  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#016A4E",
  };

  return (
    <div className="p-3 " style={{ backgroundColor: "#FFFFFF" }}>
      <h3 className="lg:text-3xl mb-5 md:text-2xl text-xl font-bold ml-4 ">
        Total review: {reviewInfo?.length}
      </h3>

      {/* show reviews */}
      {reviewInfo.map((refs) => (
        <div key={refs._id} className="card w-full bg-base-100 shadow-xl my-4">
          <div className="card-body text-left text-black">
            <h2 className="card-title "> Name: {refs.name} </h2>
            <h2 className="card-title"> Email: {refs.email} </h2>
            <p> {refs.comments} </p>
            <Rating
              style={{ maxWidth: 150 }}
              itemStyles={myStyles}
              value={refs.rating}
              readOnly
            />

            {/* delete btn */}
            <Button
              className="w-16 mt-2"
              color="gray"
              style={{ backgroundColor: "red", color: "white" }}
            >
              <FaTrashAlt></FaTrashAlt>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;
