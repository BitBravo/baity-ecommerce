import React from "react";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import { Image, Grid, Row, Col, Panel } from 'react-bootstrap'

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    
    
  }

  

  
 

    

  

  render() {
    return (
      <Panel>
      <Grid >
        <Row style={{float: 'right'}}>
          <Col xs={12} md={12}>
        <Dropzone
          accept="image/png, image/jpeg" //only accepts png and jpeg images. Uses MIME not file name extention
          onDrop={this.props.onDrop}
          multiple={this.props.multipleFiles} //allow one or multiple images per product
          maxSize={1024 * 1024 * 5} //5MB
        >
          {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            if (isDragActive) {
              return (
                <div
                  style={{
                    direction: "rtl",
                    paddingRight: "20px",
                    paddingTop: "20px",
                    paddingLeft: "20px"
                  }}
                >
                  هذا الملف مسموح به
                </div>
              );
            }
            if (isDragReject) {
              return (
                <div
                  style={{
                    direction: "rtl",
                    paddingRight: "20px",
                    paddingTop: "20px",
                    paddingLeft: "20px"
                  }}
                >
                  هذا الملف غير مسموح به
                </div>
              );
            }
            return acceptedFiles.length || rejectedFiles.length ? (
              <div
                style={{
                  direction: "rtl",
                  paddingRight: "20px",
                  paddingTop: "20px",
                  paddingLeft: "20px"
                }}
              >
                `الملفات التي تم قبولها {acceptedFiles.length}, الملفات التي تم
                رفضها {rejectedFiles.length} `
              </div>
            ) : (
              <div
                style={{
                  direction: "rtl",
                  paddingRight: "20px",
                  paddingTop: "20px",
                  paddingLeft: "20px"
                }}
              >
                يمكنك اضافة صور بسحب ملف الصورة وإلقائه هنا أو بالضغط على هذا
                المكان لتحميل الملف. سيتم فقط قبول ملفات الصور من نوع jpeg و png
                وبحجم لا يزيد عن ٥ ميجابايت
              </div>
            );
          }}
        </Dropzone>
        </Col>
        
        <Col xs={12} md={12}>
        
          <h2>الصور المرفوعة</h2>
          </Col> 
        
          
            {this.props.files.map(file => (
              <Col xs={12} md={4} key={file.name}>
                {/* <img src={file.preview} style={{ maxWidth: "72px" }} /> */}
                <Image src={file.preview} rounded style={{ maxWidth: "200px" }}/>
              </Col>
            ))}
          
          </Row>
        </Grid>
      </Panel>
    );
  }
}

// ImageUploader.defaultProps = {
//   fileTypes: 'image/*',
//   multipleFiles: false,
//   base64: false,
// };

// ImageUploader.propTypes = {
//   multipleFiles: PropTypes.bool,
//   handleFiles: PropTypes.func.isRequired,
//   fileTypes: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.array,
//   ]),
//   base64: PropTypes.bool,
//   children: PropTypes.element.isRequired
// };

export default ImageUploader;
