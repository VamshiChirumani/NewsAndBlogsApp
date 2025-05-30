import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import Calendar from './Calendar'
import './News.css'
import userImg from '../assets/images/DSC05373.JPG'
import blogImg1 from '../assets/images/blog1.jpg'
import blogImg2 from '../assets/images/blog2.jpg'
import blogImg3 from '../assets/images/blog3.jpg'
import blogImg4 from '../assets/images/blog4.jpg'
import noImg from '../assets/images/no-img.png'
import NewsModal from './NewsModal'
import Bookmarks from './Bookmarks'

import axios from 'axios'


const categories = [
  'general',
  'business',
  'health',
  'technology',
  'sports',
  'science',
  'entertainment'
]

const News = ({onShowBlogs, blogs}) => {

  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [showModal,setShowModal] = useState(false);
  const [selectedArticle,setSelectedArticle] = useState(null);

  const [bookmarks,setBookmarks] = useState([]);
  const [showBookmarks,setShowBookmarks] = useState(false);




  useEffect(()=>{
    const fetchNews = async ()=>{
      
      const apikey = import.meta.env.VITE_NEWS_API_KEY;
      let  url = `https://newsapi.org/v2/top-headlines?category=${selectedCategory}&country=us&apiKey=`;
      
      if(searchQuery){
        url=`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=`
        
      }
      
      const response = await axios.get(url + apikey);

      const fetchedNews = response.data.articles
      fetchedNews.forEach((article)=>{
        if(!article.urlToImage){
          article.urlToImage = noImg;
        }
      })

      setHeadline(fetchedNews[0]); 
      setNews(fetchedNews.slice(1,7));

      const savedBookmarks = JSON.parse(localStorage.getItem('bookmark')) ||[]
      setBookmarks(savedBookmarks)

    };
    fetchNews();
  },[selectedCategory,searchQuery])

  const handleCategoryClick = (e, category) =>{
    e.preventDefault();
    setSelectedCategory(category);
    setSearchQuery('')
  }

  const handleSearch = (e)=>{
    e.preventDefault()
    setSearchQuery(searchInput)
    setSearchInput('')
  }

  const handleArticleClick = (article) =>{
    setSelectedArticle(article)
    setShowModal(true)
  }

  const handleBookmarkClick = (article) => {
    setBookmarks((prevBookmarks) => {
      const updatedBookmarks = prevBookmarks.find(
        (bookmark) => bookmark.title === article.title)
        ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title)
        : [...prevBookmarks, article]
        localStorage.setItem('bookmark', JSON.stringify(updatedBookmarks))
      return updatedBookmarks
    });

  }

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="search..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="nav-bar">
          <div className="user" onClick={onShowBlogs}>
            <img src={userImg} alt="User Image" />
            <p>Vamshi's Blog</p>
          </div>
          <nav className="categories">
            <h1 className="nav-headings">Categories</h1>
            <div className="nav-links">
              {categories.map((category) => (
                <a
                  href="#"
                  key={category}
                  onClick={(e) => handleCategoryClick(e, category)}
                  className="nav-link"
                >
                  {category}
                </a>
              ))}

              <a
                href="#"
                className="nav-link"
                onClick={() => setShowBookmarks(true)}
              >
                Bookmarks <i className="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && (
            <div
              className="headline"
              onClick={() => handleArticleClick(headline)}
            >
              <img src={headline.urlToImage || noImg} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
                <i
                  className={` ${
                    bookmarks.some(
                      (bookmark) => bookmark.title === headline.title
                    )
                      ? "fa-solid"
                      : "fa-regular"
                  } fa-bookmark bookmark`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(headline);
                  }}
                ></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => (
              <div
                key={index}
                className="news-grid-item"
                onClick={() => handleArticleClick(article)}
              >
                <img src={article.urlToImage || noImg} alt={article.title} />
                <h3>
                  {article.title}
                  <i
                    className={` ${
                      bookmarks.some(
                        (bookmark) => bookmark.title === article.title
                      )
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-bookmark bookmark`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(article);
                    }}
                  ></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />
        <Bookmarks
          show={showBookmarks}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarks(false)}
          onSelectArticle={handleArticleClick}
          onDeleteBookmark={handleBookmarkClick}
        />
        <div className="my-blogs">
          <h1 className="my-blogs-heading">My Blog Posts</h1>
          <div className="blog-posts">
            {blogs.map((blog,index) => (
              <div key={index} className="blog-post"> 
                
              <img src={blog.image || noImg} alt={blog.title} />
              <h3>{blog.title}</h3>
              {/* <p>{blog.content}</p> */}
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
              </div>
            ))}
          </div>
        </div>
        <div className="weather-calendar">
          <Weather />
          <Calendar />
        </div>
      </div>
      <footer className="news-footer">
        <p>
          <span>News and Blogs App</span>
        </p>
        <p>&copy; All rights reserved</p>
      </footer>
    </div>
  );
}

export default News