import React from 'react';
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types';

class ImageUploader extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        files: []
      }
      // this.clickInput = this.clickInput.bind(this);
      // this.handleFiles = this.handleFiles.bind(this);
      this.convertFilesToBase64 = this.convertFilesToBase64.bind(this);
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

  uploadImages() {
    console.log(this.state.files)
  }

  handleOnDrop(files, rejectedFiles) {
    const newFiles = [...this.state.files, ...files];//always copy state value, change it then assign it back  
    this.setState({
      files: newFiles
    })
    
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

  convertFilesToBase64(files) {
    let ef = files;

    if (this.props.multipleFiles) {
      let files = { base64: [], fileList: ef };

      for (var i = 0, len = ef.length; i < len; i++) {
        let reader = new FileReader();
        let f = ef[i];

        reader.onloadend = e => {
          files.base64.push(reader.result);

          if (files.base64.length === ef.length) {
            this.props.handleFiles(files);
          }
        }

        reader.readAsDataURL(f);
      }
    } else {
      let files = { base64: '', fileList: ef };
      let f = ef[0];
      let reader = new FileReader();

      reader.onloadend = e => {
        files.base64 = reader.result;
        this.props.handleFiles(files);
      }

      reader.readAsDataURL(f);
    }
  }

  render() {
    console.log(this.state.filesSrcs)
    return (
    <div className="wrapper">
    <Dropzone accept="image/png, image/jpeg" onDrop={this.handleOnDrop.bind(this)} >
      <p>يمكنك اضافة صور بسحب ملف الصورة وإلقائه هنا أو بالضغط على هذا المكان لتحميل الملف</p>
    </Dropzone>
    <aside>
    <h2>الصور المرفوعة</h2>
    <ul>
      {
        this.state.files.map((file) => <li key={file.name}><img src={file.preview} style={{maxWidth: "72px"}}/></li>)
      }
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