import React, { useEffect, useState } from 'react';
import {Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";
// import { Carousel } from "flowbite-react";
// import required modules for swiper js for carousel to see reviews
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const ShowReview = () => {
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

//   const customTheme= {
//     active: {
//         // off: "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
//         on: "bg-black dark:bg-black"
//         }
//     };


return (
        <div className='container mx-auto mt-10 mb-8' >
            <h1 className="text-center font-bold lg:text-2xl md:text-2xl text-xl mb-1 ">amader reviews</h1>
            
            <div className="h-56 px-2 ">
                {/* <Carousel  theme={customTheme}  leftControl=" " rightControl=" ">
                    {review.map((refs) => (
                        <div
                            key={review._id}
                            className="card w-full bg-base-100 my-4 flex items-center" >
                            <div className="card-body text-black">
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
                </Carousel> */}
                <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
            </div>
        </div>
    );
};

export default ShowReview;