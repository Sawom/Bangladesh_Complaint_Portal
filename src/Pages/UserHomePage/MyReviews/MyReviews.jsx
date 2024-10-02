import React, { useEffect, useState } from "react";
import useFirebase from "../../../Authentication/useFirebase/useFirebase";
import axios from "axios";

const MyReviews = () => {
  const { user } = useFirebase();
  const [reviewInfo, setReviewInfo] = useState({});

  // load single review
  const fetchReview = async () => {
    try {
        if(user && user.email){
            const response = await axios.get(`http://localhost:5000/reviews?email=${user?.email}`);
            setReviewInfo(response.data);
            console.log(response.data)
        }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // for refetch data load
  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <div className="p-3 " style={{ backgroundColor: "#FFFFFF" }}>
      
    </div>
  );
};

export default MyReviews;
