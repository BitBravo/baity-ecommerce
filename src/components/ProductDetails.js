import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import { Image, Alert, Col, Thumbnail, Button, Modal } from "react-bootstrap";
import Loading from './Loading'


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
    console.log(`product/${this.productId}`);
    this.productsRef = base.syncState(`product/${this.productId}`, {
      context: this,
      state: 'product',
      then(data) {
      console.log(data)
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
        <Col xs={6} md={4}>
          <Thumbnail src={product.imgUrl} alt="242x200">
            <div >
              <h3 >{product.name}</h3>
            </div>
            <div >
              <p >{product.desc}</p>
            </div>
            <div className="clearfix" />
            <p>
              <Link to={`/products/${product.id}/updateProduct`}>
                <Button bsStyle="primary" block>
                  تحديث بيانات المنتج
                </Button>
              </Link>
            </p>
          </Thumbnail>
        </Col>
      
      
    );
  }
}

export default ProductDetails;
