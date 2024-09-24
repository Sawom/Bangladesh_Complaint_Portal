import { Sidebar } from "flowbite-react";
import React from "react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Outlet, Link  } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="overflow-x-auto " style={{ backgroundColor: "#E5E5E5" }}>
      <div >
        <div className=" drawer lg:drawer-open md:drawer-open drawer-open">
          {/* page content here */}
          <div  className="drawer-content flex px-6 flex-col items-center justify-center">
            <Outlet ></Outlet>
          </div>

          {/* sidebar content here */}
          <div className="mt-4 mb-4 " >
            <Sidebar className=" w-auto border-box shadow-lg" aria-label="Default sidebar example">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {/* 1 */}
                  <Sidebar.Item icon={HiChartPie}>
                    <Link to="/dashboard/userhome"> User Home </Link>
                  </Sidebar.Item>
                    {/* 2 */}
                  <Sidebar.Item
                    href="#"
                    icon={HiViewBoards}
                    label="Pro"
                    labelColor="dark"
                  >
                    Kanban
                  </Sidebar.Item>
                    {/* 3 */}
                  <Sidebar.Item href="#" icon={HiInbox} label="3">
                    Inbox
                  </Sidebar.Item>
                    {/* 4 */}
                  <Sidebar.Item href="#" icon={HiUser}>
                    Users
                  </Sidebar.Item>
                  {/* 5 */}
                  <Sidebar.Item href="#" icon={HiShoppingBag}>
                    Products
                  </Sidebar.Item>
                    {/* 6 */}
                  <Sidebar.Item href="#" icon={HiArrowSmRight}>
                    Sign In
                  </Sidebar.Item>
                    {/* 7 */}
                  <Sidebar.Item href="#" icon={HiTable}>
                    Sign Up
                  </Sidebar.Item>

                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
