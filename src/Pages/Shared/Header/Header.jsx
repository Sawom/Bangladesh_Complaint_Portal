import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../../assets/logo/logo.png";
import useFirebase from "../../../Authentication/useFirebase/useFirebase";

const Header = () => {
  const { user, logoutUser } = useFirebase();

  // logout function
  const logoutFunction = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Signed Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
        Swal.fire("Signed out!", "You are signed out.", "success");
      }
    });
  };

  return (
    <div className="shadow-md" style={{ backgroundColor: "#FFFFFF" }}>
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
              <Link to="/hotlines"> Hotlines </Link>
            </li>
            <li>
              <Link to="/dashboard/userhome">
                {" "}
                <span style={{ color: "#016A4E" }} className="font-bold">
                  {" "}
                  Dashboard{" "}
                </span>{" "}
              </Link>
            </li>
          </ul>
        </div>

        {/* nav end */}
        <div className="navbar-end gap-3">
          {user?.email ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-36 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <button onClick={logoutFunction}>
                      <span style={{ color: "#016A4E" }} className="font-bold">
                        Logout
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/login">
              {" "}
              <span style={{ color: "#016A4E" }} className="font-bold">
                Login
              </span>{" "}
            </Link>
          )}
        </div>
      </div>
      <hr style={{ borderWidth: "2px" }} />
    </div>
  );
};

export default Header;
