import React, { Component } from 'react';
import Slider from "react-slick";
import './styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const items = [{ id: 1, value: 'great' }, { id: 2, value: 'hi how are you' }, { id: 2, value: 'hi how are you' }, { id: 2, value: 'hi how are you' }]
export default class CarouselMenu extends Component {
  render() {
    const settings = {
      speed: 500,
      autoplaySpeed: 3000,
      // autoplay: true,
      swipeToSlide: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      rows: 1,
      arrows: true,
      dots: false,
      initialSlide: 0,
      infinite: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div>
        <div className='carousel-title-container'>
          <p className='carousel-title'>Multiple items </p>
        </div>
        <Slider {...settings}>
          {items.map(item => (
            <div className="carousel-item">{item.value}</div>
          ))}
        </Slider>
      </div>
    );
  }
}