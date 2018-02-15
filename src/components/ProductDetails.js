import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import FirebaesServices from './FirebaseServices'
import { Image, Alert, Col, Thumbnail, Button, Modal,Row, Grid ,Carousel,Glyphicon} from "react-bootstrap";
import Loading from './Loading';
import Equalizer from "react-equalizer";
import styled from 'styled-components'
import {MdAddShoppingCart,MdEventSeat} from 'react-icons/lib/md';


const ImgGallaryThumb = styled.div`
  }
`;
const PrevImgGallaryThumb = styled.div`
  }
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;

  }
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
height: 100%;

`;

const PaddingDiv = styled.div`
  padding-right: 10px;
  padding-top: 5px;
  padding-left: 0;
  padding-bottom: 5px;
`;
const ImageCol=styled(Col)`
border-left: 1.5px solid rgb(218, 218, 217);
@media only screen and (max-width: 991px) {
  border:none;
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
  
      index: 0,
      nextIcon: <span onClick={this.nextImage.bind(this)} className="glyphicon glyphicon-chevron-right"></span>,
      prevIcon: <span onClick={this.prevImage.bind(this)} className="glyphicon glyphicon-chevron-left"></span>,
    
    };
  }

  componentWillMount() {
    this.thumbImage.bind(this);
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
  thumbImage(thumbIndex){
    this.setState({index: thumbIndex});
  }

  render() {

    const product = this.state.product;
    const {nextIcon,prevIcon}=this.state;

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
       
        <Grid >
          <Row style={{display: 'flex', flexWrap: 'wrap'}} className="productdetails">
             <ImageCol  xs={12} sm={12} md={8} lg={9}  style={{padding:'0'}}>
      
            <Carousel   indicators={false} wrap={false}>
             <Carousel.Item> 
               <ImageContainer>   
            <ImageDiv > 
            <PreviewImg src={product.images[this.state.index].large}/> 
            </ImageDiv>            
            </ImageContainer>
            <Glyphicon  className ="leftglyphicon" onClick={this.nextImage.bind(this)} glyph="chevron-left"/>
             <Glyphicon className="rightglyphicon" onClick={this.prevImage.bind(this)} glyph="chevron-right"/>
              </Carousel.Item>
              
            </Carousel >
            <div className="product-slider">
              <div id="thumbcarousel1" className="carousel1 slide" >
                <ImgGallaryThumb className="item">
                  {product.images.map((obj, index) => {
                    return <PrevImgGallaryThumb className="thumb " >
                             <Image src={obj.large} onClick={() => { return this.setState({index: index})}}/>
                          </PrevImgGallaryThumb>   
                         })}  
                </ImgGallaryThumb> 
              </div>
           </div>
            </ImageCol> 
            <Col  xs={12} sm={12} md={4} lg={3}  style={{padding :'0 5px 0 0'}}>
            
            <Col xs={5} sm={5} md={5} lg={5} style={{padding :'0'}}>
              <h4 style={{color:'rgb(26,156,142)'}}>{product.price} ر.س </h4>
              </Col>
            <Col  xs={7} sm={7} md={7} lg={7} style={{padding :'0'}}>
            <h4><MdEventSeat className="icons" style={{color:'rgb(26,156,142)'}}/>{product.name}</h4>
            </Col>
            <hr/>
             
              <button type="submit">
               اضافة للسلة
               <MdAddShoppingCart className="icons" style={{marginRight:'20px'}}/></button>
            <PaddingDiv>
            <h4>وصف المنتج</h4>
              <p > {product.desc}</p>
              </PaddingDiv>
              <PaddingDiv>
            <h4>المواصفات</h4>
              <p >الصنف : {product.category}</p>
              <p >القسم : {product.department}</p>
              <p >الطول : {product.length} سم</p>
              <p >العرض : {product.width} سم</p>
              <p >الارتفاع : {product.height} سم</p>
              <p >المصنع : {product.factory}</p>
              </PaddingDiv>

              <PaddingDiv>
            <p>
              {/* only product owner can update a product */}
              {
                this.props.authenticated
                ? this.props.currentUser.uid === this.state.product.owner
               ?<Link to={`/products/${product.id}/updateProduct`}>
                <button style={{display:"block", margin:"auto"}}>
                  تحديث بيانات المنتج
                </button>
              </Link>
              : null

            : null
          }
            </p>
            </PaddingDiv>
            </Col>
            </Row>
            </Grid> 
    );
  }
}

export default ProductDetails;
