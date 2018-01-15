import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import FirebaesServices from './FirebaseServices'
import { Image, Alert, Col, Thumbnail, Button, Modal,Row, Grid } from "react-bootstrap";
import Loading from './Loading';
import Equalizer from "react-equalizer";
import styled from 'styled-components'
import FaArrowCircleRight from 'react-icons/lib/fa/arrow-circle-right'
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left'

const FlexRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
`;
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.productId = this.props.match.params.id;

    this.state = {
      product: {},
      loading: true,
      errorHandling: {
        showError: false, errorMsg: 'error'
      },
      index: 0
    };
  }

  componentWillMount() {
    this.productsRef = base.syncState(`${FirebaesServices.PRODUCTS_PATH}/${this.productId}`, {
      context: this,
      state: 'product',
      then(data) {
      this.setState({loading: false})
      },
      onFailure(error) {
      this.setState({errorHandling: {showError: true, errorMsg: error}});
      }
    });
  }

  componentWillUnmount() {
    this.productsRef && base.removeBinding(this.productsRef);
  }

  nextImage(){
    if (this.state.index < this.state.product.images.length - 1)
      this.setState({index: (this.state.index + 1)});
  }

  prevImage(){
    if (this.state.index > 0)
      this.setState({index: (this.state.index - 1)});
  }

  render() {
 
    const product = this.state.product;

    if (this.state.loading && !this.state.errorHandling.showError)
    return <Loading />;
  if (this.state.errorHandling.showError)
    return (
      <div>
        <Modal show={true} style={{ top:-100 }}>
          <Modal.Header>حدث خطأ غير معروف</Modal.Header>
          <Modal.Body>
            
              <Alert bsStyle="danger">
                {this.state.errorHandling.errorMsg.message}
              </Alert>
              <Link to="/">
              <Button>العودة للصفحة الرئيسية</Button>
              </Link>
          </Modal.Body>
        </Modal>
      </div>
    );
  if (!this.state.loading && !this.state.showError)
      return(
        
      
        
         
          <Row className="productdetails">
        
            <Col  xl={12} sm={4} md={4} lg={4} >
            <div className="padding">
              <h3>{product.factory}</h3>
              </div>
            <hr/>
            <div className="padding">
              <h4 >{product.name}</h4>
              <p >{product.desc}</p>
              <h3 >{product.price} ريال سعودي</h3>
              </div>
              <hr/>
              <div>
            <p>
              {/* only product owner can update a product */}
              {this.props.currentUser.uid === this.state.product.owner
              ?<Link to={`/products/${product.id}/updateProduct`}>
                <button >
                  تحديث بيانات المنتج
                </button>
              </Link>
              : null
              }
            </p>
            </div>
            </Col>
            
            <Col xl={1} sm ={1} md={1} lg={1} style={{backgroundColor: '#f4f4f4'}}>
              <span style={{display: 'inline-block', height: '100%', verticalAlign: 'middle'}}/>
              <FaArrowCircleRight size={50} onClick={this.nextImage.bind(this)}/>
          </Col>
           <Col  xl={10} sm={6} md={6} lg={6} className="productdetailsimgbckgrnd">
            <img src={product.images[this.state.index].large} />
            </Col>
            <Col xl={1} sm ={1} md={1} lg={1} style={{backgroundColor: '#f4f4f4', verticalAlign: 'middle'}}>
            <span style={{display: 'inline-block', height: '100%', verticalAlign: 'middle'}}/>
            <FaArrowCircleLeft size={50} onClick={this.prevImage.bind(this)}/>
          </Col>

            </Row>
      
        
       
   
      
    );
  }
}

export default ProductDetails;
