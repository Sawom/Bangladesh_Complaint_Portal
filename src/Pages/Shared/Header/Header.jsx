import { Sidebar } from "flowbite-react";
import React, { useState } from "react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../../assets/logo/logo.png";
import useFirebase from "../../../Authentication/useFirebase/useFirebase";

const Header = () => {
  const { user, logoutUser } = useFirebase();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

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
              <Link to="/userhome">
                <span style={{ color: "#016A4E" }} className="font-bold">
                  Dashboard
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* nav end side */}
        <div className="navbar-end gap-3">
          {user?.email ? (
            <>
              {/* start responsive sidebar for user menu */}
              <div className="dropdown dropdown-end">
                <div className="drawer drawer-end">
                  <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    {/* Page content here */}
                    <div>
                      <label
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          margin: 0,
                          outline: "none",
                        }}
                        htmlFor="my-drawer-4"
                        className="drawer-button btn btn-ghost"
                      >
                        <img
                          className="w-10 rounded-full"
                          alt="Tailwind CSS Navbar component"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="drawer-side z-[10]">
                    <label
                      htmlFor="my-drawer-4"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className=" bg-white  min-h-full w-auto p-3">
                      {/* Cross sign button */}
                      <div >
                        <label
                          htmlFor="my-drawer-4"
                          className="cursor-pointer  p-3"
                          aria-label="close" >
                          {/* <span >User menu</span> */}
                          <span className=" flex justify-between px-5">
                            <p className="text-2xl " >Menus</p>   <p className="text-3xl" >&times;</p> 
                          </span>
                        </label>
                      </div>

                      {/* Sidebar content here */}
                      <Sidebar
                        className=" w-auto "
                        aria-label="Default sidebar example"
                      >
                        <Sidebar.Items>
                          <Sidebar.ItemGroup>
                            {/* 1 user home */}
                            <Sidebar.Item icon={HiChartPie}>
                              <Link to="/userhome"> <span style={{ color: "#016A4E" }} className="font-bold" >User Home</span>  </Link>
                            </Sidebar.Item>
                            {/* 2 manage user */}
                            <Sidebar.Item icon={HiUser} >
                              <Link to="/manageuser"> <span style={{ color: "#016A4E" }} className="font-bold" >Manage User</span> </Link>
                            </Sidebar.Item>
                            {/* 3 */}
                            <Sidebar.Item icon={HiShoppingBag}>
                              Products
                            </Sidebar.Item>
                            {/* 4 */}
                            <Sidebar.Item icon={HiArrowSmRight}>
                              Sign In
                            </Sidebar.Item>
                            {/* 5 */}
                            <Sidebar.Item icon={HiTable}>
                              <button onClick={logoutFunction}>
                                <span
                                  style={{ color: "#016A4E" }}
                                  className="font-bold"
                                >
                                  Logout
                                </span>
                              </button>
                            </Sidebar.Item>
                          </Sidebar.ItemGroup>
                        </Sidebar.Items>
                      </Sidebar>

                    </ul>
                  </div>
                </div>
              </div>
              {/* end sidebar */}
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