import React from 'react'
import "./Weather.css"

const Weather = () => {
  return (
    <div className='weather' > 
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot">
              <div className="location">Dallas</div>
            </i>
          </div>
          <div className="search-location">
            <input type="text" placeholder='Enter location' />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="weather-data">
        <i className='bx bxs-sun'></i>
        </div>
    </div>
  )
}

export default Weather