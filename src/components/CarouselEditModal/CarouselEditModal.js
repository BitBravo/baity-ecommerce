import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import FirestoreServices from 'services/FirestoreServices';

import './styles.css';


export class CarouselEditModal extends Component {
  constructor() {
    super();
    this.state = {
      carouselItems: [],
      modalFlag: false,
    };
    this.dataChange = this.dataChange.bind(this);
    this.modalShow = this.modalShow.bind(this);
    this.clearAction = this.clearAction.bind(this);
    this.importAction = this.importAction.bind(this);
    this.saveFormData = this.saveFormData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ carouselItems: nextProps.items });
  }

  dataChange(e, index) {
    const { carouselItems } = this.state;

    if (!carouselItems[index]) {
      carouselItems[index] = { image: '', productId: '' };
    }
    carouselItems[index][e.target.name] = e.target.value;
    this.setState({ carouselItems });
  }

  modalShow() {
    const { modalFlag } = this.state;
    if (modalFlag) this.setState({ modalFlag: false });
    else this.setState({ modalFlag: true });
  }

  clearAction(i) {
    const { carouselItems } = this.state;
    if (carouselItems[i]) {
      carouselItems[i].image = '';
      carouselItems[i].productId = '';
      this.setState({ carouselItems });
    }
  }

  saveFormData() {
    let { carouselItems } = this.state;
    const errorFlag = carouselItems.find((item, index) => {
      if (item.productId && !item.image) {
        alert(`Please add the ${index + 1}th Carousel Image`);
      }
      return true;
    });

    if (errorFlag) return;
    carouselItems = carouselItems.filter(item => item.image !== '');

    const data = {};
    data.carousel = carouselItems;
    FirestoreServices.saveAdminData('logo', data).then((res) => {
      if (res) {
        this.props.onUpdate();
        // this.setState({
        //   modalFlag: false,
        // });
      }
    });
  }

  importAction(event, index) {
    // const fileURL = URL.createObjectURL(event.target.files[0])
    console.log(event, index);
  }

  render() {
    const emptyData = [1, 2, 3, 4, 5];
    const data = this.state.carouselItems;
    return (
      <Row>
        <Col className="carousel-edit-modal" xl={5} lg={5} md={5} sm={6}>
          <div className="modal-tool">
            <button onClick={this.modalShow}>
              {this.state.modalFlag ? 'Close' : 'Edit'}
            </button>
            {this.state.modalFlag ?
              <button className="close-link" onClick={this.saveFormData}>
                Save
              </button>
              :
              ''
            }
          </div>

          {this.state.modalFlag ?
            <div className="carousel-modal-content" ref={(el) => { this.curouselForm = el; }} key={1}>
              {
                emptyData.map((item, index) => (
                  <Row key={index}>
                    <Col className="line-number" md={1}>{index + 1}</Col>
                    <Col className="imageInfo" md={4}><input type="text" placeholder="Add photo" name="image" value={data[index] ? data[index].image : ''} onChange={e => this.dataChange(e, index)} /></Col>
                    <Col className="productId" md={3}><input type="text" placeholder="Enter product id" name="productId" value={data[index] ? data[index].productId : ''} onChange={e => this.dataChange(e, index)} /></Col>
                    {/* <Col md={2}><button onClick={this.getValue} onClick={(e) => this.importAction(index)}>Import</button></Col> */}
                    <Col md={2} onClick={e => this.importAction(e, index)} >
                      <input type="text" name={index} id="file" className="inputfile" onChange={this.importAction} />
                      <label htmlFor="file">
                        Import
                      </label>
                    </Col>
                    <Col md={2}><button onClick={e => this.clearAction(index)}>Clear</button></Col>
                  </Row>
                ))
              }
            </div>
            :
            ''
          }
        </Col >
      </Row>
    );
  }
}

export default CarouselEditModal;
