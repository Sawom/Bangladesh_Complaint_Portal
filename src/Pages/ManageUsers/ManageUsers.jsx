import axios from "axios";
import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  // State to store search input and result
  const [searchQuery, setSearchQuery] = useState("");

  // pagination
  const [totalResults, setTotalResults] = useState(0); // Total number of results
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); 
  const limit = 10; 

  //step 1: Fetch users initially to search
  const fetchUsers = async (page = 1) => {
      try {
          // Include page and limit parameters and limit per page data in the request
          const response = await axios.get(`http://localhost:5000/users?page=${page}&limit=${limit}`);
          setUsers(response.data.users); // collect user data
          // handle pagination data as well
          setTotalResults(response.data.totalResults);
          setCurrentPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  // for refetch data load
  useEffect(() => {
    fetchUsers();
  }, []);

  // step 2: search function
  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      return;
    } // Prevent empty search

    try {
      const response = await axios.get(`http://localhost:5000/search/${searchQuery}`);
      setUsers(response.data); // Update the users state with search results
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  // Function to handle page change
  const handlePageChange = (page) => {
      fetchUsers(page); // Fetch users for the selected page
  };

  // delete user
  const handleDeleteUser = (delUser) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform Axios delete operation
        axios.delete(`http://localhost:5000/users/${delUser._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // Show success message
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User has been deleted!",
                showConfirmButton: false,
                timer: 1500,
              });
              // refetch user
              fetchUsers(currentPage);
            }
          })
          .catch((error) => {
            console.error("Error deleting review:", error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Failed to delete User.",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  return (
    <div
      style={{ backgroundColor: "#E5E5E5", minHeight: "70vh" }}
      className="p-3"
    >
      <br />
      <div
        className="container mx-auto mt-4 mb-4 p-3"
        style={{ backgroundColor: "#FFFFFF" }} >
        <h3 className="lg:text-3xl mb-5 md:text-2xl text-xl font-bold ml-4 ">
          Total users: {totalResults}
        </h3>

        {/* Search Box */}
        <div className="flex justify-center mb-4">
          <input
            style={{width:"70%"}}
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
                  {/* continuous indexing */}
                  <Table.Cell>  {(currentPage - 1) * limit + index + 1} </Table.Cell> 
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
                      onClick={() => handleDeleteUser(usersInfo)}
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

        {/* pagination control button */}
        <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`mx-1 ${currentPage === index + 1 ? 'bg-green-600 text-white' : 'bg-gray-500'}`} >
                    {index + 1}
                  </Button>
              ))}
          </div>

      </div>
      <br />
    </div>
  );
};

export default ManageUsers;