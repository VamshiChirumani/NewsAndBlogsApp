import React from "react";
import userImg from "../assets/images/DSC05373.JPG";
import "./Blogs.css";

const Blogs = () => {
  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={userImg} alt="User Image" />
      </div>
      <div className="blogs-right">
        {/* <button className="post-btn">Create New Post</button> */}
        <div className="blogs-right-form">
          <h1>New Post</h1>
          <form>
            <div className="image-upload">
              <label htmlFor="file-upload" className="file-upload">
                <i className="bx bx-upload"></i>Upload Image
              </label>
              <input type="file" id="file-upload" />
            </div>
            <input
              type="text"
              placeholder="Add title( Max 60 characters)"
              className="title-input"
            />
            <textarea className="text-input" placeholder="Add text"></textarea>
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
        <button className="blogs-close-btn">
          Back <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;
