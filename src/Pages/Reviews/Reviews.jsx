import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Reviews = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/reviews")
      .then((response) => {
        setReview(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#016A4E",
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5" }} className="p-3">
      <br />

      <div
        className="container mx-auto p-3"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <h3 className="lg:text-3xl mb-5 md:text-2xl text-xl font-bold ml-4 ">
          Total review: {review.length}{" "}
        </h3>
        {/* show reviews */}
        {review.map((refs) => (
          <div
            key={review._id}
            className="card w-full bg-base-100 shadow-xl my-4" >
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
            </div>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default Reviews;