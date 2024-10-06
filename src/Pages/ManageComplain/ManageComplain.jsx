import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageComplain = () => {
  const [complains, setComplains] = useState([]);
  const [users, setUsers] = useState([]);
  //  search
  const [searchQuery, setSearchQuery] = useState("");

  // pagination
  const [totalComplains, setTotalComplains] = useState(0); // Total number of results
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  //step 1: Fetch users initially to search
  const fetchComplains = async (page = 1) => {
    try {
      // Include page and limit parameters and limit per page data in the request
      const response = await axios.get(
        `http://localhost:5000/complains?page=${page}&limit=${limit}`
      );
      setComplains(response.data.complains); // collect user data
      // handle pagination data as well
      setTotalComplains(response.data.totalComplains);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // for refetch data load
  useEffect(() => {
    fetchComplains();
  }, []);

  // step 2: search function
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

  // Function to handle page change
  const handlePageChange = (page) => {
    fetchComplains(page); // Fetch users for the selected page
  };

  // delete user
  const handleDeleteComplain = (delcomplains) => {
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
        axios
          .delete(`http://localhost:5000/complains/${delcomplains._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // Show success message
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Complain has been deleted!",
                showConfirmButton: false,
                timer: 1500,
              });
              // refetch user
              fetchComplains(currentPage);
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
      className="p-3">
      <br />
      <div
        className="container mx-auto mt-4 mb-4 p-3"
        style={{ backgroundColor: "#FFFFFF" }} >
            <h3 className="lg:text-3xl mb-5 md:text-2xl text-xl font-bold ml-4 ">
                Total Complains: {totalComplains}
            </h3>

      </div>
      <br />
    </div>
  );
};

export default ManageComplain;
