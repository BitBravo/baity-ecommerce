import React, { Component } from "react";
import { Link } from "react-router-dom";
import { base, db } from "config/base";
import FirebaseServices from 'services/FirebaseServices'
import FirestoreServices from 'services/FirestoreServices'
import {
  Image,
  Alert,
  Col,
  Button,
  Modal,
  Row,
  Grid,
  Carousel,
  Glyphicon
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loading from 'commons/Loading';
import styled from 'styled-components'
import Product from 'assets/img/Selected-product.png';
import Cart from 'assets/img/AddingtoCart.png';


const IconImg = styled.img`
width:20px;
 height:20px;`

const LikeDiv = styled.span`
position: absolute;
top:10%;
left: 60px;
font-size:40px;
border-radius: 50%;
    height: 50px;
    width: 50px;
    color: #2d2d2d;
    border: none;
    background-color: hsla(0,0%,100%,.8);
    padding: 6px 6.5px ;
    cursor: default;
    outline: none;
@media only screen and (max-width: 767px) {
  height: 40px;
  width: 40px;
  font-size:30px;
  left: 30px;
}
`;
const LikeIcon = styled(Glyphicon)`
cursor:pointer;
color:rgb(26,156,142);
`;

const UnLikeIcon = styled(Glyphicon)`
cursor:pointer;
color: transparent;
-webkit-text-stroke-width: 2px;
-webkit-text-stroke-color: rgb(75, 75, 75);
`;

const TagDiv = styled.span`
position: absolute;
bottom:0;
right: 0;
font-size:20px;
background-color:rgb(26,156,142);
color: white;
width: 150px;
height: 30px;
text-align:center;
@media only screen and (max-width: 767px) {
  font-size:10px;
  width: 80px;
  height: 20px;}
`;

const ImgGallaryThumb = styled.div`
`;
const PrevImgGallaryThumb = styled.div`
`;

const PreviewImg = styled.img`
  width: auto;
  max-width:100%;
   height: 100%;
   object-fit: contain;
  position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
height:70vh;
`;

const PaddingDiv = styled.div`
  font-size:15px;
  padding-right: 10px;
  padding-top: 5px;
  padding-left: 0;
  @media only screen and (max-width: 991px) {
    font-size:13px;}
`;

const ImageCol = styled(Col)`
border-left: 1.5px solid rgb(218, 218, 217);
@media only screen and (max-width: 991px) {
  border:none;
`;

const DetailsCol = styled(Col)`
padding :0 5px 0 0;
margin :15px 0 0 0;
position:relative;
@media only screen and (max-width: 991px) {
  margin:0;
}
`;

const ProductName = styled.div`
font-size:16px;
color:black;
margin-bottom:20px;
@media only screen and (min-width: 992px) {
border-bottom:dotted 1px lightgray ;
height:55px;
}
@media only screen and (max-width: 991px) {
  margin-top:0;
  margin-bottom:50px;
  font-size: 14px;
}
`;

const Cartbutton = styled.button`
height:30px;
width:100%;
background-color:white;
color:rgb(95,96,93);
border:solid 0.5px #cccccc;
`;

const CloseButton = styled.button`
position:absolute;
top:0px;
left:5px;
width:30px;
height:30px;
background-color:white;
color:black;`;

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
        liked: false,
        show: false,
        show1: false,
        deletionStatus: {
          showDeleteModal: false,
          deletionSuccessful: false,
          errorMsg: ''
        }
      };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleShow1 = this.handleShow1.bind(this);
    this.handleHide1 = this.handleHide1.bind(this);
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleShow1() {
    this.setState({ show1: true });
  }

  handleHide() {
    this.setState({ show: false });
  }

  handleHide1() {
    this.setState({ show1: false });
  }

  componentWillMount() {
    this.thumbImage.bind(this);
    this.addToCart = this.addToCart.bind(this)
    const authenticated = this.props.authenticated
    this.archiveProduct = this.archiveProduct.bind(this)
    this.productsRef = base.bindDoc(`${FirestoreServices.PRODUCTS_PATH}/${this.productId}`, {
      context: this,
      state: 'product',
      then(data) {
        //getting the business name
        // FirebaseServices.readDBRecord('profUser', this.owner)
        //   .then(val => this.setState({ businessName: val.name }))
        //if user authenticated, get her likes to update the heart
        if (authenticated) {
          this.userLikesRef = FirebaseServices.readDBRecord('likes', `${this.props.state.currentUser.uid}/products/${this.productId}`)
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
      var like = false;
      const productRef = FirestoreServices.products.doc(this.productId)
      const userLikes = FirebaseServices.likes
      const currentUserRef = userLikes.child(this.props.state.currentUser.uid).child("products")
      currentUserRef.child(this.productId).once('value', (snap) => {
        if (snap.val()) {
          console.log("unlike");
          currentUserRef.child(this.productId).set(null);
          like = false
        } else {
          console.log("like");
          currentUserRef.child(this.productId).set("product");
          like = true;
        }

        return db.runTransaction((transaction) => {
          return transaction.get(productRef).then((doc) => {
            console.log("Product detailes - transaction()")
            if (doc.exists) {
              var post = doc.data()
              if (!like) {
                var newLikes = post.likes - 1;
                transaction.update(productRef, { likes: newLikes });
                this.setState({ liked: false })
              } else {
                var newLikes = post.likes + 1;
                transaction.update(productRef, { likes: newLikes });
                this.setState({ liked: true })
              }
            }
          })
        });
      })
    }
  }

  addToCart() {
    const { currentUser } = this.props.state;
    if (currentUser) {
      FirebaseServices.insertItem(this.state.product, currentUser.uid)
        .then(quantity => {
          console.log("quantity " + quantity);

          // update the cart in the header by calling the updateCart method passed from app
          (quantity === 1 ? this.props.updateCart(true, false) : null);
          console.log("Item added");
        })
        .catch(error =>
          console.log("not able to add item - " + error));
    } else {
      console.log("not Register")
    }
  }

  archiveProduct() {
    this.setState({ loading: true })
    FirestoreServices.deleteProduct(this.state.product.id)
      .then(() => {
        //show success popup
        let deletionStatus = {
          showDeleteModal: true,
          deletionSuccessful: true,
          errorMsg: ''
        }
        let newState = { ...this.state, loading: false, deletionStatus: deletionStatus }
        this.setState(newState, () => { console.log('after successful product deletion state is:'); console.log(this.state); })
      })
      .catch(error => {
        //show failure popup
        let deletionStatus = {
          showDeleteModal: true,
          deletionSuccessful: false,
          errorMsg: `حدث خطأ غير معروف. نرجو ابلاغ الصيانة بالخطأ التالي:
          ERROR: could not delete product. error code: ${error.code}, error message:${error.message}`
        }
        let newState = { ...this.state, loading: false, deletionStatus: deletionStatus }
        this.setState(newState)
      })
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
    if (this.state.deletionStatus.showDeleteModal)
      return (
        <div>
          {this.state.deletionStatus.deletionSuccessful
            ? <Modal show={true} style={{ top: 100 }}>
              <Modal.Header>تم حذف المنتج بنجاح</Modal.Header>
              <Modal.Body>
                <Link to="/">
                  <Button>العودة للصفحة الرئيسية</Button>
                </Link>
              </Modal.Body>
            </Modal>
            :
            <Modal show={true} style={{ top: 100 }} onHide={this.handleHide} style={{ top: 250 }}>
              <Modal.Header>
                <CloseButton onClick={this.handleHide}>X</CloseButton>
                حدث خطأ غير معروف
              </Modal.Header>
              <Modal.Body>

                <Alert bsStyle="danger">
                  {this.state.deletionStatus.errorMsg}
                </Alert>
              </Modal.Body>
            </Modal>
          }
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
                  {product.price === 0
                    ? <TagDiv>هذا المنتج للعرض</TagDiv>
                    : null
                  }
                </Carousel.Item>
              </Carousel >

              <div className="product-slider" style={{ borderBottom: 'dotted 1px lightgray ' }}>
                <div id="thumbcarousel1" className="carousel1 slide" >
                  <ImgGallaryThumb className="item">
                    {product.images.map((obj, index) => {
                      return <PrevImgGallaryThumb className="thumb" key={index} >
                        <Image src={obj.large} onClick={() => { return this.setState({ index: index }) }} />
                      </PrevImgGallaryThumb>
                    })}
                  </ImgGallaryThumb>
                </div>
              </div >
            </ImageCol>

            <DetailsCol xs={12} sm={12} md={4} lg={3}  >
              <ProductName >
                <Col xs={5} sm={5} md={5} lg={4} style={{ padding: '0 0 0 10px' }}>
                  <h4 style={{ color: 'rgb(26,156,142)', float: 'left' }}>{product.price} ر.س </h4>
                </Col>
                <Col xs={6} sm={6} md={6} lg={7} style={{ padding: '0 0 0 10px' }}>
                  <h4>{product.name}</h4>
                </Col>
                <Col xs={1} style={{ padding: '7px 0 0 0' }}>
                  <IconImg src={Product} className="icons" /> </Col>
              </ProductName>
              {this.props.state.currentUser
                ? <button type="submit" onClick={() => { this.addToCart(); this.handleShow() }}>
                  اضافة للسلة
               <IconImg src={Cart} style={{ marginRight: '25px' }} />
                </button>
                : <LinkContainer to="/login">
                  <button type="submit" onClick={() => { this.addToCart(); this.handleShow() }}>
                    اضافة للسلة
               <IconImg src={Cart} style={{ marginRight: '25px' }} />
                  </button>
                </LinkContainer>
              }
              <PaddingDiv>
                <h4 style={{ display: 'inline' }}>وصف المنتج</h4>
                <h6 style={{ color: 'rgb(26,156,142)', float: 'left', display: 'inline', padding: '0 0 0 20px' }}>
                  الاعجاب &nbsp;{product.likes > 0 ? product.likes : 0}
                </h6>
                <p style={{ marginTop: '10px' }}> {product.desc}</p>
              </PaddingDiv>
              <PaddingDiv style={{ marginBottom: '90px' }}>
                <h4 style={{ marginBottom: '10px' }}>المواصفات</h4>
                <p >الصنف : {product.category}</p>
                <p >القسم : {product.department}</p>
                <p >الطول : {product.length} سم</p>
                <p >العرض : {product.width} سم</p>
                <p >الارتفاع : {product.height} سم</p>
                <p >المصنع : {product.factory}</p>
                <p >المدينة : {product.city}</p>
              </PaddingDiv>

              <div >
                {/* only product owner can update a product */}
                {this.props.authenticated
                  ? this.props.state.currentUser.uid === this.state.product.owner
                    ? <div>
                      <button style={{ width: '45%', position: 'absolute', bottom: '0', right: '5px' }}
                        type="submit" onClick={() => { this.handleShow1(); }}>
                        حذف المنتج </button>
                      <Link to={`/products/${product.id}/updateProduct`}>
                        <button style={{ width: '45%', position: 'absolute', bottom: '0', left: '5px' }} >
                          تحديث بيانات المنتج
                           </button>
                      </Link>
                    </div>
                    :
                    <div style={{ position: 'absolute', bottom: '0', right: '5px' }}>
                      <h4 >من :&nbsp;
                        <Link to={`/businessprofile/${product.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                          {product.businessName}

                        </Link>
                      </h4>
                    </div>
                  :
                  <div style={{ position: 'absolute', bottom: '0', right: '5px' }}>
                    <h4 >من :&nbsp;
                      <Link to={`/businessprofile/${product.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                        {product.businessName}

                      </Link>
                    </h4>
                  </div>
                }
              </div>

              <div>
                <Modal
                  show={this.state.show}
                  onHide={this.handleHide} style={{ top: 250 }}>
                  <Modal.Header>
                    <CloseButton onClick={this.handleHide}>X</CloseButton>
                    تمت اضافة المنتج الى سلتك
                  </Modal.Header>
                  <Modal.Body style={{ display: 'inline-block' }}>
                    <div style={{ display: 'inline-block' }}>
                      <Link to="/mycart">
                        <button style={{ height: '30px' }} >عرض سلة التسوق</button>
                      </Link>
                    </div>
                    <div style={{ display: 'inline-block', marginRight: '20px' }}>
                      <Cartbutton onClick={this.handleHide}>اكمال التسوق</Cartbutton>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
              <div>
                <Modal
                  show={this.state.show1}
                  onHide={this.handleHide1} style={{ top: 250 }}>
                  <Modal.Header>
                    <CloseButton onClick={this.handleHide1}>X</CloseButton>
                    هل تريد فعلا حذف المنتج؟
                   </Modal.Header>
                  <Modal.Body style={{ display: 'inline-block' }}>
                    <div style={{ display: 'inline-block' }}>
                      <button style={{ height: '30px', width: '50px' }} type="submit" onClick={() => { this.archiveProduct(); }} >
                        نعم</button>
                    </div>
                    <div style={{ display: 'inline-block', marginRight: '20px', width: '50px' }}>
                      <Cartbutton onClick={this.handleHide1}>لا </Cartbutton>
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
