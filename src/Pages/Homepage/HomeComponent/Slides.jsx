import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import pic1 from "../../../assets/banner/banner1.jpg";
import img2 from "../../../assets/banner/banner2.jpg";
import img3 from "../../../assets/banner/banner3.jpg";
import img4 from "../../../assets/banner/banner4.jpg";
import img5 from "../../../assets/banner/banner5.jpg";

const Slides = () => {
  return (
    <div className="container mx-auto">

      <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 gap-4" >
        {/* 1st column */}
        {/* Carousel (Full width on small screens, 7 columns on large screens) */}
        <div className="lg:col-span-7 md:col-span-7 col-span-12">
          <Carousel infiniteLoop autoPlay={true} loop={true}>
            <div>
              <img src={pic1} />
            </div>
            <div>
              <img src={img2} />
            </div>
            <div>
              <img src={img3} />
            </div>
            <div>
              <img src={img4} />
            </div>
            <div>
              <img src={img5} />
            </div>
          </Carousel>
        </div>

        {/* 2nd column */}
        {/* User Guide (Full width on small screens, 4 columns on large screens) */}
        <div className="lg:col-span-5 md:col-span-5 col-span-12">
          <div className="p-4 ">
            <h2 className="text-xl font-bold mb-4">User Guide</h2>
            <p>Here is some information on how to use the carousel...</p>
            {/* Add more content as needed */}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Slides;
