import React, { Component } from 'react';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './styles.css';

const items = [{ id: 1, value: 'great' }, { id: 2, value: 'hi how are you' }, { id: 2, value: 'hi how are you' }, { id: 2, value: 'hi how are you' }]
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
    console.log(this.props)
    return (
      <div>
        <div className='carousel-title-container'>
          <p className='carousel-title'>{this.props.title}</p>
        </div>
        <Slider {...settings}>
          {this.props.products.map(product => (
            <div className='carousel-item' key={product.id}>
              <Link to={`/${product.owner}/products/${product.id}`}>
                <div
                  style={{
                    background: `url(${product.images[0].large})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center"
                  }}
                />
                {/* <img   src="http://via.placeholder.com/243x243" */}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}