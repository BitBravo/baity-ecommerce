import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";
import ImageUploader from "./ImageUploader";

function FieldGroup({ id, label, help, validationState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  );
}

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: "",
      productCat: "",
      productDept: "",
      productDesc: "",
      productFactory: "",
      productHeight: "",
      productLength: "",
      productWidth: "",
      productPrice: "",
      formErrors: {
        productName: "",
        productCat: "",
        productDept: "",
        productDesc: "",
        productFactory: "",
        productHeight: "",
        productLength: "",
        productWidth: "",
        productPrice: ""
      },
      productNameValid: false,
      productCatValid: false,
      productDeptValid: false,
      productDescValid: false,
      productFactoryValid: false,
      productHeightValid: false,
      productLengthValid: false,
      productWidthValid: false,
      productPriceValid: false,
      formValid: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
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
    const name = e.target.name;
    const value = e.target.value;
    let newState = {};
    newState[name] = value;

    this.setState(newState, () => {
      this.validateField(name, value);
    });
  }
 
  

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let productNameValid = this.state.productNameValid;
    let productCatValid = this.state.productCatValid;
    let productDeptValid = this.state.productDeptValid;
    let productDescValid = this.state.productDescValid;
    let productFactoryValid = this.state.productFactoryValid;
    let productHeightValid = this.state.productHeightValid;
    let productLengthValid = this.state.productLengthValid;
    let productWidthValid = this.state.productWidthValid;
    let productPriceValid = this.state.productPriceValid;
    switch (fieldName) {
      case "productName":
      productNameValid = value.length < 30 && value.length > 2; //match(/^([\w\W\d]{2,20})$/i);
        fieldValidationErrors.productName = productNameValid ? "" : " يجب أن يكون طول اسم المنتج بين حرفين و ٣٠ حرف";
        break;
        case "productPrice":
         let productPrice = !isNaN(value)? +value : -1 ;
         productPriceValid = productPrice > 0;
          fieldValidationErrors.productPrice = productPriceValid ? "" : " يجب أن يكون سعر المنتج رقم أكبر من الصفر";
          break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        productNameValid: productNameValid,   
        productCatValid:         productCatValid,
        productDeptValid:         productDeptValid,
        productDescValid:         productDescValid,
        productFactoryValid:         productFactoryValid,
        productHeightValid:         productHeightValid,
        productLengthValid:         productLengthValid,
        productWidthValid:         productWidthValid,
        productPriceValid:        productPriceValid
        
      }, () => {
      this.validateForm
    }
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.productNameValid &&
        this.state.productCatValid &&
        this.state.productDeptValid &&
        this.state.productDescValid &&
        this.state.productFactoryValid &&
        this.state.productHeightValid &&
        this.state.productLengthValid &&
        this.state.productWidthValid &&
        this.state.productPriceValid
    });
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
          name="productName"
          value={this.state.productName}
          help={this.state.formErrors.productName}
          validationState={this.state.productNameValid? "success" : "error"}
        />
        
        
        <FieldGroup
          id="formControlsProductPrice"
          type="text"
          label="السعر"
          placeholder="أدخل السعر"
          onChange={this.handleChange}
          name="productPrice"
          value={this.state.productPrice}
          help={this.state.formErrors.productPrice}
          validationState={this.state.productPriceValid? "success" : "error"}
        />
        <FieldGroup
          id="formControlsProductLength"
          type="text"
          label="الطول"
          placeholder="أدخل الطول بال سم"
          onChange={this.handleChange}
          name="productLength"
          value={this.state.productLength}
        />
        <FieldGroup
          id="formControlsProductWidth"
          type="text"
          label="العرض"
          placeholder="أدخل العرض بال سم"
          onChange={this.handleChange}
          name="productWidth"
          value={this.state.productWidth}
        />
        <FieldGroup
          id="formControlsProductHeight"
          type="text"
          label="الارتفاع"
          placeholder="أدخل الارتفاع بال سم"
          onChange={this.handleChange}
          name="productHeight"
          value={this.state.productHeight}
        />
        <FieldGroup
          id="formControlsProductFactory"
          type="text"
          label="اسم المصنع"
          placeholder="أدخل اسم المصنع"
          onChange={this.handleChange}
          name="productFactory"
          value={this.state.productFactory}
        />
        <FormGroup controlId="formControlsProductDesc">
          <ControlLabel>وصف المنتج</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="ادخل وصف المنتج"
            onChange={this.handleChange}
            name="productDesc"
            value={this.state.productDesc}
          />
        </FormGroup>

        <FieldGroup
          id="formControlsProductDept"
          type="text"
          label="القسم"
          placeholder="أدخل القسم (مثلا: صالة، مطبخ، غرفة نوم ...الخ)"
          onChange={this.handleChange}
          name="productDept"
          value={this.state.productDept}
        />
        <FieldGroup
          id="formControlsProductCat"
          type="text"
          label="الصنف"
          placeholder="أدخل الصنف (مثلا: طقم كنب، أدوات صحية ...الخ)"
          onChange={this.handleChange}
          name="productCat"
          value={this.state.productCat}
        />
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
