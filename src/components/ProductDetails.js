import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import {
  Image,
  Alert,
  Col,
  Thumbnail,
  Button,
  Modal,
  Row,
  Grid,
  Carousel,
  Glyphicon
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loading from './Loading';
import Equalizer from "react-equalizer";
import styled from 'styled-components'
import { MdAddShoppingCart, MdEventSeat } from 'react-icons/lib/md';
import FullHeart from '../assets/img/fullHeart.png';
import EmptyHeart from '../assets/img/emptyHeart.png';
import Product from '../assets/img/Selected-product.png';
import Cart from '../assets/img/AddingtoCart.png';


const IconImg = styled.img`
width:25px;
 height:20px;`

const LikeDiv = styled.div`
position: absolute;
top:10%;
left: 60px;
font-size:40px;
@media only screen and (max-width: 767px) {
  font-size:30px;
  left: 30px;
}
`
const LikeIcon = styled(Glyphicon) `
cursor:pointer;
color:rgb(26,156,142);

`;
const UnLikeIcon = styled(Glyphicon) `
cursor:pointer;
color: transparent;
-webkit-text-stroke-width: 2px;
-webkit-text-stroke-color: rgb(75, 75, 75);
`;
const ImgGallaryThumb = styled.div`

`;
const PrevImgGallaryThumb = styled.div`

`;

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
height: 100%;

`;

const PaddingDiv = styled.div`
  padding-right: 10px;
  padding-top: 5px;
  padding-left: 0;
  @media only screen and (max-width: 991px) {
    margin-bottom:50px;}
`;
const ImageCol = styled(Col) `
border-left: 1.5px solid rgb(218, 218, 217);
@media only screen and (max-width: 991px) {
  border:none;
`;
const DetailsCol = styled(Col) `
padding :0 5px 0 0;
margin :15px 0 0 0;
position:relative;
@media only screen and (max-width: 991px) {
  margin:0;
}
`;
const Cartbutton = styled.button`
height:30px;
width:100%;
background-color:white;
color:rgb(95,96,93);
border:solid 0.5px #cccccc;

`
const CloseButton=styled.button`
position:absolute;
top:0px;
left:5px;
width:30px;
height:30px;
background-color:white;
color:black;`

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.productId = this.props.match.params.id;
    this.owner = this.props.match.params.owner,
      this.state = {
        product: {},
        businessName: "",
        loading: true,
        errorHandling: {
          showError: false, errorMsg: 'error'
        },
        index: 0,
        nextIcon: <span onClick={this.nextImage.bind(this)} className="glyphicon glyphicon-chevron-right"></span>,
        prevIcon: <span onClick={this.prevImage.bind(this)} className="glyphicon glyphicon-chevron-left"></span>,
        liked: false,
        show: false
      };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }


  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
  }


  componentWillMount() {
    this.thumbImage.bind(this);
    this.addToCart = this.addToCart.bind(this)
    const authenticated = this.props.authenticated


    this.productsRef = base.syncState(`${FirebaseServices.PRODUCTS_PATH}/${this.productId}`, {
      context: this,
      state: 'product',
      then(data) {
        //getting the business name
        // FirebaseServices.readDBRecord('profUser', this.owner)
        //   .then(val => this.setState({ businessName: val.name }))
        //if user authenticated, get her likes to update the heart
        if (authenticated) {
          this.userLikesRef = FirebaseServices.readDBRecord('likes', `${this.props.currentUser.uid}/products/${this.productId}`)
            .then(val => {
              if (val) {
                this.setState({ liked: true, loading: false })
              } else {
                this.setState({ liked: false, loading: false })
              }
            })
        } else {
          this.setState({ loading: false })
        }
      },
      onFailure(error) {
        this.setState({ errorHandling: { showError: true, errorMsg: error } });
      }
    });
  }

  componentWillUnmount() {
    this.productsRef && base.removeBinding(this.productsRef);
    this.userLikesRef && base.removeBinding(this.userLikesRef);
  }

  nextImage() {
    if (this.state.index < this.state.product.images.length - 1)
      this.setState({ index: (this.state.index + 1) });
  }

  prevImage() {
    if (this.state.index > 0)
      this.setState({ index: (this.state.index - 1) });
  }
  thumbImage(thumbIndex) {
    this.setState({ index: thumbIndex });
  }

  like() {
    if (this.props.authenticated) {
      const userLikes = FirebaseServices.likes
      const currentUserRef = userLikes.child(this.props.currentUser.uid).child("products")
      const productRef = FirebaseServices.products.child(this.productId)

      return productRef.transaction((post) => {
        console.log("Prudoct detailes - transaction()")
        console.log(post)
        if (post) {
          currentUserRef.child(post.id).once('value', (snap) => {
            if (snap.val()) {
              console.log(currentUserRef.child(post.id));

              console.log("unlike");
              post.likes--;
              currentUserRef.child(post.id).set(null);
              this.setState({ liked: false })
            } else {
              console.log("like");
              console.log(currentUserRef.child(post.id));
              post.likes++;
              //console.log(userLikes.child(currentUserId).child(post.id));
              currentUserRef.child(post.id).set(post.postType);
              this.setState({ liked: true })
            }
          })
        }
        return post;
      });
    }
  }

  addToCart() {
    if (this.props.currentUser) {
      FirebaseServices.insertItem(this.state.product, this.props.currentUser.uid)
      .then(() => {
        // update the cart in the header by calling the updateCart method passed from app
        this.props.updateCart()
        console.log("Item added")})
      .catch(error =>
        console.log("not able to add item"))
    }else {
      console.log("not Register")
    }
  }

  render() {

    const product = this.state.product;
    const { nextIcon, prevIcon } = this.state;
    if (this.state.loading && !this.state.errorHandling.showError)
      return <Loading />;
    if (this.state.errorHandling.showError)
      return (
        <div>
          <Modal show={true} style={{ top: 100 }}>
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
      return (

        <Grid >
          <Row style={{ display: 'flex', flexWrap: 'wrap' }} className="productdetails">
            <ImageCol xs={12} sm={12} md={8} lg={9} style={{ padding: '0' }}>

              <Carousel indicators={false} wrap={false}>
                <Carousel.Item>
                  <ImageContainer>
                    <ImageDiv >
                      <PreviewImg src={product.images[this.state.index].large} />
                    </ImageDiv>
                  </ImageContainer>
                  <Glyphicon className="leftglyphicon " onClick={this.nextImage.bind(this)} glyph="chevron-left" />
                  <Glyphicon className="rightglyphicon " onClick={this.prevImage.bind(this)} glyph="chevron-right" />
                  <LikeDiv>
                    {this.state.liked
                      ? <LikeIcon glyph="heart" onClick={this.like.bind(this)} />
                      : <UnLikeIcon glyph="heart" onClick={this.like.bind(this)} />
                    }
                  </LikeDiv>
                </Carousel.Item>

              </Carousel >


              <div className="product-slider">
                <div id="thumbcarousel1" className="carousel1 slide" >
                  <ImgGallaryThumb className="item">
                    {product.images.map((obj, index) => {
                      return <PrevImgGallaryThumb className="thumb " >
                        <Image src={obj.large} onClick={() => { return this.setState({ index: index }) }} />
                      </PrevImgGallaryThumb>
                    })}
                  </ImgGallaryThumb>
                </div>
              </div>
              <hr className='hidden-md hidden-lg' />
            </ImageCol>

            <DetailsCol xs={12} sm={12} md={4} lg={3}  >

              <Col xs={5} sm={5} md={5} lg={5} style={{ padding: '0 0 0 10px' }}>
                <h4 style={{ color: 'rgb(26,156,142)', float: 'left' }}>{product.price} ر.س </h4>
              </Col>
              <Col xs={7} sm={7} md={7} lg={7} style={{ padding: '0' }}>
                <h4><IconImg src={Product} className="icons" />{product.name}</h4>
              </Col>
              <hr className='hidden-xs visible-md visible-lg' />
              {this.props.currentUser
                ? <button type="submit" onClick={ () => {this.addToCart();this.handleShow()}}>
                  اضافة للسلة
               <IconImg src={Cart} style={{ marginRight: '30px' }} />
                </button>
                : <LinkContainer to="/login">
                  <button type="submit">
                    اضافة للسلة
               <IconImg src={Cart} style={{ marginRight: '30px' }} />
                  </button>
                </LinkContainer>
              }
              <PaddingDiv>
                <h4 style={{ display: 'inline' }}>وصف المنتج</h4>
                <h6 style={{ color: 'rgb(26,156,142)', float: 'left', display: 'inline', padding: '0 0 0 20px' }}>الاعجاب </h6>
                <p > {product.desc}</p>
              </PaddingDiv>
              <PaddingDiv >
                <h4>المواصفات</h4>
                <p >الصنف : {product.category}</p>
                <p >القسم : {product.department}</p>
                <p >الطول : {product.length} سم</p>
                <p >العرض : {product.width} سم</p>
                <p >الارتفاع : {product.height} سم</p>
                <p >المصنع : {product.factory}</p>
                <p >المدينة : {product.city}</p>
              </PaddingDiv>

              <div style={{ display: 'inline-block', position: 'absolute', bottom: '0' }}>
                <h4 > من:
                  <Link to={`/businessprofile/${product.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                    {product.businessName}
                  </Link>
                </h4>
              </div>
              <div style={{ display: 'inline-block', position: 'absolute', bottom: '0', left: '10px' }}>

                {/* only product owner can update a product */}
                {this.props.authenticated
                  ? this.props.currentUser.uid === this.state.product.owner
                    ? <Link to={`/products/${product.id}/updateProduct`}>
                      <button style={{ width: '100%' }} >
                        تحديث بيانات المنتج
                </button>
                    </Link>
                    : null

                  : null
                }
              </div>

              <div>
                <Modal  {...this.props}
                  show={this.state.show}
                  onHide={this.handleHide} style={{ top: 300 }}>
                 <Modal.Header>
                  <CloseButton onClick={this.handleHide}>X</CloseButton>
                    تمت اضافة المنتج الى سلتك
                  </Modal.Header>
                  <Modal.Body style={{display:'inline-block'}}>
                  <div style={{display:'inline-block'}}>
                    <Link to="/mycart">
                      <button style={{height:'30px'}} >عرض سلة التسوق</button>
                    </Link>
                    </div>
                    <div style={{display:'inline-block',marginRight: '20px'}}>
                      <Cartbutton onClick={this.handleHide}>اكمال التسوق</Cartbutton>
                      </div>
                  </Modal.Body>
                </Modal>
              </div>

            </DetailsCol>
          </Row>
        </Grid>
      );
  }
}

export default ProductDetails;
