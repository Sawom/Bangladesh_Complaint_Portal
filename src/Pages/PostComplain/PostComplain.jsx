import { Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {divisionsData} from './bdData'

const PostComplain = () => {
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");

  // selected district, subDistrict
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState([]);

  // Effects for dynamic dropdowns
  useEffect( ()=>{
    const selectedDis = divisionsData?.find( 
      (divisionName)=> divisionName.division === division)?.district;  

      if(selectedDis){
        setSelectedDistrict(selectedDis);
        setDistrict(selectedDis[0]?.district );
      }

      const selectSubdistrict = selectedDis?.find(  
        (districtName) => districtName.districtname === selectedDis[0]?.districtname
      )?.subdistrict;

      if(selectSubdistrict){
        setSelectedSubdistrict(selectSubdistrict);
        setSubdistrict(selectSubdistrict[0])
      }
  }, [division]);

  

  return (
    <div
      style={{ backgroundColor: "#E5E5E5", minHeight: "70vh" }}
      className="p-3"
    >
      <br />
      <div className="container mx-auto mt-4 mb-4 flex justify-center items-center">
        {/* update form */}
        <div
          className="card w-full max-w-lg shrink-0 p-5 "
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <h2 className="text-lg"> what is your complain? tell us </h2>
          <form className="card-body">
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                name="name"
                defaultValue=""
              />
            </div>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                defaultValue=""
              />
            </div>

            {/* division */}
            <div className="flex items-center gap-5">
              <Dropdown
                style={{
                  backgroundColor: "#71797E",
                  color: "white",
                  fontStyle: "bold",
                  style: "none",
                  width: "100%"
                }}
                label="division"
                size="lg"
              >
                <Dropdown.Item >Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            </div>

            {/* district */}
            <div className="flex items-center gap-5">
              <Dropdown
                style={{
                  backgroundColor: "#71797E",
                  color: "white",
                  fontStyle: "bold",
                  style: "none",
                  width: "100%"
                }}
                label="district"
                size="lg"
              >
                <Dropdown.Item >Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            </div>

            {/* sub */}
            <div className="flex items-center gap-5">
              <Dropdown
                style={{
                  backgroundColor: "#71797E",
                  color: "white",
                  fontStyle: "bold",
                  style: "none",
                  width: "100%"
                }}
                label="sub district"
                size="lg"
              >
                <Dropdown.Item >Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            </div>

            {/* complain */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your complain</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32"
                placeholder="Review"
                required
              ></textarea>
            </div>

            {/* prove */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  prove link. <br />
                  prove can be img or video link. upload your prove if any in
                  google drive and send the link. if no prove write none{" "}
                </span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                name="name"
                defaultValue=""
              />
            </div>

            {/* sign up button */}
            <div className="form-control mt-6">
              <button
                className="btn "
                style={{
                  backgroundColor: "#016A4E",
                  color: "white",
                  fontStyle: "bold",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <br />
    </div>
  );
};

export default PostComplain;
