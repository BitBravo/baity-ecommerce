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
const CategoryList = [
  "طاولة طعام",
  " طقم كنب",
  "ورق جدران",
  "طاولة شاي",
  "أدوات صحية"
];





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
        cat: {
          value: CategoryList[0], //we must fill out default value since user may not select
          valid: false,
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
        factory: {
          value: "",
          valid: false,
          firstTime: true,
          formError: ""
        },
        height: {
          value: "",
          valid: false,
          firstTime: true,
          formError: ""
        },
        length: {
          value: "",
          valid: false,
          firstTime: true,
          formError: ""
        },
        width: {
          value: "",
          valid: false,
          firstTime: true,
          formError: ""
        },
        price: {
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

class ProductForm extends Component {
  constructor(props) {
    super(props);
    console.log(`${this.constructor.name}.constructor`);

    this.state = {...getInitState()};
    console.log('after copying initState, state is: ')
    console.log(this.state)
    //if we are updating a product then show its data in the form otherwise show an empty form
    if (!this.props.isNewProduct) {
      this.state.name.value = this.props.product.name;
      this.state.cat.value = this.props.product.category;
      this.state.dept.value = this.props.product.department;
      this.state.desc.value = this.props.product.desc;
      this.state.factory.value = this.props.product.factory;
      this.state.height.value = this.props.product.height;
      this.state.length.value = this.props.product.length;
      this.state.width.value = this.props.product.width;
      this.state.price.value = this.props.product.price;
      this.state.name.valid = true;
      this.state.cat.valid = true;
      this.state.dept.valid = true;
      this.state.desc.valid = true;
      this.state.factory.valid = true;
      this.state.height.valid = true;
      this.state.length.valid = true;
      this.state.width.valid = true;
      this.state.price.valid = true;
      this.state.formValid = true
      this.state.imagesFromDB = [...this.props.product.images];//just URLs
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
    this.packageProduct = this.packageProduct.bind(this);
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
   * 1- the product we are updating has been changed somewhere else so we need to update form data
   * 2- the user clicked 'add new product' link so we need to clean up and prepare for adding a new product
   * @param {*} nextProps
   */
  componentWillReceiveProps(nextProps){
    console.log(`${this.constructor.name}.componentWillReceiveProps`);
    console.log('nextProps')
    console.log(nextProps)
    //case 1
    if (!nextProps.isNewProduct){
      var newImages = this.state.newImages;//preserve new images added to product
      this.setState(getInitState(), () => {
        var newState = {...this.state,
          newImages: newImages,
          name: {...this.state.name, value: this.props.product.name, valid: true},
          cat: {...this.state.cat, value: this.props.product.category, valid: true},
          dept: {...this.state.dept, value: this.props.product.department, valid: true},
          desc: {...this.state.desc, value: this.props.product.desc, valid: true},
          factory: {...this.state.factory, value: this.props.product.factory, valid: true},
          height: {...this.state.height, value: this.props.product.height, valid: true},
          length: {...this.state.length, value: this.props.product.length, valid: true},
          width: {...this.state.width, value: this.props.product.width, valid: true},
          price: {...this.state.price, value: this.props.product.price, valid: true},
          formValid: true,
          imagesFromDB: [...nextProps.product.images],
          formStatusAlert: {
            alert: true,
            type: 'info',
            alertMsg: "نود تنبهك أنه تم تحديث بيانات المنتج من قبل موظف آخر وقد تم تعديل البيانات أمامك بناء على التحديث",
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
    to the database upon product upload/addition/update.
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
          reject({type: 'product error', message: 'لا بد أن يكون عدد الصور للمنتج واحدة على الأقل'})
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

  packageProduct(){
    var product;
    //package form fields for either new or update
    product = {
      category: this.state.cat.value,
      department: this.state.dept.value,
      desc: this.state.desc.value,
      height: this.state.height.value,
      length: this.state.length.value,
      name: this.state.name.value,
      price: this.state.price.value,
      width: this.state.width.value,
      factory: this.state.factory.value
    };
    //if new product add other non form properties
    if (this.props.isNewProduct) {
      product = {...product,
        city: "الرياض",
        city_department: "",
        dateCreated: Date.now(),
        imgUrl: 'None',
        likes: 0,
        postType: "product"
      };
    }
    return product;
  }

  //handles form submission by calling parent onSubmit handler method
  handleSubmit(e) {
    e.preventDefault();
    try {
      if (this.state.formValid) {
        var product = this.packageProduct();
        //submit form by calling onSubmit
        //we will provide three callbacks to form submission handler in parent:
        // 1- callback for notifying us about success
        // 2- callback for notifying us about failure
        // 3- callback for notifying us about progress of submission
        this.props.onSubmit(
          product, this.state.newImages,
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
                ERROR: could not insert/update product or upload images. error code: ${error.code}, error message:${error.message}`
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
      console.log('something went wrong while trying to add product: ');
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
          : " يجب أن يكون طول اسم المنتج بين ثلاثة أحرف و ٣٠ حرف";
        break;
      case "desc":
        var pattern = /^([\w\s\u00C0-\u1FFF\u2C00-\uD7FF-]{15,200})$/i;
        var spacesPattern = /^([\s]+)$/;
        valid = pattern.test(value) && !spacesPattern.test(value);
        formError = valid
          ? ""
          : " يجب أن يكون طول وصف المنتج بين خمسة عشر حرفا  و ٢٠٠ حرف";
        break;
      case "factory":
        var pattern = /^([\w\s\u00C0-\u1FFF\u2C00-\uD7FF-]{2,100})$/i;
        var spacesPattern = /^([\s]+)$/;
        valid = pattern.test(value) && !spacesPattern.test(value);
        formError = valid ? "" : " يجب أن يكون طول اسم المصنع أقل من ١٠٠ حرف";
        break;
      case "price":
        let price = !isNaN(value)
          ? +value
          : -1;
        valid = price > 0;
        console.log(price)
        formError = valid ? "" : " يجب أن يكون سعر المنتج رقم أكبر من الصفر";
        break;
      case "length":
        let length = !isNaN(value)
          ? +value
          : -1;
        valid = length > 0 && length < 10000;
        formError = valid
          ? ""
          : "  يجب أن يكون طول المنتج رقم أكبر من الصفر وأصغر من ١٠٠٠٠ سم";
        break;
      case "width":
        let width = !isNaN(value)
          ? +value
          : -1;
        valid = width > 0 && width < 10000;
        formError = valid
          ? ""
          : " يجب أن يكون عرض المنتج رقم أكبر من الصفر وأصغر من ١٠٠٠٠ سم";
        break;
      case "height":
        let height = !isNaN(value)
          ? +value
          : -1;
        valid = height > 0 && height < 10000;
        formError = valid
          ? ""
          : " يجب أن يكون ارتفاع المنتج رقم أكبر من الصفر وأصغر من ١٠٠٠٠ سم";
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
          this.state.factory.valid &&
          this.state.height.valid &&
          this.state.length.valid &&
          this.state.width.valid &&
          this.state.price.valid &&
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

  //reset state is used when someone adds a product and asks to add another one
  //so we reset the state for the new product
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
              {this.props.isNewProduct
                ?<h2 style={{color:'rgb(26,156,142)'}}>إضافة المنتج </h2>
                :<h2 style={{color:'rgb(26,156,142)'}}> تحديث المنتج </h2>
                }

          </div>
        <ImagePreviewsContainer
          imagesFromDB={this.state.imagesFromDB}
          newImages={this.state.newImages}
          addImage={this.addImage}
          onImageDelete={this.deleteImage}
        />

        <FieldGroup
          id="formControlsProductName"
          type="text"
          label="الاسم"
          placeholder="أدخل اسم المنتج (مثلا: طقم كنب، بانيو حجري ...الخ)"
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
          id="formControlsProductPrice"
          type="text"
          label="السعر"
          placeholder="أدخل السعر"
          onChange={this.handleChange}
          name="price"
          value={this.state.price.value}
          help={this.state.price.formError}
          validationState={this.validationState(
            this.state.price.firstTime,
            this.state.price.valid
          )}
        />
        <FieldGroup
          id="formControlsProductLength"
          type="text"
          label="الطول"
          placeholder="أدخل الطول بال سم"
          onChange={this.handleChange}
          name="length"
          value={this.state.length.value}
          help={this.state.length.formError}
          validationState={this.validationState(
            this.state.length.firstTime,
            this.state.length.valid
          )}
        />
        <FieldGroup
          id="formControlsProductWidth"
          type="text"
          label="العرض"
          placeholder="أدخل العرض بال سم"
          onChange={this.handleChange}
          name="width"
          value={this.state.width.value}
          help={this.state.width.formError}
          validationState={this.validationState(
            this.state.width.firstTime,
            this.state.width.valid
          )}
        />
        <FieldGroup
          id="formControlsProductHeight"
          type="text"
          label="الارتفاع"
          placeholder="أدخل الارتفاع بال سم"
          onChange={this.handleChange}
          name="height"
          value={this.state.height.value}
          help={this.state.height.formError}
          validationState={this.validationState(
            this.state.height.firstTime,
            this.state.height.valid
          )}
        />
        <FieldGroup
          id="formControlsProductFactory"
          type="text"
          label="اسم المصنع"
          placeholder="أدخل اسم المصنع"
          onChange={this.handleChange}
          name="factory"
          value={this.state.factory.value}
          help={this.state.factory.formError}
          validationState={this.validationState(
            this.state.factory.firstTime,
            this.state.factory.valid
          )}
        />

        <FieldGroup
          id="formControlsProductDesc"
          componentClass="textarea"
          label="وصف المنتج"
          placeholder="ادخل وصف المنتج"
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
          controlId="formControlsProductDeptSelect"
          label="القسم"
          name="dept"
          placeholder={"اختر القسم الذي تنتمي له قطعة الأثاث "}
          onChange={this.handleChange}
          options={DepartmentList}
          selectedOption={this.state.dept.value}
        />


        <SelectGroup
          controlId="formControlsProductCatSelect"
          label="الصنف"
          name="cat"
          placeholder="أدخل الصنف (مثلا: طقم كنب، أدوات صحية ...الخ)"
          onChange={this.handleChange}
          options={CategoryList}
          selectedOption={this.state.cat.value}
        />

        <button type="submit" onClick={this.handleSubmit}  >
        {this.props.isNewProduct
         ?<span> أضف المنتج </span>
         :<span> تحديث المنتج </span>
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

          {/* This modal is shown after product addition/form submission is finshed.
          Its content depends if the form submission was successful or failed.
          if successful it will ask if user wants to add another new product or go to main page.
          If failed it will show error message and ask user to go to home pgae  */}
        <Modal
          show={this.state.submitStatus.showSubmitModal}
          style={{top: 300}}
        >
        <Modal.Header >
            { this.state.submitStatus.submitSuccessful
              ? this.props.isNewProduct
                  ? <Modal.Title id="contained-modal-title"><FaCheckCircleO style={{color: 'green', width: '30px', height: '30px'}}/>  تمت اضافة المنتج بنجاح</Modal.Title>
                  : <Modal.Title id="contained-modal-title"><FaCheckCircleO style={{color: 'green', width: '30px', height: '30px'}}/>  تمت تحديث المنتج بنجاح</Modal.Title>
              : this.props.isNewProduct
                  ? <Modal.Title id="contained-modal-title"><FaTimesCircleO style={{color: 'red', width: '30px', height: '30px'}}/>  يوجد خطأ في اضافة المنتج</Modal.Title>
                  : <Modal.Title id="contained-modal-title"><FaTimesCircleO style={{color: 'red', width: '30px', height: '30px'}}/>  يوجد خطأ في تحديث المنتج</Modal.Title>
            }
          </Modal.Header>
          {
            this.state.submitStatus.submitSuccessful
              ?
              <Modal.Body>
                &nbsp;&nbsp;
                { this.props.isNewProduct
                    ? <Link to="/newproduct">
                        <Button onClick={this.resetState}>اضافة منتج جديد</Button>
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

        <MyProgressBar title='جاري اضافة المنتج' progressBars={this.state.progressBars} />

      </form>
    );
  }
}

export default ProductForm;
