import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import FirestoreServices from 'services/FirestoreServices'
import { FaFileImageO, FaRecycle } from 'react-icons/lib/fa';

import './styles.css'


export class CarouselEditModal extends Component {
  constructor() {
    super();
    this.state = {
      carouselItems: [],
      modalFlag: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.items);
    this.setState({ carouselItems: nextProps.items })
  }

  dataChange = (e, index) => {
    let { carouselItems } = this.state;

    if (!carouselItems[index]) {
      carouselItems[index] = { image: '', productId: '' };
    }
    carouselItems[index][e.target.name] = e.target.value;
    this.setState({ carouselItems });
  }

  modalShow = () => {
    const { modalFlag } = this.state;
    if (modalFlag) this.setState({ modalFlag: false });
    else this.setState({ modalFlag: true });
  }

  clearAction = (i) => {
    console.log(i)
    let { carouselItems } = this.state;
    if (carouselItems[i]) {
      carouselItems[i].image = '';
      carouselItems[i].productId = '';
      this.setState({ carouselItems });
    }
  }

  importAction = (event, index) => {
    // const fileURL = URL.createObjectURL(event.target.files[0])
    console.log(event, index);
  }

  saveFormData = (e) => {
    let { carouselItems } = this.state;
    let errorFlag = carouselItems.find((item, index) => {
      if (item.productId && !item.image) {
        alert(`Please add the ${index + 1}th Carousel Image`);
        return true;
      }
    })

    if (errorFlag) return;
    carouselItems = carouselItems.filter((item) => item.image !== '');

    let data = {};
    data.carousel = carouselItems;
    FirestoreServices.saveAdminData('logo', data).then((res) => {
      if (res) {
        this.props.onUpdate()
        // this.setState({
        //   modalFlag: false,
        // });
      }
    })
  }

  render() {
    const emptyData = [1, 2, 3, 4, 5];
    const data = this.state.carouselItems;
    console.log(data)
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

          <FaRecycle />
          {this.state.modalFlag ?
            <div className="carousel-modal-content" ref={el => this.curouselForm = el} key={1}>
              {
                emptyData.map((item, index) => (
                  <Row key={index}>
                    <Col className="line-number" md={1}>{index + 1}</Col>
                    <Col className="imageInfo" md={4}><input type="text" placeholder='Add photo' name='image' value={data[index] ? data[index].image : ''} onChange={(e) => this.dataChange(e, index)}></input></Col>
                    <Col className="productId" md={3}><input type="text" placeholder='Enter product id' name='productId' value={data[index] ? data[index].productId : ''} onChange={(e) => this.dataChange(e, index)}></input></Col>
                    {/* <Col md={2}><button onClick={this.getValue} onClick={(e) => this.importAction(index)}>Import</button></Col> */}
                    <Col md={2} onClick={(e) => this.importAction(null, index)}>
                      <input type="file" name={index} id="file" className="inputfile" onChange={this.importAction} />
                      <label htmlFor="file">
                        Import
                      </label>
                    </Col>
                    <Col md={2}><button onClick={(e) => this.clearAction(index)}>Clear</button></Col>
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
