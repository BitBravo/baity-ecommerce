import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import FirestoreServices from 'services/FirestoreServices';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Col } from 'react-bootstrap';
import empty_icon from 'assets/img/empty.png';

import './styles.css';

const settingsDesktop = {
  speed: 500,
  autoplay: false,
  slidesToShow: 6,
  slidesToScroll: 1,
  rows: 1,
  arrows: true,
  dots: false,
  initialSlide: 0,
  swipeToSlide: true,
  draggable: true,
  // responsive: [
  //   {
  //     breakpoint: 1200,
  //     settings: {
  //       slidesToShow: 4,
  //       slidesToScroll: 1,
  //     },
  //   },
  //   {
  //     breakpoint: 1042,
  //     settings: {
  //       slidesToShow: 4,
  //       slidesToScroll: 1,
  //     },
  //   },
  //   {
  //     breakpoint: 990,
  //     settings: {
  //       slidesToShow: 3,
  //       slidesToScroll: 1,
  //     },
  //   },
  //   {
  //     breakpoint: 640,
  //     settings: {
  //       slidesToShow: 2,
  //       slidesToScroll: 1,
  //     },
  //   },
  //   {
  //     breakpoint: 480,
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //     },
  //   },
  // ],
};

const settingsMobile = {
  speed: 500,
  autoplay: false,
  slidesToShow: 6,
  slidesToScroll: 1,
  rows: 1,
  arrows: false,
  dots: false,
  initialSlide: 0,
  swipeToSlide: true,
  draggable: false,
};

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
      topMargin: '50px',
    };

    this.editDiscovery = this.editDiscovery.bind(this);
    this.onEditModal = this.onEditModal.bind(this);
    this.onSaveAction = this.onSaveAction.bind(this);
    this.onChangeAction = this.onChangeAction.bind(this);
  }

  componentWillMount() {
    FirestoreServices.readDBRecord('product-specification', 'filters')
      .then(filters => this.setState({ filters: filters.department }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps === this.state.oldProps) {
      this.loadFlag = true;
    } else {
      this.setState({ oldProps: nextProps });
      this.loadFlag = false;
    }
  }

  shouldComponentUpdate() {
    if (this.loadFlag) return false;
    return true;
  }

  onEditModal(e) {
    const { modalStatus } = this.state;
    if (e.target.name === 'dapartment') {
      modalStatus.departmentId = e.target.value;
    } else {
      modalStatus.image = e.target.value;
    }
    this.setState({ modalStatus });
  }

  onSaveAction() {
    const resultData = {};
    const itemDatas = this.state.oldProps.items;
    const { modalStatus } = this.state;
    const { redirectUrl } = this.props;
    const discoveryDBName = redirectUrl.includes('product') ? 'product-discovery' : 'idea-discovery';
    const otherRows = itemDatas.filter(item => item.departmentId !== this.state.modalStatus.departmentId) || [];
    otherRows.push(modalStatus);
    resultData.discoveryList = otherRows;

    FirestoreServices.saveAdminData(discoveryDBName, resultData).then((res) => {
      if (res) {
        this.props.onRefresh();
      }
    });
    this.setState({ editModalFalg: false });
  }

  onChangeAction() {
    this.setState({ editModalFalg: false });
  }

  editDiscovery(e, department, index) {
    console.log(this.props)
    const { deviceFlag } = this.props;
    const modalStatus = {};
    const { items } = this.state.oldProps;
    const departmentObj = items.find((item) => item.departmentId === department) || {};
    const departmentImg = departmentObj.image;
    modalStatus.departmentId = department;
    modalStatus.image = departmentImg;
    modalStatus.selectedId = index;
    const leftMargin = deviceFlag ? (e.target.getClientRects()[0].left - 400) : e.target.getClientRects()[0].left;
    const topMargin = deviceFlag ? (e.target.getClientRects()[0].top -100) : e.target.getClientRects()[0].top + 400;
    this.setState({ editModalFalg: true, modalLeft: `${leftMargin}px`, modalTop: `${topMargin}px`, modalStatus });
  }

  render() {
    const { items, title } = this.state.oldProps || { items: [{}] };
    const itemTitleClassName = title === 'اختر منتجات منزلك' ? 'gray-center' : 'white-right';
    const itemGradient = title === 'اختر منتجات منزلك' ? '' : 'linear-gradient(#e9e8e854 64%, #1b1b1bcc),';
    const departments = this.state.filters;
    const { adminViewFlag, redirectUrl, deviceFlag } = this.props;
    const settings =deviceFlag? settingsDesktop : settingsMobile;

    return (
      <div
        className="item-discovery-session"
      >
        <div className="carousel-title-container">
          <p className="carousel-title">{title}</p>
        </div>
        <Slider {...settings}>
          {
            departments ?
              departments.map((department, index) => (
                <div className="carousel-item" key={department}>
                  <Link to={`/${redirectUrl}/${department}`}>
                    <div
                      style={{
                        background: `${itemGradient} url(${
                          (() => {
                            const matchedData = items.find(item => item.departmentId === department) || {};
                            return matchedData.image || empty_icon
                          })()
                        })`,
                        // linear-gradient(#e9e8e8 64%, #1b1b1b), 
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                      }}
                    />
                    <p className={itemTitleClassName}>{department}</p>
                  </Link>
                  {
                    adminViewFlag ? (
                      <div className="editBtn-area">
                        <button className="editBtn" onClick={(e) => { this.editDiscovery(e, department, index); }}>
                          Edit
                        </button>
                      </div>
                    ) : ''
                  }
                </div>
              ))
              :
              ''
          }
        </Slider>
        {
          this.state.editModalFalg ?
            <div className="item-discovery-edit-modal" style={{ left: this.state.modalLeft, top: this.state.modalTop }}>
              <div className="departmentList">
                <select name="dapartment" value={this.state.modalStatus.departmentId} onChange={this.onEditModal}>
                  <option value="None">None</option>
                  {
                    departments ?
                      departments.map(department =>
                        <option value={department} key={department}>{department}</option>,
                      )
                      :
                      ''
                  }

                </select>
              </div>
              <div className="imageInfo">
                <input type="text" name="image" value={this.state.modalStatus.image} onChange={this.onEditModal} />
              </div>
              <div className="toolbar">
                <Col md={5} mdOffset={1}>
                  <button onClick={this.onChangeAction}>Cancel</button>
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
