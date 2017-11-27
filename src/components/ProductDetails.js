import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import FirebaesServices from './FirebaseServices'
import { Image, Alert, Col, Thumbnail, Button, Modal,Row, Grid } from "react-bootstrap";
import Loading from './Loading';
import Equalizer from "react-equalizer";


class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.productId = this.props.match.params.id;

    this.state = {
      product: {},
      loading: true,
      errorHandling: {
        showError: false, errorMsg: 'error'
      }
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
    base.removeBinding(this.productsRef);
  }

  render() {
 
    const product = this.state.product;

    if (this.state.loading && !this.state.errorHandling.showError)
    return <Loading />;
  if (this.state.errorHandling.showError)
    return (
      <div>
        <Modal show={true} style={{ top: 300 }}>
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
        
      
        
         <Grid className="productdetails">
          <Row >
           <Col  xs={12} sm={12} md={8} lg={8} className="pdimagebackground">
           <div>
            <img src={product.imgUrl} />
            </div>
            </Col>
            <Col  xs={12} sm={12} md={4} lg={4} >
            <div className="padding">
              <h3 >{product.name}</h3>
              <p >{product.desc}</p>
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
            </Row>
        </Grid>
        
       
   
      
    );
  }
}

export default ProductDetails;
