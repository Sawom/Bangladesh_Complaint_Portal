import React, { useEffect, useState } from "react";
import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";
import { Button } from "flowbite-react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageReview = () => {
  const [review, setReview] = useState([]);

  //  load all review
  useEffect(() => {
    axios.get("http://localhost:5000/reviews")
      .then((response) => {
        setReview(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [review]);

  // delete review
  const handleDeleteReview = (review) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform Axios delete operation
        axios.delete(`http://localhost:5000/reviews/${review._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // Show success message
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Review has been deleted!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting review:", error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Failed to delete review.",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  // style for review star
  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#016A4E",
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5" }} className="p-3">
      <br />
      <div style={{ backgroundColor: "#E5E5E5" }} className="p-3">
        <br />

        <div
          className=" container mx-auto p-3"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <h3 className="lg:text-3xl mb-5 md:text-2xl text-xl font-bold ml-4 ">
            Total review: {review.length}
          </h3>
          {/* show reviews */}
          {review.map((refs) => (
            <div
              key={refs._id}
              className="card w-full bg-base-100 shadow-xl my-4"
            >
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
                  onClick={() => handleDeleteReview(refs)}
                  color="gray"
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  <FaTrashAlt></FaTrashAlt>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <br />
      </div>

      <br />
    </div>
  );
};

export default ManageReview;