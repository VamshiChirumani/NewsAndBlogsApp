import React, { useState } from 'react'
import News from './Components/News'
import Blogs from './Components/Blogs'

const App = () => {
  const [showNews, setShowNews] = useState(true)
  const [showBlogs, setShowBlogs] = useState(false)
  const [blogs, setBlogs] =useState([])

  const handleCreatedBlog = (newBlog) =>{
    setBlogs((prevBlogs) => [...prevBlogs, newBlog])
  }

  const handleShowBlogs = () => {
    setShowBlogs(true);
    setShowNews(false);
  };

  const handleBackToNews = () => {
    setShowBlogs(false);
    setShowNews(true);
  };
  return (
    <div className='container'>
      <div className='news-blogs-app'>
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs}/> }
        {showBlogs && <Blogs onBack={handleBackToNews} onCreateBlog={handleCreatedBlog}/> }
      </div>
    </div>
  )
}

export default App