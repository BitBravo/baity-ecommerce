import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import bedroom from 'assets/img/bedroom.jpg';
import FirestoreServices from 'services/FirestoreServices';
import styled from 'styled-components';
import CarouselEditModal from 'components/CarouselEditModal';
import './styles.css';


const PreviewImg = styled.img`
width: 100%;
height: 100%;
@media only screen and (min-width: 1400px) {
min-height: 700px; 
margin-top:-30px;
margin-bottom: 0 ;}

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
height:365px;
`;
const Button = styled.button`
width:30%;
height:60px;
margin-top:30px;
font-size: 35px;
@media only screen and (max-width: 767px) {
width:45%;
height:40px;
font-size: 25px;
margin-top:20px;
}
`;
export class CarouselBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselItems: [],
    };
  }

  componentWillMount() {
    this.getCarouselData();
  }

  getCarouselData() {
    FirestoreServices.readDBRecord('admin', 'logo').then((items) => {
      items.carousel.map((item, index) => {
        if (item.productId) {
          FirestoreServices.readDBRecord('product', item.productId)
            .then((product) => {
              items.carousel[index].owner = product.owner;
            })
            .catch((err) => { items.carousel[index].owner = null; });
        }
        return true;
      });
      this.setState({ carouselItems: items.carousel });
    });
  }

  render() {
    const { adminViewFlag } = this.props;
    return (
      <div>
        <Carousel
          controls={false}
          interval={5000}
        >
          {
            this.state.carouselItems.map((item, index) => (
              <Carousel.Item key={index}>
                <LinkContainer to={`/${item.owner}/products/${item.productId}` || '/#'}>
                  <div>
                    <ImageContainer>
                      <ImageDiv>
                        <PreviewImg src={item.image || bedroom} />
                      </ImageDiv>
                    </ImageContainer>
                    <Carousel.Caption className="hero">
                      <h2>غير مزاجك واجعل منزلك أكثر جاذبية </h2>
                      <LinkContainer to="/registration">
                        <Button>إبدأ معنا</Button>
                      </LinkContainer>
                    </Carousel.Caption>
                  </div>
                </LinkContainer>

              </Carousel.Item>
            ))
          }
        </Carousel>
        {
          adminViewFlag ?
            <CarouselEditModal items={this.state.carouselItems} onUpdate={e => this.getCarouselData(e)} />
            :
            ''
        }
      </div>
    );
  }
}

export default CarouselBanner;
