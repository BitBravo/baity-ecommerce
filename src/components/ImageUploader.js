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
        <Row >
          <Col xs={12} md={4} style={{float: 'right'}}>
        <Dropzone
          accept="image/png, image/jpeg" //only accepts png and jpeg images. Uses MIME not file name extention
          onDrop={this.props.onDrop}
          multiple={this.props.multipleFiles} //allow one or multiple images per product
          maxSize={1024 * 1024 * 5} //5MB
        >
          {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            if (isDragActive) {
              return (
                <div>
                  هذا الملف مسموح به
                </div>
              );
            }
            if (isDragReject) {
              return (
                <div>
                  هذا الملف غير مسموح به
                </div>
              );
            }
            return acceptedFiles.length || rejectedFiles.length ? (
              <div>
                <p>الملفات التي تم قبولها {acceptedFiles.length}, الملفات التي تم
                رفضها {rejectedFiles.length}. </p>
                <p>يمكنك  تعديل الصورة بسحب ملف صورة جديدة وإلقائه هنا أو بالضغط على هذا
                المكان لتحميل الملف. سيتم فقط قبول ملفات الصور من نوع jpeg و png
                وبحجم لا يزيد عن ٥ ميجابايت</p>
              </div>
            ) : (
              <div>
                يمكنك اضافة صورة بسحب ملف الصورة وإلقائه هنا أو بالضغط على هذا
                المكان لتحميل الملف. سيتم فقط قبول ملفات الصور من نوع jpeg و png
                وبحجم لا يزيد عن ٥ ميجابايت
              </div>
            );
          }}
        </Dropzone>
        </Col>
        
       
        
          
            {this.props.files.map(file => (
              <Col xs={12} md={4} key={file.name} style={{float: 'right'}}>
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
