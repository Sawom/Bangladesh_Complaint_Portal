import axios from "axios";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { divisionsData, problemCategory } from "../PostComplain/bdData";

const ManageComplain = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch for the changes in division and district fields
  const watchDivision = watch("division");
  const watchDistrict = watch("district");
  const watchProblem = watch("category");

  const [complains, setComplains] = useState([]);
  //  search
  const [searchQuery, setSearchQuery] = useState("");

  // pagination
  const [totalComplains, setTotalComplains] = useState(0); // Total number of results
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  //step 1: Fetch users initially to search and pagination
  const fetchComplains = async (page = 1, filters = {}) => {
    try {
      let apiUrl = `http://localhost:5000/complains?page=${page}&limit=${limit}`;

      const queryParams = new URLSearchParams();
      queryParams.append("page", page);
      queryParams.append("limit", limit);

      // adding filters
      if (filters.division) queryParams.append("division", filters.division);
      if (filters.district) queryParams.append("district", filters.district);
      if (filters.subDistrict)
        queryParams.append("subdistrict", filters.subDistrict);
      if (filters.problem) queryParams.append("problem", filters.problem);

      // If there are filters, append them to the base API URL
      if (queryParams.toString()) {
        apiUrl += `&${queryParams.toString()}`;
      }

      const response = await axios.get(apiUrl);

      setComplains(response.data.complains); // collect complains data
      // handle pagination data as well
      setTotalComplains(response.data.totalComplains);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Get the selected division and district data dynamically
  const selectedDivisionData = divisionsData.find(
    (div) => div.division === watchDivision
  );
  const selectedDistrictData = selectedDivisionData?.district.find(
    (dist) => dist.districtname === watchDistrict
  );

  // for refetch data load
  useEffect(() => {
    fetchComplains(currentPage);
  }, [currentPage]);

  // Fetch filtered data on form submit
  const onSubmitFilter = (data) => {
    const filters = {
      division: data.division,
      district: data.district,
      subDistrict: data.subDistrict,
      problem: data.problem,
    };

    // Fetch complains with filters (reset to page 1)
    fetchComplains(1, filters);
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
              // refetch data load
              fetchComplains();
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
              title: "Failed to delete Complain.",
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
      <Helmet>
        <title> Manage Complain </title>
      </Helmet>
      <br />
      <div
        className="container mx-auto mt-4 mb-4 p-3"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <h3 className="lg:text-3xl mb-5 md:text-2xl text-xl font-bold ml-4 ">
          Total Complains: {totalComplains}
        </h3>
        <p className="text-xl font-bold px-5">Filter</p>
        <div>
          <form onSubmit={handleSubmit(onSubmitFilter)}>
            {/* grid */}
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 p-5 gap-5">
              {/* category filter */}
              <div>
                <label>problem category</label>
                <br />
                <select
                  {...register("problem")}
                  style={{
                    outline: "none",
                    border: "2px solid #7E7E7E",
                    padding: "10px",
                    borderRadius: "4px",
                    width: "100%",
                    backgroundColor: "white",
                    color: "black",
                    transition: "border-color 0.5s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "grey";
                    e.target.style.boxShadow = "none";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "grey";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="">Select category</option>
                  {problemCategory.map((problems, idx) => (
                    <option key={idx} value={problems.category}>
                      {problems.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Division Filter */}
              <div>
                <label>Division</label>
                <br />
                <select
                  {...register("division")}
                  style={{
                    outline: "none",
                    border: "2px solid #7E7E7E",
                    padding: "10px",
                    borderRadius: "4px",
                    width: "100%",
                    backgroundColor: "white",
                    color: "black",
                    transition: "border-color 0.5s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "grey";
                    e.target.style.boxShadow = "none";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "grey";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="">Select Division</option>
                  {divisionsData.map((division, idx) => (
                    <option key={idx} value={division.division}>
                      {division.division}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Filter */}
              <div>
                <label>District</label>
                {watchDivision && (
                  <div>
                    <select
                      {...register("district")}
                      style={{
                        outline: "none",
                        border: "2px solid #7E7E7E",
                        padding: "10px",
                        borderRadius: "4px",
                        width: "100%",
                        backgroundColor: "white",
                        color: "black",
                        transition: "border-color 0.5s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "grey";
                        e.target.style.boxShadow = "none";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "grey";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <option value="">Select District</option>
                      {selectedDivisionData?.district.map((district, idx) => (
                        <option key={idx} value={district.districtname}>
                          {district.districtname}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Subdistrict Filter */}
              <div>
                <label>Subdistrict</label>
                {watchDistrict && (
                  <div>
                    <select
                      {...register("subDistrict")}
                      style={{
                        outline: "none",
                        border: "2px solid #7E7E7E",
                        padding: "10px",
                        borderRadius: "4px",
                        width: "100%",
                        backgroundColor: "white",
                        color: "black",
                        transition: "border-color 0.5s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "grey";
                        e.target.style.boxShadow = "none";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "grey";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <option value="">Select Subdistrict</option>
                      {selectedDistrictData?.subdistrict.map(
                        (subDistrict, idx) => (
                          <option key={idx} value={subDistrict}>
                            {subDistrict}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <br />
            {/* Submit button to apply filter */}
            <Button
              type="submit"
              className="ml-2"
              style={{ backgroundColor: "#01864C", color: "white" }}
            >
              Filter
            </Button>
          </form>
        </div>

        {/* show complains */}
        {complains.map((coms) => (
          <div
            key={coms._id}
            className="card w-full bg-base-100 shadow-lg my-4"
          >
            <div className="card-body text-left text-black">
              <h2 className="card-title "> Name: {coms.name} </h2>
              <h2 className="card-title"> Email: {coms.email} </h2>
              <p>
                <span className="font-bold">Complain: </span> {coms.complain}{" "}
              </p>

              <p>
                <span className="font-bold">Provelink:</span>
                <span>
                  <a
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      display: "block", // Use block for the link inside flex container
                      maxWidth: "60%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    href={coms.provelink}
                    target="_blank"
                  >
                    {coms.provelink}
                  </a>
                </span>
              </p>
              <p>
                <span className="font-bold">Problem Category: </span>{" "}
                {coms.problem}
              </p>
              <p>
                <span className="font-bold">Submission Date:</span> {coms.date}
              </p>
              <p>
                <span className="font-bold">Division:</span> {coms.division}
              </p>
              <p>
                <span className="font-bold">District:</span> {coms.district}
              </p>
              <p>
                <span className="font-bold">Sub District: </span>
                {coms.subDistrict}{" "}
              </p>
              {/* delete btn */}
              <Button
                className="w-16 mt-2"
                onClick={() => handleDeleteComplain(coms)}
                color="gray"
                style={{ backgroundColor: "red", color: "white" }}
              >
                <FaTrashAlt></FaTrashAlt>
              </Button>
            </div>
          </div>
        ))}

        {/* pagination control button */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 ${
                currentPage === index + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-500"
              }`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
      <br />
    </div>
  );
};

export default ManageComplain;