import React from "react";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import { app } from "../base";
// import firebase from 'firebase'

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    //change to true if you want to upload multiple images per product
    this.multipleFiles = false
    // this.clickInput = this.clickInput.bind(this);
    // this.handleFiles = this.handleFiles.bind(this);
    // this.convertFilesToBase64 = this.convertFilesToBase64.bind(this);
  }

  // clickInput() {
  //   let element = document.getElementById(this.state.elementId);
  //   element.value = '';
  //   element.click();
  // }

  // handleFiles(event) {
  //   if(this.props.base64) {
  //     this.convertFilesToBase64(event.target.files);
  //   } else {
  //     this.props.handleFiles(event.target.files);
  //   }
  // }

  
  componentWillUnmount() {
    //to avoid memory leaks. See Important note @ (https://react-dropzone.js.org/)
    this.state.files.map(file => {
      window.URL.revokeObjectURL(file.preview);
    })
  }

  uploadImages() {
    //Check (https://firebase.google.com/docs/storage/web/upload-files) for more info
    this.state.files.map(file => {
      //get a reference for the image bucket (the placeholder where we will put the image into)
      var imagesRef = app
        .storage()
        .ref()
        .child("testProductImages/" + Date.now() + Math.random());
      //upload the image. This is a task that will run async. Notice that it accepts a file as in
      //browser API File (see https://developer.mozilla.org/en-US/docs/Web/API/File)
      imagesRef.put(file).then(function(snapshot) {
        console.log("uploaded a file");
      });
    });
  }

  handleOnDrop(files, rejectedFiles) {
    var newFiles = [];
    //always (1) copy state value, (2) change the value, (3) then assign it back to state
    (this.multipleFiles)
    ? newFiles = [...this.state.files, ...files]
    : newFiles = [...files]
    this.setState({
      files: newFiles
    });

    // files.map((file) => {
    //   newFiles.push(file);

    // const reader  = new FileReader();

    // reader.onload = (upload) =>  {
    //   console.log("upload opject:")
    //   console.log(upload)
    //   const newFilesSrcs = this.state.filesSrcs;
    //   const fileSrc = reader.result;
    //   newFilesSrcs.push(fileSrc);
    //   this.setState({
    //     filesSrcs: newFilesSrcs
    //   })
    // }

    // if (file) {
    //   reader.readAsDataURL(file);
    // }
    // });
  }

  // convertFilesToBase64(files) {
  //   let ef = files;

  //   if (this.props.multipleFiles) {
  //     let files = { base64: [], fileList: ef };

  //     for (var i = 0, len = ef.length; i < len; i++) {
  //       let reader = new FileReader();
  //       let f = ef[i];

  //       reader.onloadend = e => {
  //         files.base64.push(reader.result);

  //         if (files.base64.length === ef.length) {
  //           this.props.handleFiles(files);
  //         }
  //       }

  //       reader.readAsDataURL(f);
  //     }
  //   } else {
  //     let files = { base64: '', fileList: ef };
  //     let f = ef[0];
  //     let reader = new FileReader();

  //     reader.onloadend = e => {
  //       files.base64 = reader.result;
  //       this.props.handleFiles(files);
  //     }

  //     reader.readAsDataURL(f);
  //   }
  // }

  render() {
    console.log(this.state.filesSrcs);
    return (
      <div className="wrapper">
        <Dropzone
          accept="image/png, image/jpeg" //only accepts png and jpeg images. Uses MIME not file name extention
          onDrop={this.handleOnDrop.bind(this)}
          multiple={this.multipleFiles} //allow one or multiple images per product
          maxSize={1024 * 1024 * 5} //5MB
        >
          
          {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            if (isDragActive) {
              return <div style={{direction: 'rtl', paddingRight: "20px", paddingTop: "20px", paddingLeft: "20px"}}>هذا الملف مسموح به</div>;
            }
            if (isDragReject) {
              return <div style={{direction: 'rtl', paddingRight: "20px", paddingTop: "20px", paddingLeft: "20px"}}>هذا الملف غير مسموح به</div>;
            }
            return acceptedFiles.length || rejectedFiles.length
              ? <div style={{direction: 'rtl', paddingRight: "20px", paddingTop: "20px", paddingLeft: "20px"}}>`الملفات التي تم قبولها {acceptedFiles.length}, الملفات التي تم رفضها {rejectedFiles.length} `</div>
              : <div style={{direction: 'rtl', paddingRight: "20px", paddingTop: "20px", paddingLeft: "20px"}}>يمكنك اضافة صور بسحب ملف الصورة وإلقائه هنا أو بالضغط على هذا المكان لتحميل الملف. سيتم فقط قبول ملفات الصور من نوع jpeg و png وبحجم لا يزيد عن ٥ ميجابايت</div>;
          }}
        </Dropzone>
        <aside>
          <h2>الصور المرفوعة</h2>
          <ul>
            {this.state.files.map(file => (
              <li key={file.name}>
                <img src={file.preview} style={{ maxWidth: "72px" }} />
              </li>
            ))}
          </ul>
        </aside>
        <button onClick={this.uploadImages.bind(this)}>Upload Images</button>
      </div>
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
