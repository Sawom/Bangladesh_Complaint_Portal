import axios from "axios";
import { Button } from "flowbite-react";
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

        {/* show complains */}
        { complains.map( (coms)=>(
            <div   key={coms._id}
              className="card w-full bg-base-100 shadow-lg my-4"  >
                <div className="card-body text-left text-black">
                    <h2 className="card-title "> Name: {coms.name} </h2>
                    <h2 className="card-title"> Email: {coms.email} </h2>
                    <p> <span className="font-bold" >Complain:</span>  {coms.complain} </p>
                    <p> <span className="font-bold" >Provelink:</span>  <span> <a href={coms.provelink}  target="_blank"> {coms.provelink} </a>  </span>  </p>
                    <p> <span className="font-bold">Problem:</span> {coms.problem} </p>
                    <p> <span className="font-bold">Submission Date:</span> {coms.date} </p>
                    <p> <span className="font-bold">Division:</span> {coms.division} </p>
                    <p> <span className="font-bold">District:</span> {coms.district} </p>
                    <p> <span className="font-bold">Sub District:</span> {coms.subDistrict} </p>
                </div>
            </div>
            ))

        }


      </div>
      <br />
    </div>
  );
};

export default ManageComplain;