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

const MyThumbnailDiv = styled.div`
  position: relative;
  background-color: #fff;
  transform: scale(1, 1);
  transition: transform 1s ease;
  margin-bottom: 50px;
  &:hover{
    box-shadow:0px 0px 10px #6A6A6A;
    border:1px solid #6A6A6A;
    transition:all 0.5s ease-in-out;
    transform: scale(1.05, 1.05);

  }
`

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageDiv = styled.div`
  position:  absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
`;
const FlexRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
`;
const PaddingDiv = styled.div`
  padding-right: 20px;
  padding-top: 0;
  padding-left: 0;
  padding-bottom: 30px;
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
        
      
        
         
          <Row style={{display: 'flex', flexWrap: 'wrap'}} className="productdetails">
        
            <Col  xs={12} sm={4} md={4} lg={3} >
            <PaddingDiv>
            <Col xs={5} sm={5} md={5} lg={5} >
              <h4 style={{color:'rgb(26,156,142)'}}>{product.price} ر.س</h4>
              </Col>
            <Col  xs={7} sm={7} md={7} lg={7} >
            <h4 >{product.name}</h4>
            </Col>
            <hr/>
              </PaddingDiv>
              <button style={{display:"block", margin:"auto"}}>
                اضافة للسلة
                </button>
            <PaddingDiv>
            <h4>وصف المنتج</h4>
              <p > {product.desc}</p>
              </PaddingDiv>
              <PaddingDiv>
            <h4>المواصفات</h4>
              <p >الصنف: {product.category}</p>
              <p >القسم: {product.department}</p>
              <p >الطول: {product.length} سم</p>
              <p >العرض: {product.width} سم</p>
              <p >الارتفاع: {product.height} سم</p>
              <p >المصنع: {product.factory}</p>
              </PaddingDiv>
              <PaddingDiv>
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
            </PaddingDiv>
            </Col>
            
            <Col xs={1} sm ={1} md={1} lg={1} style={{backgroundColor: '#f4f4f4'}}>
              <div style={{marginTop: '30%'}}>
              <FaArrowCircleRight size={40}   onClick={this.nextImage.bind(this)}/>
              </div>
          </Col>
           <Col  xs={10} sm={6} md={6} lg={7} >
            <img src={product.images[this.state.index].large} />
            </Col>
            <Col xs={1} sm ={1} md={1} lg={1} style={{backgroundColor: '#f4f4f4'}}>
            <div style={{marginTop: '30%'}}>
            <FaArrowCircleLeft size={40}  onClick={this.prevImage.bind(this)}/>
            </div>
          </Col>
          {/* <Col lg={8} style={{display:"block", margin:"auto"}}>
          <div>
             <h2 style={{color:'rgb(26,156,142)'}}> أصناف ذات صلة</h2>
             
              <Col xs={12} md={4} sm={6} >
        <MyThumbnailDiv>
          <ImageContainer>
            <ImageDiv>
            <Link to={`/products/${product.id}`}>
              <PreviewImg
                src={
                  product.images
                    ? product.images[0].large
                    : "http://via.placeholder.com/243x243"}/>
            </Link>
            </ImageDiv>
          </ImageContainer>

          <PaddingDiv>
           
          <Col xs ={5} md={5}>
              <h5>{product.price} ر.س</h5>
             </Col>
            <Link to={`/products/${product.id}`}>
             <Col xs ={7} md={7}>
              <h5> {product.name} </h5>
             </Col>
            </Link>
            <hr/>
            <p className="flex-text text-muted">{product.desc}</p>
            
          </PaddingDiv>
        </MyThumbnailDiv>
      </Col>
      </div> </Col>  */}
            </Row>
     
    );
  }
}

export default ProductDetails;
