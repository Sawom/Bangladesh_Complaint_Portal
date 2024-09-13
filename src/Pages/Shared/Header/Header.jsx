import React from "react";
import logo from "../../../assets/logo/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      {/* 1st part */}
      <div className="container mx-auto">
        <div className="navbar">
          {/* nav start */}
          <div className="flex navbar-start">
            <img style={{ width: "60px" }} src={logo} alt="" />
            <p className="font-bold normal-case lg:text-2xl md:text-xl text-sm">
              Bangladesh Complaint Portal
            </p>
          </div>
        </div>
      </div>

      {/* 2nd part */}
      <div>

        <div className="navbar container mx-auto">
          {/* nav start */}
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} className="btn btn-ghost lg:hidden md:hidden ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>

               {/* responsive part */}
              <ul
                tabIndex={0}
                className="menu font-bold menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-40 p-2 shadow" >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>

            </div>
            
          </div>

          {/* nav center */}
          <div className="navbar-center hidden lg:flex md:flex">
            {/* menues */}
            <ul className="menu menu-horizontal px-5 font-bold">
              <li>
                <Link to="/">Home</Link>
              </li>
              
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>

          {/* nav end */}
          <div className="navbar-end">
            <a className="btn">login</a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Header;