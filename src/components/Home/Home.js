import React, { Component } from "react";
import { app, base } from "../../base";
import { Image, Carousel, Panel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ProductList from '../ProductList';
import CarouselMenu from '../../commons/CarouselMenu';
import traditionalkitchen from 'assets/img/traditionalkitchen.jpg';
import bedroom from 'assets/img/bedroom.jpg';
import livingroom from 'assets/img/livingroom.jpg';
import styled from 'styled-components'
import { CBrief } from "../ProductBrief";
import CaroselImg from 'assets/img/CaroselImg.jpg';

import './styles.css'


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
height:395px;

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
 `
export class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: {}
    };
  }

  render() {
    return (
      <div>
        <div >
          <Carousel controls={false}>
            <Carousel.Item>
              <div>
                <ImageContainer>
                  <ImageDiv>

                    <PreviewImg src={bedroom} />

                  </ImageDiv>
                </ImageContainer>
                <Carousel.Caption className="hero">
                  <h2>غير مزاجك واجعل منزلك أكثر جاذبية </h2>

                  {!this.props.authenticated ?
                    (<LinkContainer to="/login" >

                      <Button>
                        ابدأ معنا
                      </Button>
                    </LinkContainer>)
                    : <div></div>}
                </Carousel.Caption>

              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div>
                <ImageContainer>
                  <ImageDiv>
                    <PreviewImg src={CaroselImg} />
                  </ImageDiv>
                </ImageContainer>
                <Carousel.Caption className="hero">
                  <h2>غير مزاجك واجعل منزلك أكثر جاذبية </h2>

                  {!this.props.authenticated ?
                    <LinkContainer to="/login" >

                      <Button>
                        ابدأ معنا
                </Button>
                    </LinkContainer>
                    : <div></div>}
                </Carousel.Caption>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div>
                <ImageContainer>
                  <ImageDiv>
                    <PreviewImg src={livingroom} />
                  </ImageDiv>
                </ImageContainer>

                <Carousel.Caption className="hero">
                  <h2>غير مزاجك واجعل منزلك أكثر جاذبية </h2>

                  {!this.props.authenticated ?
                    <LinkContainer to="/login" >
                      <Button>
                        ابدأ معنا
                      </Button>
                    </LinkContainer>
                    : <div></div>
                  }
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className='container carousel-containter-block'>
          <div className='carousel-containter carousel-1'>
            <p className='curousle-title'>Hello world1</p>
            <CarouselMenu />
          </div>
          <div className='carousel-containter carousel-2'>
            <p className='curousle-title'>hello world2</p>
            <CarouselMenu />
          </div>
        </div>
        <ProductList thisUserOnly={false} />
      </div>

    );
  }
}

export default Home;
