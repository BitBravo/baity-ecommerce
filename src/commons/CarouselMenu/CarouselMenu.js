import React, { Component } from 'react';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import FirestoreServices from 'services/FirestoreServices'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Row, Col } from "react-bootstrap";

import './styles.css';

export default class CarouselMenu extends Component {
  constructor(props) {
    super(props);
    this.loadFlag = false;
    this.state = {
      oldProps: '',
      filters: [],
      editModalFalg: false,
      modalStatus: {},
      modalLeft: '200px',
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

  componentWillMount() {
    FirestoreServices.readDBRecord('product-specification', 'filters')
      .then(filters => this.setState({ filters: filters.department }))
  }

  editDiscovery = (e, index) => {
    const leftMargin = e.target.getClientRects()[0].left - 100;
    let modalStatus = {};
    const { items } = this.state.oldProps;
    modalStatus.departmentId = items ? items[index].departmentId : 'None';
    modalStatus.image = items ? items[index].image : 'None';
    modalStatus.selectedId = index;
    this.setState({ editModalFalg: true, modalLeft: `${leftMargin}px`, modalStatus });
  }

  onEditModal = (e) => {
    const { modalStatus } = this.state;
    if (e.target.name === 'dapartment') {
      modalStatus.departmentId = e.target.value;
    }
    else {
      modalStatus.image = e.target.value;
    }
    this.setState({ modalStatus })
  }

  onSaveAction = () => {
    let resultData = {};
    let itemDatas = this.state.oldProps.items;
    const { modalStatus } = this.state;

    let otherRows = itemDatas.filter(item => item.departmentId !== this.state.modalStatus.departmentId) || [];
    otherRows.push(modalStatus);
    resultData['discoveryList'] = otherRows;

    FirestoreServices.saveAdminData('product-discovery', resultData).then((res) => {
      if (res) {
        this.props.onRefresh();
      }
    })
    this.setState({ editModalFalg: false });
  }

  onChangeAction = () => {
    console.log('onChangeAction')
    this.setState({ editModalFalg: false });
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
    let { items, title } = this.state.oldProps || { items: [] };
    const itemTitleClassName = title === 'اختر منتجات منزلك' ? 'gray-center' : 'white-right';
    const departments = this.state.filters;
    // console.log(items)
    return (
      <div className="item-discovery-session">
        <div className='carousel-title-container'>
          <p className='carousel-title'>{title}</p>
        </div>
        <Slider {...settings}>
          {
            departments ?
              departments.map((department, index) => (
                <div className='carousel-item' key={department}>
                  <Link to={`/productspage/${items[index] ? items[index].departmentId : department}`}>
                    <div
                      style={{
                        background: `url(${items[index] ? items[index].image : 'none'})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center"
                      }}
                    >
                    </div>
                    <p className={itemTitleClassName}>{items[index] ? items[index].departmentId : department}</p>
                  </Link>
                  <div className="editBtn-area">
                    <button className="editBtn" onClick={(e) => { this.editDiscovery(e, index) }}>
                      Edit
                    </button>
                  </div>
                </div>
              ))
              :
              ''
          }
        </Slider>
        {this.state.editModalFalg ?
          <div className="item-discovery-edit-modal" style={{ left: this.state.modalLeft }}>
            <div className="departmentList">
              <select name='dapartment' value={this.state.modalStatus.departmentId} onChange={this.onEditModal}>
                <option value='None'>None</option>
                {
                  departments ?
                    departments.map(department =>
                      <option value={department} key={department}>{department}</option>
                    )
                    :
                    ''
                }

              </select>
            </div>
            <div className="imageInfo">
              <input type="text" name='image' value={this.state.modalStatus.image} onChange={this.onEditModal}></input>
            </div>
            <div className="toolbar">
              <Col md={5} mdOffset={1}>
                <button onClick={this.onChangeAction}>Change</button>
              </Col>
              <Col md={5}>
                <button onClick={this.onSaveAction}>Save</button>
              </Col>
            </div>
          </div>
          :
          ''
        }

      </div>
    );
  }
}