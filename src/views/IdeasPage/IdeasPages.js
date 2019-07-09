import React, { Component } from "react";
import { Col, Row, Carousel, Grid } from "react-bootstrap";
import IdeaList from 'components/IdeaList';
import styled from 'styled-components'
import bedroom from 'assets/img/bedroom.jpg';
import livingroom from 'assets/img/livingroom.jpg';
import CaroselImg from 'assets/img/CaroselImg.jpg';

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
height:395px;
`;

const CarouselDiv = styled(Col)`
padding-left:15px;
padding-right:15px;
@media only screen and (max-width: 767px) {
  padding-left:0;
  padding-right:0;
`

class IdeasPage extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
            <CarouselDiv sm={12} xs={12} lg={12} >
              <Carousel controls={false}>
                <Carousel.Item>
                  <div>
                    <ImageContainer>
                      <ImageDiv>
                        <PreviewImg src={CaroselImg} />
                      </ImageDiv>
                    </ImageContainer>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div>
                    <ImageContainer>
                      <ImageDiv>
                        <PreviewImg src={livingroom} />
                      </ImageDiv>
                    </ImageContainer>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div>
                    <ImageContainer>
                      <ImageDiv>
                        <PreviewImg src={bedroom} />
                      </ImageDiv>
                    </ImageContainer>
                  </div>
                </Carousel.Item>
              </Carousel>
            </CarouselDiv>
          </Row>
        </Grid>
        <IdeaList thisUserOnly={false} />
      </div>
    );
  }
}

export default IdeasPage;
