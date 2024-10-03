import React from "react";

const PostComplain = () => {
  return (
    <div
      style={{ backgroundColor: "#E5E5E5", minHeight: "70vh" }}
      className="p-3">
      <br />
      <div className="container mx-auto mt-4 mb-4 flex justify-center items-center">
        {/* update form */}
        <div
          className="card w-full max-w-lg shrink-0 p-5 "
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <h2 className="text-lg"> what is your complain? tell us </h2>
          <form className="card-body" >
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                name="name"
                defaultValue=""
                
                
              />
            </div>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                defaultValue=""
                
                
              />
            </div>

            {/* review */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Review</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32"
                placeholder="Review"
                
                required
              ></textarea>
            </div>


            {/* sign up button */}
            <div className="form-control mt-6">
              <button
                className="btn "
                style={{
                  backgroundColor: "#016A4E",
                  color: "white",
                  fontStyle: "bold",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <br />
    </div>
  );
};

export default PostComplain;
