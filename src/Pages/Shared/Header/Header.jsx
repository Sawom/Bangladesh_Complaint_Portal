import React from "react";
import logo from "../../../assets/logo/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="shadow-md" style={{backgroundColor: "#FFFFFF"}}>
      {/* 1st part */}
      <div className="navbar container mx-auto">
        {/* nav start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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

            {/* responsive menu part */}
            <ul
              tabIndex={0}
              className=" menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-36 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link to="/">
            <img style={{ width: "180px" }} src={logo} alt="" />
          </Link>
          
        </div>

        {/* nav center */}
        <div className="navbar-center hidden lg:flex">
          <ul className=" menu-horizontal gap-4">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <Link to='/hotlines' > Hotlines </Link>
            </li>
            <li>
              <Link to='/dashboard/userhome' > <span style={{color: "#016A4E"}} className="font-bold" > Dashboard </span> </Link>
            </li>
          </ul>
        </div>

        {/* nav end */}
        <div className="navbar-end gap-3">
          <Link to='/login' > <span style={{color: "#016A4E"}} className="font-bold" >Login</span> </Link>
          <Link to='/register' > <span style={{color: "#016A4E"}} className="font-bold" >Registration</span> </Link>
          
        </div>
        
      </div>
      <hr style={{ borderWidth: "2px" }} />
    </div>
  );
};

export default Header;
