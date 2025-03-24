import React from 'react'
import demoImg from '../assets/images/demo.jpg'
import './NewsModal.css'

const NewsModal = () => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button">
          <i className="fa-solid fa-xmark"></i>
        </span>
        <img className='modal-image' src={demoImg} alt="Modal Image" />
        <h2 className="modal-title">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci,
          in?
        </h2>
        <p className="modal-source">Source: ource of article</p>
        <p className="modal-date">Some random Date</p>
        <p className="modal-content-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi
          reprehenderit non vero cum vel! Est, nulla obcaecati. Eum dicta,
          voluptatum sequi distinctio ut voluptatem. Nam dolorum eligendi amet
          porro illo tempore. Quaerat nihil voluptatum sapiente!
        </p>
        <a href="#" className="read-more-link">Read More</a>
      </div>
    </div>
  );
}

export default NewsModal