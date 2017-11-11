import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";
import ImageUploader from "./ImageUploader";

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


const SelectGroup = ({id, label, ...props}) => (  
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
          <option
            key={opt}
            value={opt}>{opt}</option>
        );
      })}
    </FormControl>
  </FormGroup>
);


class ProductForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      DepartmentList: ["صالة", "غرف نوم", "مطابخ", "مجلس", "دورات مياه"],
      CategoryList: ["طاولة طعام", " طقم كنب", "ورق جدران", "طاولة شاي", "أدوات صحية"],
      name: {
        value: "",
        valid: false,
        //indicates if it is the first time to edit the field. If so do not show validation error msgs
        firstTime: true,
        formError: ""
      } ,
      cat: {
        value: "",
        valid: false,
        firstTime: true,
        formError: ""
      } ,
      dept: {
        value: "",
        valid: false,
        firstTime: true,
        formError: ""
      } ,
      desc: {
        value: "",
        valid: false,
        firstTime: true,
        formError: ""
      } ,
      factory: {
        value: "",
        valid: false,
        firstTime: true,
        formError: ""
      } ,
      height: {
        value: "",
        valid: false,
        firstTime: true,
        formError: ""
      } ,
      length: {
        value: "",
        valid: false,
        firstTime: true,
        formError: ""
      } ,
      width: {
        value: "",
        valid: false,
        firstTime: true,
        formError: ""
      } ,
      price: {
        value: "",
        valid: false,
        firstTime: true,
        formError: ""
      },
      formValid: false
      
      
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validationState = this.validationState.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
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
          valid = value.length < 30 && value.length > 2; //match(/^([\w\W\d]{2,20})$/i);
          formError = valid
          ? ""
          : " يجب أن يكون طول اسم المنتج بين حرفين و ٣٠ حرف";
      break;
      case "desc":
          valid = value.length < 200 && value.length > 15; //match(/^([\w\W\d]{2,20})$/i);
          formError = valid
         ? ""
         : " يجب أن يكون طول وصف المنتج بين خمسة عشر حرفا  و ٢٠٠ حرف";
      break;
      case "factory":
      valid = value.length < 100; //match(/^([\w\W\d]{2,20})$/i);
      formError = valid
        ? ""
        : " يجب أن يكون طول اسم المصنع أقل من ١٠٠ حرف";
      break;
      case "price":
        let price = !isNaN(value) ? +value : -1;
        valid = price > 0;
        formError = valid
          ? ""
          : " يجب أن يكون سعر المنتج رقم أكبر من الصفر";
        break;
        case "length":
        let length = !isNaN(value) ? +value : -1;
        valid = length > 0 && length < 10000;
        formError = valid
          ? ""
          : "  يجب أن يكون طول المنتج رقم أكبر من الصفر وأصغر من ١٠٠٠٠ سم";
        break;
        case "width":
        let width = !isNaN(value) ? +value : -1;
        valid = width > 0 && width < 10000;
        formError = valid
          ? ""
          : " يجب أن يكون عرض المنتج رقم أكبر من الصفر وأصغر من ١٠٠٠٠ سم";
        break;
        case "height":
        let height = !isNaN(value) ? +value : -1;
        valid = height > 0 && height < 10000;
        formError = valid
          ? ""
          : " يجب أن يكون ارتفاع المنتج رقم أكبر من الصفر وأصغر من ١٠٠٠٠ سم";
        break;
      default:
        break;
    }
    let newState = {[name]: {...this.state[name], valid, formError, value, firstTime}};
    
    //setState will shallow merge the new state with the current state
    this.setState(
      newState,
      () => {
        this.validateForm;
      }
    );
  }

  validateField(name, value) {
    
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.name.valid &&
        this.state.cat.valid &&
        this.state.dept.valid &&
        this.state.desc.valid &&
        this.state.factory.valid &&
        this.state.height.valid &&
        this.state.length.valid &&
        this.state.width.valid &&
        this.state.price.valid
    });
  }

  validationState(firstTimeFlag, validFlag) {
    if (firstTimeFlag)
      return null;
    else if (validFlag)
      return "success"
    else 
      return "error"
  }

  render() {
    return (
      <form
        style={{
          paddingRight: "100px",
          paddingLeft: "100px",
          paddingTop: "20px",
          paddingBottom: "20px"
        }}
      >
        <ImageUploader
          onDrop={this.props.onDrop}
          multipleFiles={this.props.multipleFiles}
          files={this.props.files}
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
          validationState={this.validationState(this.state.name.firstTime, this.state.name.valid)}
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
          validationState={this.validationState(this.state.price.firstTime, this.state.price.valid)}
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
          validationState={this.validationState(this.state.length.firstTime, this.state.length.valid)}
          
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
          validationState={this.validationState(this.state.width.firstTime, this.state.width.valid)}
          
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
          validationState={this.validationState(this.state.height.firstTime, this.state.height.valid)}
          
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
          validationState={this.validationState(this.state.factory.firstTime, this.state.factory.valid)}
          
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
          validationState={this.validationState(this.state.desc.firstTime, this.state.desc.valid)}
          
        />

        

        <SelectGroup controlId="formControlsProductDeptSelect"
          label="القسم"
          name='dept'
          placeholder={'اختر القسم الذي تنتمي له قطعة الأثاث '}
          onChange={this.handleChange}
          options={this.state.DepartmentList}
          selectedOption={this.state.dept.value} />

        <SelectGroup controlId="formControlsProductCatSelect"
          label="الصنف"
          name='cat'
          placeholder="أدخل الصنف (مثلا: طقم كنب، أدوات صحية ...الخ)"
          onChange={this.handleChange}
          options={this.state.CategoryList}
          selectedOption={this.state.cat.value} />

        
        
        <button
          type="submit"
          onClick={this.handleSubmit}
          className="btn btn-primary"
        >
          أضف المنتج
        </button>
      </form>
    );
  }
}

export default ProductForm;
