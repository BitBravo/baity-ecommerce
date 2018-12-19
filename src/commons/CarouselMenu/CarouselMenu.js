import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import FirestoreServices from 'services/FirestoreServices';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Col, Modal } from 'react-bootstrap';
// import styled from 'styled-components';
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

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.1,
};

const dialogStyle = (x, y) => ({
  position: 'absolute',
  width: 250,
  top: `${x}px`,
  left: `${y}px`,
  border: '1px solid #e5e5e5',
  backgroundColor: '#eff1ec',
  boxShadow: '0 5px 15px rgba(0,0,0,.5)',
  padding: '20px 20px 10px 20px',
});

export default class CarouselMenu extends Component {
  constructor(props) {
    super(props);
    this.loadFlag = false;
    this.ps = [];

    this.state = {
      oldProps: '',
      filters: [],
      editModalFalg: false,
      modalStatus: {},
      showModal: false,
      modalLeft: 0,
      modalTop: 0,
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
    const modalStatus = {};
    const { items } = this.state.oldProps;
    const departmentObj = items.find(item => item.departmentId === department) || {};
    const departmentImg = departmentObj.image;
    modalStatus.departmentId = department;
    modalStatus.image = departmentImg;
    modalStatus.selectedId = index;
    const leftMargin = (e.target.getClientRects()[0].left - 100);
    const topMargin = (e.target.getClientRects()[0].bottom + 50);
    this.setState({ editModalFalg: true, modalLeft: leftMargin, modalTop: topMargin, modalStatus });
  }

  render() {
    const { items, title } = this.state.oldProps || { items: [{}] };
    const itemTitleClassName = title === 'اختر منتجات منزلك' ? 'gray-center' : 'white-right';
    const itemGradient = title === 'اختر منتجات منزلك' ? '' : 'linear-gradient(#e9e8e854 64%, #1b1b1bcc),';
    const departments = this.state.filters;
    const { adminViewFlag, redirectUrl, deviceFlag } = this.props;
    const settings = deviceFlag ? settingsDesktop : settingsMobile;

    const { modalLeft, modalTop } = this.state;
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
                            return matchedData.image || empty_icon;
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
              : ''
          }
        </Slider>
        <Modal
          aria-labelledby="modal-label"
          style={modalStyle}
          backdropStyle={backdropStyle}
          show={this.state.editModalFalg}
          onHide={this.onChangeAction}
        >
          <div style={dialogStyle(modalTop, modalLeft)}>
            <div className="departmentList">
              <select name="dapartment" value={this.state.modalStatus.departmentId} onChange={this.onEditModal}>
                <option value="None">None</option>
                {
                  departments ? departments.map(department => <option value={department} key={department}>{department}</option>) : ''
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
        </Modal>
      </div>
    );
  }
}
