import React, { Component } from 'react'
import styled from 'styled-components'
import MdCancel from 'react-icons/lib/md/cancel'

const DeleteButton = styled(MdCancel)`
  display:block;
  width:20px;
  height:20px;
  position: absolute;
  top: 5px;
  right: 5px;
  opacity: .5;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
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
  margin-bottom: 20px;
  overflow: hidden;
  border: 1px solid #BFBFBF;
  border-radius: 10%;
  &:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
`;

class ImagePreview extends Component {
  constructor(props){
    super(props);

  }

  handleImageSelect(){
    console.log('image click and URL is')
    this.props.onImageSelect(this.props.url);
  }

  handleImageDelete(){
    console.log('delete click and URL is')
    this.props.onImageDelete(this.props.url);
  }

  render() {
    return (
      <ImageContainer onClick={this.handleImageSelect.bind(this)}>
        <ImageDiv>
        <PreviewImg   src={this.props.url} 
               className="img-responsive "/>
        <DeleteButton onClick={this.handleImageDelete.bind(this)}/>
        </ImageDiv>
      </ImageContainer>
    );
  }
}

export default ImagePreview;