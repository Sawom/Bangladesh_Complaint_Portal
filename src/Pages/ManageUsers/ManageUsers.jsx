import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "#E5E5E5", minHeight: "70vh" }}
      className="p-3" >
      <br />
      <div
        className="container mx-auto mt-4 mb-4 p-3"
        style={{ backgroundColor: "#FFFFFF" }} >
        <h3 className="lg:text-3xl mb-5 md:text-2xl text-xl font-bold ml-4 ">
          Total users: {users.length}
        </h3>

        {/* table */}
        <div className="overflow-x-auto px-3">
          <Table hoverable>
            {/* table head */}
            <Table.Head className="bg-base-content ">
              <Table.HeadCell> # </Table.HeadCell>
              <Table.HeadCell> Web Id </Table.HeadCell>
              <Table.HeadCell> Photo </Table.HeadCell>
              <Table.HeadCell> Name </Table.HeadCell>
              <Table.HeadCell> Address </Table.HeadCell>
              <Table.HeadCell> NID </Table.HeadCell>
              <Table.HeadCell> Email </Table.HeadCell>
              <Table.HeadCell> Role </Table.HeadCell>
              <Table.HeadCell> Action </Table.HeadCell>
            </Table.Head>

            {/* table body. map operation */}
            {users.map((usersInfo, index) => (
              <Table.Body key={usersInfo._id}>
                <Table.Row className="bg-white text-black divide-y-2 hover dark:border-gray-800 dark:bg-gray-800">
                  <Table.Cell> {index + 1} </Table.Cell>
                  <Table.Cell> {usersInfo._id} </Table.Cell>
                  <Table.Cell>
                    <div className="avatar">
                      <div className="w-12 rounded-xl ">
                      <img src={usersInfo.img} />
                    </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell> {usersInfo.name} </Table.Cell>
                  <Table.Cell> {usersInfo.address} </Table.Cell>
                  <Table.Cell> {usersInfo.nid} </Table.Cell>
                  <Table.Cell> {usersInfo.email} </Table.Cell>
                  {/* role */}
                  <Table.Cell>
                    <Button
                      color="gray"
                      style={{ backgroundColor: "#01864C", color: "white" }} >
                      <FaUserShield></FaUserShield>
                    </Button>
                  </Table.Cell>
                  {/* delete button */}
                  <Table.Cell>
                    <Button
                      color="gray"
                      style={{ backgroundColor: "red", color: "white" }} >
                      <FaTrashAlt></FaTrashAlt>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      </div>
      <br />
    </div>
  );
};

export default ManageUsers;
