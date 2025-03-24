import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import Calendar from './Calendar'
import './News.css'
import userImg from '../assets/images/DSC05373.JPG'
import noImg from '../assets/images/no-img.png'
import NewsModal from './NewsModal'
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

const News = () => {

  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [showModal,setShowModal] = useState(false);
  const [selectedArticle,setSelectedArticle] = useState(null);



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
          <div className="user">
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

              <a href="#" className="nav-link">
                Bookmarks <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && (
            <div className="headline" onClick={()=>handleArticleClick(headline)}>
              <img src={headline.urlToImage || noImg} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-grid-item" onClick={()=>handleArticleClick(article)} >
                <img src={article.urlToImage || noImg} alt={article.title} />
                <h3>
                  {article.title}
                  <i className="fa-regular fa-bookmark bookmark"></i>
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
        <div className="my-blogs">My Blogs</div>
        <div className="weather-calendar">
          <Weather />
          <Calendar />
        </div>
      </div>
      <footer className="news-footer">Footer</footer>
    </div>
  );
}

export default News