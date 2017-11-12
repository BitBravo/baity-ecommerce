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
  Alert, Modal
} from "react-bootstrap";
import ImageUploader from "./ImageUploader";
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'


const popoverHoverFocus = (
  <Popover id="popover-trigger-hover-focus" title="Popover bottom">
    <strong>Holy guacamole!</strong> Check this info.
  </Popover>
);

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

const SelectGroup = ({ id, label, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      componentClass="select"
      placeholder={props.placeholder}
      name={props.name}
      value={props.selectedOption}
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

const popoverBottom = (
  <Popover id="popover-positioned-bottom" title="Popover bottom">
    <strong>Holy guacamole!</strong> Check this info.
  </Popover>
);

const DepartmentList = ["صالة", "غرف نوم", "مطابخ", "مجلس", "دورات مياه"];
const CategoryList = [
  "طاولة طعام",
  " طقم كنب",
  "ورق جدران",
  "طاولة شاي",
  "أدوات صحية"
];

const initState = {
  files: [], //image files
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
    type: "info", //indicates that we should show an alert msg due to form submission failure
    alertMsg: "", //message shown when form submission fails
    showSuccessfulSubmit: false
  }
};


class ProductForm extends Component {
  constructor(props) {
    super(props);
    
    
    

    this.state = initState;

    //change to true if you want to upload multiple images per product
    this.multipleFiles = false;

    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validationState = this.validationState.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.parseArabic = this.parseArabic.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  /*
  This handles images when they dragged and dropped on dropzone or
  when they are normally uploded using dropzone.
  */
  handleOnDrop(files, rejectedFiles) {
    var newFiles = [];
    //always (1) copy state value, (2) change the value, (3) then assign it back to state
    this.multipleFiles
      ? (newFiles = [...this.state.files, ...files])
      : (newFiles = [...files]); //allow one image only and overwrite previous one

    //IT IS IMPORTANT that validateForm runs after this call to setState
    //is finished. see (https://reactjs.org/docs/state-and-lifecycle.html)
    this.setState(
      {
        files: newFiles
      },
      () => this.validateForm()
    );
  }

  componentWillUnmount() {
    //to avoid memory leaks. See Important note @ (https://react-dropzone.js.org/)
    this.state.files.map(file => {
      window.URL.revokeObjectURL(file.preview);
    });
  }

  //handles form submission by calling parent onSubmit handler method
  handleSubmit(e) {
    e.preventDefault();
    try {
      if (this.state.formValid) {
        //submit form. provide errorViewer to form submission method from parent
        this.props.onSubmit(
          this.state,
          err => {
            this.setState({
              formStatusAlert: {
                alert: true,
                type: "danger",
                alertMsg:
                  "حدث خطأ غير معروف. نرجو ابلاغ الصيانة بالخطأ التالي: " + err
              }
            });
          },
          // also provide success handler
          () => {
            //hide waiting alert
            this.setState(prevState => {
              return {
                formStatusAlert: {
                  alert: false,
                  type: prevState.formStatusAlert.type,
                  alertMsg: "",
                  showSuccessfulSubmit: true
                }
              };
            });

          }
        );
        //Now we have asked firebase to submit and we will wait async.
        //Let us show a waiting alert to the user
        this.setState(prevState => {
          return {
            formStatusAlert: {
              alert: true,
              type: "info",
              alertMsg: "جاري اضافة المنتج ...",
              showSuccessfulSubmit: false
            }
          };
        });
      } else
        //if submission fails show the alert message
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
      this.setState({
        formStatusAlert: {
          alert: true,
          type: "danger",
          alertMsg:
            "حدث خطأ غير معروف. نرجو ابلاغ الصيانة بالخطأ التالي: " + err,
            showSuccessfulSubmit: false
        }
      });
    }
  }

  //converts indian digits into arabic ١ -> 1, ٢ -> 2 ...etc
  parseArabic(str) {
    return Number(
      str
        .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(d) {
          return d.charCodeAt(0) - 1632;
        })
        .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(d) {
          return d.charCodeAt(0) - 1776;
        })
    );
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

    let firstTime = false;
    let valid = false;
    let formError = "";

    switch (name) {
      case "name":
        valid = value.length <= 30 && value.length > 2; //match(/^([\w\W\d]{2,20})$/i);
        formError = valid
          ? ""
          : " يجب أن يكون طول اسم المنتج بين ثلاثة أحرف و ٣٠ حرف";
        break;
      case "desc":
        valid = value.length <= 200 && value.length >= 15; //match(/^([\w\W\d]{2,20})$/i);
        formError = valid
          ? ""
          : " يجب أن يكون طول وصف المنتج بين خمسة عشر حرفا  و ٢٠٠ حرف";
        break;
      case "factory":
        valid = value.length <= 100; //match(/^([\w\W\d]{2,20})$/i);
        formError = valid ? "" : " يجب أن يكون طول اسم المصنع أقل من ١٠٠ حرف";
        break;
      case "price":
        let price = !isNaN(this.parseArabic(value))
          ? +this.parseArabic(value)
          : -1;
        valid = price > 0;
        value = valid ? price : value;
        formError = valid ? "" : " يجب أن يكون سعر المنتج رقم أكبر من الصفر";
        break;
      case "length":
        let length = !isNaN(this.parseArabic(value))
          ? +this.parseArabic(value)
          : -1;
        valid = length > 0 && length < 10000;
        value = valid ? length : value;
        formError = valid
          ? ""
          : "  يجب أن يكون طول المنتج رقم أكبر من الصفر وأصغر من ١٠٠٠٠ سم";
        break;
      case "width":
        let width = !isNaN(this.parseArabic(value))
          ? +this.parseArabic(value)
          : -1;
        valid = width > 0 && width < 10000;
        value = valid ? width : value;
        formError = valid
          ? ""
          : " يجب أن يكون عرض المنتج رقم أكبر من الصفر وأصغر من ١٠٠٠٠ سم";
        break;
      case "height":
        let height = !isNaN(this.parseArabic(value))
          ? +this.parseArabic(value)
          : -1;
        valid = height > 0 && height < 10000;
        value = valid ? height : value;
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
          this.state.files.length > 0
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

  resetState() {
    this.setState(initState);
  }

  render() {
    console.log(this.state)
    return (
      <form>
        <ImageUploader
          onDrop={this.handleOnDrop}
          multipleFiles={this.multipleFiles}
          files={this.state.files}
        />

        <FieldGroup
          id="formControlsProductName"
          type="text"
          label="الاسم"
          placeholder="أدخل اسم المنتج (مثلا: طقم كنب، بانيو حجري ...الخ)"
          onChange={this.handleChange}
          name="name"
          value={this.state.name.Name}
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

        <Button type="submit" onClick={this.handleSubmit} className="btn-block">
          أضف المنتج
        </Button>

        <Collapse in={this.state.formStatusAlert.alert}>
          <Alert
            bsStyle={this.state.formStatusAlert.type}
            onDismiss={this.handleAlertDismiss}
          >
            {this.state.formStatusAlert.alertMsg}
          </Alert>
        </Collapse>
        <Modal
          show={this.state.formStatusAlert.showSuccessfulSubmit}
          style={{top: 300}}
          container={this}
          aria-labelledby="contained-modal-title"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">  تمت اضافة المنتج بنجاح</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Link to="/newproduct">
            <Button onClick={this.resetState}>اضافة منتج جديد</Button>
            </Link>
            <Link to="/">
            <Button>العودة للصفحة الرئيسية</Button>
            </Link>
          </Modal.Body>
        </Modal>

      </form>
    );
  }
}

export default ProductForm;
