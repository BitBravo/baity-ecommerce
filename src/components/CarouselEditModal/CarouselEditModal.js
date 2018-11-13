import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import FirestoreServices from 'services/FirestoreServices'

import './styles.css'


export class CarouselEditModal extends Component {
  constructor() {
    super();
    this.state = {
      carouselItems: []
    };
  }

  componentWillMount() {
    FirestoreServices.getDataQuery('carousel-banner')
      .then(items => {
        this.setState({ carouselItems: items })
      });
  }

  getValue = (e) => {
    console.log(this.curouselForm.attributes)
  }

  render() {
    const emptyData = [1, 2, 3, 4, 5];
    const data = this.props.items;
    console.log(this.props)
    return (
      <Row>
        <Col className="carousel-edit-modal" xl={5} lg={5} md={5} sm={6}>
          <div className="modal-tool">
            <button>
              Edit
            </button>
            <button className="close-link">
              Save
          </button>
          </div>
          <div className="carousel-modal-content" ref={el => this.curouselForm = el}>
            {
              emptyData.map((item, index) => (
                <Row key={index}>
                  <Col className="line-number" md={1}>{index}</Col>
                  <Col className="imageInfo" md={4}><input type="text" placeholder='Add photo' value={data[index] ? data[index].image : ''}></input></Col>
                  <Col className="productId" md={3}><input type="text" placeholder='Enter product id' value={data[index] ? data[index].link : ''}></input></Col>
                  <Col md={2}><button onClick={this.getValue}>Change</button></Col>
                  <Col md={2}><button>Clear</button></Col>
                </Row>
              ))
            }
          </div>
        </Col >
      </Row>
    );
  }
}

export default CarouselEditModal;
