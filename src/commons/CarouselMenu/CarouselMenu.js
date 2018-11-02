import React, { Component } from 'react';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './styles.css';

export default class CarouselMenu extends Component {
  constructor(props) {
    super();
    this.state = {
      oldProps: ''
    }
  }
  shouldComponentUpdate() {
    if (this.props === this.state.oldProps) {
      return false;
    } else {
      this.setState({ oldProps: this.props })
      return true;
    }
  }

  render() {
    const settings = {
      speed: 500,
      autoplaySpeed: 3000,
      // autoplay: true,
      slidesToShow: this.props.items.length > 5 ? 5 : this.props.items.length,
      slidesToScroll: 1,
      rows: 1,
      arrows: true,
      dots: false,
      initialSlide: 0,
      swipeToSlide: true,
      draggable: false,
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
    const itemTitleClassName = this.props.title === 'اختر منتجات منزلك' ? 'gray-center' : 'white-right';
    console.log(itemTitleClassName)
    return (
      <div>
        <div className='carousel-title-container'>
          <p className='carousel-title'>{this.props.title}</p>
        </div>
        <Slider {...settings}>
          {this.props.items.map(item => (
            <div className='carousel-item' key={item.id}>
              <Link to={`/${item.owner}/products/${item.id}`}>
                <div
                  style={{
                    background: `url(${item.images[0].large})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center"
                  }}
                >
                  <p className={itemTitleClassName}>${item.businessName}</p>
                </div>
                {/* <img   src="http://via.placeholder.com/243x243" */}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}