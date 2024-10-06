import axios from "axios";
import React, { useEffect, useState } from "react";

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
      const response = await axios.get(`http://localhost:5000/search/${searchQuery}`);
      setUsers(response.data); // Update the users state with search results
    } catch (error) {
      console.error("Error searching:", error);
    }
  };


  // Function to handle page change
  const handlePageChange = (page) => {
      fetchComplains(page); // Fetch users for the selected page
  };

  return <div>manage complain</div>;
};

export default ManageComplain;