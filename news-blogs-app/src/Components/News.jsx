import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import Calendar from './Calendar'
import './News.css'
import userImg from '../assets/images/DSC05373.JPG'
import noImg from '../assets/images/no-img.png'
import axios from 'axios'


const categories = [
  'general',
  'bussiness',
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


  useEffect(()=>{
    const fetchNews = async ()=>{
      const apikey1 = import.meta.env.VITE_NEWS_API_KEY;
      // const apikey = import.meta.env.VITE_NEWS_API_KEY_fake;
      const apikey = import.meta.env.VITE_NEWS_API2;
      const url =
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=";
      const response = await axios.get(url+apikey);

      
      const fetchedNews = response.data.articles
      console.log(fetchedNews);
      fetchedNews.forEach((article)=>{
        if(!article.urlToImage){
          article.urlToImage = noImg;
        }
      })

      setHeadline(fetchedNews[0]); 
      setNews(fetchedNews.slice(1,7));
      console.log(fetchedNews[0]);

    };
    fetchNews();
  },[selectedCategory])

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form>
            <input type="text" placeholder="search..." />
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
              <a href="#" className="nav-link">
                General
              </a>
              <a href="#" className="nav-link">
                Business
              </a>
              <a href="#" className="nav-link">
                Technology
              </a>
              <a href="#" className="nav-link">
                Entertainment
              </a>
              <a href="#" className="nav-link">
                Sports
              </a>
              <a href="#" className="nav-link">
                Science
              </a>
              <a href="#" className="nav-link">
                Health
              </a>
              <a href="#" className="nav-link">
                Nation
              </a>
              <a href="#" className="nav-link">
                Bookmarks <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && (
            <div className="headline">
              <img src={headline.urlToImage || noImg} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-grid-item">
                <img src={article.urlToImage || noImg} alt={article.title} />
                <h3>
                  {article.title}
                  <i className="fa-regular fa-bookmark bookmark"></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
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