import axios from "axios";
import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  // State to store search input and result
  const [searchQuery, setSearchQuery] = useState("");

  //step 1 Fetch users initially to search
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users"); // Fetch all users initially
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // search function
  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      return;
    } // Prevent empty search

    try {
      const response = await axios.get(
        `http://localhost:5000/search/${searchQuery}`
      );
      setUsers(response.data); // Update the users state with search results
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#E5E5E5", minHeight: "70vh" }}
      className="p-3"
    >
      <br />
      <div
        className="container mx-auto mt-4 mb-4 p-3"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <h3 className="lg:text-3xl mb-5 md:text-2xl text-xl font-bold ml-4 ">
          Total users: {users.length}
        </h3>

        {/* Search box */}
        {/* Search Box */}
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by NID or Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered border-gray-300 rounded p-2"
          />
          <Button
            onClick={handleSearch}
            className="ml-2"
            style={{ backgroundColor: "#01864C", color: "white" }}
          >
            Search
          </Button>
        </div>

        {/* Display Result in table */}
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
                      style={{ backgroundColor: "#01864C", color: "white" }}
                    >
                      <FaUserShield></FaUserShield>
                    </Button>
                  </Table.Cell>
                  {/* delete button */}
                  <Table.Cell>
                    <Button
                      color="gray"
                      style={{ backgroundColor: "red", color: "white" }}
                    >
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
