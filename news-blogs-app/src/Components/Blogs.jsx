import React, { useState } from "react";
import userImg from "../assets/images/DSC05373.JPG";
import noImg from "../assets/images/noImg.png";
import "./Blogs.css";

const Blogs = ({onBack, onCreateBlog}) => {

    const [showForm, setShowForm] = useState(false)
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleImageChange = (e)=>{
        if(e.target.files && e.target.files[0]){
            const reader  = new FileReader()
            reader.onloadend = ()=> {
                setImage(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const newBlog= {
            image: image || noImg,
            title,
            content,
        }
        onCreateBlog(newBlog)
        setImage(null)
        setTitle("")
        setContent("")
        setShowForm(false)
    }

    
  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={userImg} alt="User Image" />
      </div>
      <div className="blogs-right">
        {!showForm ? (
          <button className="post-btn" 
          onClick={() => setShowForm(true)}>
            Create New Post
          </button>
        ) : (
          <div className="blogs-right-form">
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
              <div className="image-upload">
                <label htmlFor="file-upload" className="file-upload">
                  <i className="bx bx-upload"></i>Upload Image
                </label>
                <input type="file" id="file-upload" onChange={handleImageChange}/>
              </div>
              <input
                type="text"
                placeholder="Add title( Max 60 characters)"
                className="title-input"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />
              <textarea
                className="text-input"
                placeholder="Add text"
                value={content}
                onChange={(e)=>setContent(e.target.value)}
              ></textarea>
              <button className="submit-btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}
        <button className="blogs-close-btn" onClick={onBack}>
          Back <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;
