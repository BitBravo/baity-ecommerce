import React, { Component } from 'react';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './styles.css';

export default class CarouselMenu extends Component {
  constructor(props) {
    super();
    this.loadFlag = false;
    this.state = {
      oldProps: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps === this.state.oldProps) {
      this.loadFlag = true;
    } else {
      this.setState({ oldProps: nextProps })
      this.loadFlag = false;
    }
  }
  shouldComponentUpdate() {
    if (this.loadFlag) return false;
    else return true;
  }

  render() {
    const settings = {
      speed: 500,
      autoplay: false,
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
    const { items, title } = this.state.oldProps;
    const itemTitleClassName = title === 'اختر منتجات منزلك' ? 'gray-center' : 'white-right';
    console.log(items)
    return (
      <div>
        <div className='carousel-title-container'>
          <p className='carousel-title'>{title}</p>
        </div>
        <Slider {...settings}>
          {
            items ?
              items.map(item => (
                <div className='carousel-item' key={item.departmentId}>
                  <Link to={`/productspage/${item.departmentId}`}>
                    <div
                      style={{
                        background: `url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center"
                      }}
                    >
                      <p className={itemTitleClassName}>${item.title}</p>
                    </div>
                  </Link>
                </div>
              ))
              :
              `Didn't configurate the product discovery option by Administrator yet`
          }
        </Slider>
      </div>
    );
  }
}