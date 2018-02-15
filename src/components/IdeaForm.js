import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Popover,
  Button,
  OverlayTrigger,
  Fade,
  Collapse,
  Alert, Modal, ProgressBar
} from "react-bootstrap";
import ImageUploader from "./ImageUploader";
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o'
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o'
import bayty_icon from '../assets/img/bayty_icon.png';
import ImagePreviewsContainer from './ImagePreviewsContainer'
import styled from 'styled-components'
import _ from 'lodash'
import MyProgressBar from './MyProgressBar'




function FieldGroup({ id, label, help, validationState, firstTime, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  );
}


const SelectGroup = ({ id, label, selectedOption, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      componentClass="select"
      placeholder={props.placeholder}
      name={props.name}
      value={selectedOption}
      onChange={props.onChange}
    >
      {props.options.map(opt => {
        return (
          <option key={opt} value={opt}>
            {opt}
          </option>
        );
      })}
    </FormControl>
  </FormGroup>
);




const DepartmentList = ["صالة", "غرف نوم", "مطابخ", "مجلس", "دورات مياه"];





function getInitState(){
    return {
        newImages: [], //image files
        imagesFromDB: [],
        name: {
          value: "",
          valid: false,
          //indicates if it is the first time to edit the field. If so do not show validation error msgs
          firstTime: true,
          formError: ""
        },
        dept: {
          value: DepartmentList[0],
          valid: false,
          firstTime: true,
          formError: ""
        },
        desc: {
          value: "",
          valid: false,
          firstTime: true,
          formError: ""
        },
        formValid: false,
        formStatusAlert: {
          alert: false,
          type: "info", //indicates that we should show an alert msg due to form invalid
          alertMsg: "", //message shown when form can not be submitted cause form is not valid
        },
        progressBars: {},
        submitStatus: {
          showSubmitModal: false,
          submitSuccessful: false,
          errorMsg: ''
        }
      };
}

class IdeaForm extends Component {
  constructor(props) {
    super(props);
    console.log(`${this.constructor.name}.constructor`);

    this.state = {...getInitState()};
    console.log('after copying initState, state is: ')
    console.log(this.state)
    //if we are updating a idea then show its data in the form otherwise show an empty form
    if (!this.props.isNewIdea) {
      this.state.name.value = this.props.idea.name;
      this.state.dept.value = this.props.idea.department;
      this.state.desc.value = this.props.idea.desc;
      this.state.name.valid = true;
      this.state.dept.valid = true;
      this.state.desc.valid = true;
      this.state.formValid = true
      this.state.imagesFromDB = [...this.props.idea.images];//just URLs
    }
    console.log('after adding data from DB, state is: ')
    console.log(this.state)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validationState = this.validationState.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.parseArabic = this.parseArabic.bind(this);
    this.resetState = this.resetState.bind(this);
    this.addImage = this.addImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.packageIdea = this.packageIdea.bind(this);
    console.log('at the end of constructor state is: ')
    console.log(this.state)
  }


  componentWillMount(){
    console.log(`${this.constructor.name}.componentWillMount`);
  }
  componentDidMount(){
    console.log(`${this.constructor.name}.componentDidMount`);
  }
  /**
   * This will be called in one of two cases:
   * 1- the idea we are updating has been changed somewhere else so we need to update form data
   * 2- the user clicked 'add new idea' link so we need to clean up and prepare for adding a new idea
   * @param {*} nextProps
   */
  componentWillReceiveProps(nextProps){
    console.log(`${this.constructor.name}.componentWillReceiveProps`);
    console.log('nextProps')
    console.log(nextProps)
    //case 1
    if (!nextProps.isNewIdea){
      var newImages = this.state.newImages;//preserve new images added to idea
      this.setState(getInitState(), () => {
        var newState = {...this.state,
          newImages: newImages,
          name: {...this.state.name, value: this.props.idea.name, valid: true},
          dept: {...this.state.dept, value: this.props.idea.department, valid: true},
          desc: {...this.state.desc, value: this.props.idea.desc, valid: true},
          formValid: true,
          imagesFromDB: [...nextProps.idea.images],
          formStatusAlert: {
            alert: true,
            type: 'info',
            alertMsg: "نود تنبهك أنه تم تحديث بيانات الفكرة من قبل موظف آخر وقد تم تعديل البيانات أمامك بناء على التحديث",
          }
        }
        this.setState(newState)
      })
    }
    //case 2
    else {
      this.resetState();
    }
  }
  componentWillUnmount(){
    console.log(`${this.constructor.name}.componentWillUnmount`);
  }
  componentWillUpdate(){
    console.log(`${this.constructor.name}.componentWillUpdate`);
  }


  /*
    This method adds an image to this.state.newImages to be added later
    to the database upon idea upload/addition/update.
    This works for single image.
  */
  addImage(newImageFile, newImageDataURL){
    //allow one image only and overwrite previous one
    //IT IS IMPORTANT that validateForm runs after this call to setState
    //is finished. see (https://reactjs.org/docs/state-and-lifecycle.html)
    console.log('before starting adding a new image')
    if (_.findIndex(this.state.newImages, [ 'url', newImageDataURL] ) != -1)
      return;
      console.log('start adding a new image')
    var newImage = {file: newImageFile, url: newImageDataURL}
    this.setState(
      {
        newImages: [...this.state.newImages, newImage]
      },
      () => this.validateForm()
    );
  }

  /*
  this method removes an image that:
  1- has been added during current session but not inserted into database yet (fromDB false)
  2- has been downloaded from DB (fromDB true)
  */
  deleteImage(imageDataURL, fromDB){
    if (fromDB ){
      if (this.state.imagesFromDB.length > 1){
        return this.props.deleteImageFromDB(imageDataURL)
          .then((imagesFromDB) => {
            console.log('imagesFromDB')
            console.log(imagesFromDB)
            this.setState({
                imagesFromDB: [...imagesFromDB],
              }, () => this.validateForm()
            )
          })
          .catch((error) => {
            throw error
          })
      } else {
        //now we catch this in imagePreviewsContainer so we need to remove this code
        return new Promise((resolve, reject) => {
          reject({type: 'idea error', message: 'لا بد أن يكون عدد الصور للفكرة واحدة على الأقل'})
        })
      }
    } else {
      var newImages = [...this.state.newImages];
      _.remove(newImages, (image) => image.url === imageDataURL);
      this.setState({
          newImages: [...newImages],
        }, () => this.validateForm()
      )
    }
  }

  packageIdea(){
    var idea;
    //package form fields for either new or update
    idea = {
      department: this.state.dept.value,
      desc: this.state.desc.value,
      name: this.state.name.value,
    };
    //if new idea add other non form properties
    if (this.props.isNewIdea) {
      idea = {...idea,
        city: "الرياض",
        city_department: "",
        dateCreated: Date.now(),
        imgUrl: 'None',
        likes: "0",
        postType: "idea"
      };
    }
    return idea;
  }

  //handles form submission by calling parent onSubmit handler method
  handleSubmit(e) {
    e.preventDefault();
    try {
      if (this.state.formValid) {
        var idea = this.packageIdea();
        //submit form by calling onSubmit
        //we will provide three callbacks to form submission handler in parent:
        // 1- callback for notifying us about success
        // 2- callback for notifying us about failure
        // 3- callback for notifying us about progress of submission
        this.props.onSubmit(
          idea, this.state.newImages,
          // progress bar updater callback
          (percentage, name) => {
            var progressBars = this.state.progressBars;
            progressBars[name] = {
              percentage: 0,
              name: name
            };
            this.setState({ progressBars: { ...progressBars } } );
          })
          .then(() => {
            //show success popup
            let submitStatus = {
              showSubmitModal: true,
              submitSuccessful: true,
              errorMsg: ''
            }
            let newState = {...this.state, progressBars: {}, submitStatus: submitStatus}

            this.setState(newState, () => {console.log('after successful form submission state is:'); console.log(this.state);})

          })
          .catch(error => {
            //show failure popup
            let submitStatus = {
              showSubmitModal: true,
              submitSuccessful: false,
              errorMsg: `حدث خطأ غير معروف. نرجو ابلاغ الصيانة بالخطأ التالي:
                ERROR: could not insert/update idea or upload images. error code: ${error.code}, error message:${error.message}`
            }
            let newState = {...this.state, progressBars: {}, submitStatus: submitStatus}

            this.setState(newState)

          })



        // //Now we have asked firebase to submit and we will wait for above call async.
        // //Let us show a progress bar to the user while waiting
        //   (percentage) => {
        //     this.setState(
        //       {
        //         uploadProgress: {show: true, percentage: 0}
        //       }
        //     )
        //   }

      } else
        //if form is not valid show the alert message
        this.setState({
          formStatusAlert: {
            alert: true,
            type: "danger",
            alertMsg:
              " عذرا ! يجب تعبئة النموذج كاملا مع الصورة بحيث تكون البيانات المعطاة صحيحة حسب المطلوب",
              showSuccessfulSubmit: false
          }
        });
    } catch (err) {
      console.log('something went wrong while trying to add idea: ');
      console.log(this.state);
      console.log(`ERROR: code: ${err.code}, message:${err.message}`);
      //in case something went wrong while trying to submit then handle the exception
      //hide waiting alert then show submission failure msg
      this.setState(
        {
          progressBars: {}
        }, () => this.setState(
            {
              submitStatus: {
                showSubmitModal: true,
                submitSuccessful: false,
                errorMsg: 'حدث خطأ غير معروف. نرجو ابلاغ الصيانة بالخطأ التالي: ' + err
              }
            }
          )
      );
    }
  }

  //converts indian digits into arabic ١ -> 1, ٢ -> 2 ...etc
  parseArabic(str) {

    var result =  str
                      .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(d) {
                        return d.charCodeAt(0) - 1632;
                      });
                      // .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(d) {
                      //   return d.charCodeAt(0) - 1776;
                      // })
    return result;

  }

  //Here we do all validations we would like
  //Note that setState does shallow merge of oldState with new one
  //(https://stackoverflow.com/questions/40601834/deep-merge-of-complex-state-in-react)
  //(https://reactjs.org/docs/update.html)
  handleChange(e) {
    //name of the field
    const name = e.target.name;
    //value of the field (for a text field the text inside it, for a select the selected value)
    let value = e.target.value;
    value = this.parseArabic(value)

    let firstTime = false;
    let valid = false;
    let formError = "";



    switch (name) {
      case "name":
        var pattern = /^([\w\s\u00C0-\u1FFF\u2C00-\uD7FF-]{3,30})$/i;
        var spacesPattern = /^([\s]+)$/;
        valid = pattern.test(value) && !spacesPattern.test(value);
        formError = valid
          ? ""
          : " يجب أن يكون طول اسم الفكرة بين ثلاثة أحرف و ٣٠ حرف";
        break;
      case "desc":
        var pattern = /^([\w\s\u00C0-\u1FFF\u2C00-\uD7FF-]{15,500})$/i;
        var spacesPattern = /^([\s]+)$/;
        valid = pattern.test(value) && !spacesPattern.test(value);
        formError = valid
          ? ""
          : " يجب أن يكون طول وصف الفكرة بين خمسة عشر حرفا  و ٥٠٠ حرف";
        break;
      default:
        break;
    }
    let newState = {
      [name]: { ...this.state[name], valid, formError, value, firstTime }
    };

    //setState will shallow merge the new state with the current
    //IT IS IMPORTANT that validateForm runs after this call to setState
    //is finished. see (https://reactjs.org/docs/state-and-lifecycle.html)
    this.setState(newState, () => this.validateForm());
  }

  //after each field validatiion, here we revalidate the whole form
  validateForm() {
    this.setState(
      {
        formValid:
          this.state.name.valid &&
          this.state.desc.valid &&
          (this.state.newImages.length > 0 || this.state.imagesFromDB.length > 0)
      },
      () =>
        //if alert box is visible then change it to invisible
        this.setState(prevState => {
          return {
            formStatusAlert: {
              alert: false,
              type: prevState.formStatusAlert.type,
              alertMsg: "",
              showSuccessfulSubmit: false
            }
          };
        })
    );
  }

  //outputs validatin state of a field (valid, not valid, neutral since it is not touched yet)
  validationState(firstTimeFlag, validFlag) {
    if (firstTimeFlag) return null;
    else if (validFlag) return "success";
    else return "error";
  }

  //handles the dismissal of the alert box that appears when trying to submit invalid form
  //or when form submission fails
  handleAlertDismiss() {
    this.setState(prevState => {
      return {
        formStatusAlert: {
          alert: false,
          type: prevState.formStatusAlert.type,
          alertMsg: "",
          showSuccessfulSubmit: false
        }
      };
    });
  }

  //reset state is used when someone adds a idea and asks to add another one
  //so we reset the state for the new idea
  resetState() {
    this.setState(getInitState);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.resetState();
  //   // this.setupStuff(nextProps);
  // }

  render() {
    console.log(`${this.constructor.name}.render`);
    console.log(this.state)
    return (
      <form>
        
          <div>
              {this.props.isNewIdea
                ?<h3 style={{color:'rgb(26,156,142)'}}>اضافة فكرة جديدة</h3>
                :<h3 style={{color:'rgb(26,156,142)'}}> تحديث الفكرة </h3>
                }

          </div>
        <ImagePreviewsContainer
          imagesFromDB={this.state.imagesFromDB}
          newImages={this.state.newImages}
          addImage={this.addImage}
          onImageDelete={this.deleteImage}
        />

        <FieldGroup
          id="formControlsIdeaName"
          type="text"
          label="الاسم"
          placeholder="أدخل اسم الفكرة (مثلا: طقم كنب، بانيو حجري ...الخ)"
          onChange={this.handleChange}
          name="name"
          value={this.state.name.value}
          help={this.state.name.formError}
          validationState={this.validationState(
            this.state.name.firstTime,
            this.state.name.valid
          )}
        />

        <FieldGroup
          id="formControlsIdeaDesc"
          componentClass="textarea"
          label="وصف الفكرة"
          placeholder="ادخل وصف الفكرة"
          onChange={this.handleChange}
          name="desc"
          value={this.state.desc.value}
          help={this.state.desc.formError}
          validationState={this.validationState(
            this.state.desc.firstTime,
            this.state.desc.valid
          )}
        />

        <SelectGroup
          controlId="formControlsIdeaDeptSelect"
          label="القسم"
          name="dept"
          placeholder={"اختر القسم الذي تنتمي له قطعة الأثاث "}
          onChange={this.handleChange}
          options={DepartmentList}
          selectedOption={this.state.dept.value}
        />

       <button type="submit" onClick={this.handleSubmit}  >
        {this.props.isNewIdea
         ?<span> أضف الفكرة </span>
         :<span> تحديث الفكرة </span>
        }
        </button>

        <Collapse in={this.state.formStatusAlert.alert}>
          <Alert
            bsStyle={this.state.formStatusAlert.type}
            onDismiss={this.handleAlertDismiss}
          >
            {this.state.formStatusAlert.alertMsg}
          </Alert>
        </Collapse>

          {/* This modal is shown after idea addition/form submission is finshed.
          Its content depends if the form submission was successful or failed.
          if successful it will ask if user wants to add another new idea or go to main page.
          If failed it will show error message and ask user to go to home pgae  */}
        <Modal
          show={this.state.submitStatus.showSubmitModal}
          style={{top: 300}}
        >
        <Modal.Header >
            { this.state.submitStatus.submitSuccessful
              ? this.props.isNewIdea
                  ? <Modal.Title id="contained-modal-title"><FaCheckCircleO style={{color: 'green', width: '30px', height: '30px'}}/>  تمت اضافة الفكرة بنجاح</Modal.Title>
                  : <Modal.Title id="contained-modal-title"><FaCheckCircleO style={{color: 'green', width: '30px', height: '30px'}}/>  تمت تحديث الفكرة بنجاح</Modal.Title>
              : this.props.isNewIdea
                  ? <Modal.Title id="contained-modal-title"><FaTimesCircleO style={{color: 'red', width: '30px', height: '30px'}}/>  يوجد خطأ في اضافة الفكرة</Modal.Title>
                  : <Modal.Title id="contained-modal-title"><FaTimesCircleO style={{color: 'red', width: '30px', height: '30px'}}/>  يوجد خطأ في تحديث الفكرة</Modal.Title>
            }
          </Modal.Header>
          {
            this.state.submitStatus.submitSuccessful
              ?
              <Modal.Body>
                &nbsp;&nbsp;
                { this.props.isNewIdea
                    ? <Link to="/newidea">
                        <Button onClick={this.resetState}>اضافة فكرة جديدة</Button>
                      </Link>
                    : null
                }
                &nbsp;&nbsp;&nbsp;
                <Link to="/">
                <Button>العودة للصفحة الرئيسية</Button>
                </Link>
              </Modal.Body>
            :
            <Modal.Body>
            <Alert
              bsStyle='danger'
            >
              {this.state.submitStatus.errorMsg}
            </Alert>
            <Link to="/">
                <Button>العودة للصفحة الرئيسية</Button>
                </Link>
            </Modal.Body>
          }
        </Modal>

        <MyProgressBar title='جاري اضافة الفكرة' progressBars={this.state.progressBars} />

      </form>
    );
  }
}

export default IdeaForm;
