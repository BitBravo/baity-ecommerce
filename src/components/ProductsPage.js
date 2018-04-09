import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DropdownButton,
  MenuItem,
  Col,
  Row,
  ButtonToolbar,
  NavDropdown,
  Button,
  Image,
  Carousel,
  Grid,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import ProductList from './ProductList';
import styled from 'styled-components'
import traditionalkitchen from '../assets/img/traditionalkitchen.jpg';
import bedroom from '../assets/img/bedroom.jpg';
import livingroom from '../assets/img/livingroom.jpg';
import Categories from './Categories';

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
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  }
`;

const ImageContainer = styled.div`
width: 100%;
height: 100%;
`;
const Select = styled.select`
background-color: rgb(26, 156, 142);
color:white;
font-size:20px;
padding-right:10px;
border:0;
width:100%;
height:60px;
border-radius: 0;
-webkit-appearance: none;
@media only screen and (max-width: 767px) {
  font-size:11px;
  height:30px;
  padding-right:5px;
}
`
const Filter = styled.div`
margin-top:20px;
@media only screen and (max-width: 767px){
  position:fixed;
  margin-top:0;
  top:30px;
  z-index:1;
  background-color:white;
  width:100%;

}
`
const PaddingDiv = styled.div`
  padding-right: 0px;
  padding-top: 20px;
  padding-left: 0;
  padding-bottom: 0;
  @media only screen and (max-width: 767px) {
    display:inline-block;
    width:25%;
    padding-top:25px;
    padding-left:3px;
    padding-bottom: 2px;
  z-index:1000;}
`;
const CarouselDiv = styled(Col)`
padding-left:30px;
padding-right:15px;
margin-top:40px;
@media only screen and (max-width: 767px) {
  padding:0;
`

const DepartmentList = [
  "صالات",
  "مجالس",
  "غرف النوم",
  "مطابخ وأواني",
  "غرف الطعام",
  "دورات المياه",
  "الأثاث",
  "المخازن",
  "جلسات خارجية",
  "أرضيات",
  "غرف أطفال",
  "مكاتب منزلية"
];

const Style = [
  "كلاسيكي",
  "معاصر",
  "تقليدي",
  "ريفي",
  "اسكندنافي",
  "مكتبي",
  "جلسات خارجية",
  "تراثي",
  "أمريكي",
  "أوروبي"
];

const Price = [
  "أقل من 100",
  "100-500",
  "500-1000",
  "1000-3000",
  "3000-5000",
  "أعلى من 5000"
];

var categoryList = ["حدد القسم أولا"];

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

const DepOption = (list) => (
  DepartmentList.map(opt => {
    return (
      <option key={opt} value={opt}>
        {opt}
      </option>
    );
    })
)

const StyleOption = (list) => (
  Style.map(opt => {
    return (
      <option key={opt} value={opt}>
        {opt}
      </option>
    );
    })
)

const PriceOption = (list) => (
  Price.map(opt => {
    return (
      <option key={opt} value={opt}>
        {opt}
      </option>
    );
    })
)

var CategoriesOption = (list) => (
  categoryList.map(opt => {
    return (
      <option key={opt} value={opt}>
        {opt}
      </option>
    );
    })
)

class ProductsPage extends Component {

  constructor() {
    super();
    this.state = {
      value: "",
      filter: [],
      dept: "",
      cat: "",
      price: "",
      priceRange: {upper: "", lower:""},
      style: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.getList = this.getList.bind(this);
  }

  handleChange(event) {
    if(event.target.id === "category") {
      if (this.state.dept === ""){
        this.setState({
          cat: "",
        });
        return;
      }
    }else if(event.target.id === "department"){
    if (event.target.value === "")
      this.setState({
        cat: "",
      });
    }
    var obj={upper: "", lower:""};
    switch (event.target.id) {
      case 'price':
        switch (event.target.value) {
          case 'أقل من 100': obj = {upper: 100, lower: ""}; break;
          case '100-500': obj = {upper: 500, lower: 100}; break;
          case '500-1000': obj = {upper: 1000, lower: 500}; break;
          case '1000-3000': obj = {upper: 3000, lower: 1000}; break;
          case '3000-5000': obj = {upper: 5000, lower: 3000}; break;
          case 'أعلى من 5000': obj = {upper: "", lower: 5000}; break;
        }; break;
      default: obj = event.target.value;
    }
    var filter = this.setFilter()
    //filter = this.setFilter(filter, filterType, filterValue)
    switch (event.target.id) {
      case "department":
        filter[0] = {key:'department', value: event.target.value};
        if(event.target.value === "") filter[2] = {key:'category', value: ""};
        this.setState({
            dept: event.target.value
          }); break;
      case "style":
        filter[1] = {key:'style', value: event.target.value}
        this.setState({
            style: event.target.value
          }); break;
      case "category":
        filter[2] = {key:'category', value: event.target.value}
        this.setState({
          cat: event.target.value,
        }); break;
      case "price":
        filter[3] = {key:'price', value: obj}
        this.setState({
          price: event.target.value,
          priceRange: obj
        }); break;

    }
    this.setState({filter: filter});

  }

  getList(){
    if (this.state.dept === "")
      categoryList = ["حدد القسم أولا"]
    else {
      var CategoryList = [];
      switch (this.state.dept) {
        case "صالات": CategoryList = Categories.CategoryListLivingroom; break;
        case "مجالس": CategoryList = Categories.CategoryListSettingroom; break;
        case "غرف النوم": CategoryList = Categories.CategoryListBedroom; break;
        case "مطابخ وأواني": CategoryList = Categories.CategoryListKitchen; break;
        case "غرف الطعام": CategoryList = Categories.CategoryListDining; break;
        case "دورات المياه": CategoryList = Categories.CategoryListBath; break;
        case "الأثاث": CategoryList = Categories.CategoryListFurn; break;
        case "المخازن": CategoryList = Categories.CategoryListStorage; break;
        case "جلسات خارجية": CategoryList = Categories.CategoryListGarden; break;
        case "أرضيات": CategoryList = Categories.CategoryListFloors; break;
        case "غرف أطفال": CategoryList = Categories.CategoryListKids; break;
        case "مكاتب منزلية": CategoryList = Categories.CategoryListOffice; break;
        default:
        break;
      }
      categoryList = CategoryList;
    }
  }

  setFilter(){
    var filter = [];
    console.log("dept " + this.state.dept)
    console.log("style " + this.state.style)
    console.log("price " + this.state.priceRange)

    filter.push({key:'department', value: this.state.dept})
    filter.push({key:'style', value: this.state.style})
    filter.push({key:'category', value: this.state.cat})
    filter.push({key:'price', value: this.state.priceRange})
    return filter;
  }

  // setFilter(filter, filterType, filterValue){
  //   console.log("filter.length " + filter.length)
  //
  //   filter = filter.filter(function(obj){ return obj.key !== filterType;} )
  //   if (filterValue === ""){    console.log("filter.length " + filter.length)
  //
  //     return filter;
  //   }
  //   else{
  //     filter.push({key:filterType, value: filterValue})
  //     console.log("filter.length " + filter.length)
  //
  //     return filter;
  //   }
  // }


  render() {
    return (
      <div>
        <Grid>
          <Row style={{display: 'flex', flexWrap: 'wrap'}}>
            <Col sm={4} xs={12} style={{padding:'2px'}}>
          <Filter >

            <PaddingDiv>
            <div className="inner-addon left-addon ">
              <i className="glyphicon glyphicon-plus white plus"></i>
                <Select name="selectThis" id="department" onChange={this.handleChange} value={this.state.dept}>
                  <option value="">القسم</option>
                  <DepOption list={DepartmentList} />
                </Select>
            </div>
            </PaddingDiv>

            <PaddingDiv>
            <div className="inner-addon left-addon ">
              <i className="glyphicon glyphicon-plus white plus"></i>
                <Select name="selectThis" id="category" onChange={this.handleChange} value={this.state.cat}>
                  <option value="">التصنيف</option>
                  {this.state.dept === ""
                  ? <option value="">حدد القسم أولا</option>
                  : <CategoriesOption list={this.getList()} />
                  }
                </Select>
            </div>
            </PaddingDiv>

            <PaddingDiv>
            <div className="inner-addon left-addon ">
              <i className="glyphicon glyphicon-plus white plus"></i>
                <Select name="selectThis" id="price" onChange={this.handleChange} value={this.state.price}>
                  <option value="">السعر</option>
                  <PriceOption list={Price} />
                </Select>
            </div>
            </PaddingDiv>

                {
          //       <PaddingDiv>
          //       <div className="inner-addon left-addon ">
          // <i className="glyphicon glyphicon-plus white plus"  ></i>
          //       <Select name="selectThis" id="selectThis">
          //           <option value="">بلد الصنع</option>
          //           <option value=".option1">Option 1</option>
          //           <option value=".option2">Option 2</option>
          //           <option value=".option3">Option 3</option>
          //           <option value=".option4">Option 4</option>
          //       </Select>
          //       </div>
          //       </PaddingDiv>
              }
                <PaddingDiv>
                <div className="inner-addon left-addon ">
          <i className="glyphicon glyphicon-plus white plus" ></i>
          <Select name="selectThis" id="style" onChange={this.handleChange} value={this.state.style}>
                    <option value="">الطراز</option>
                    <StyleOption list={Style} />
                </Select>
                </div>
                </PaddingDiv>
       </Filter>
   </Col>

<CarouselDiv sm={8} xs={12} >

  <Carousel  indicators={false}>
      <Carousel.Item>
        <div>
        <ImageContainer>
            <ImageDiv>
              <PreviewImg  src= {traditionalkitchen} />
        </ImageDiv>
        </ImageContainer>
        <Carousel.Caption className="hero">
          <h2>غير مزاجك واجعل منزلك أكثر جاذبية </h2>
        </Carousel.Caption>

        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div>
        <ImageContainer>
            <ImageDiv>
              <PreviewImg  src= {livingroom}/>
        </ImageDiv>
        </ImageContainer>
        <Carousel.Caption className="hero">
          <h2>غير مزاجك واجعل منزلك أكثر جاذبية </h2>
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div>
      <ImageContainer>
            <ImageDiv>
              <PreviewImg src={bedroom}/>

        </ImageDiv>
        </ImageContainer>
        <Carousel.Caption className="hero">
          <h2>غير مزاجك واجعل منزلك أكثر جاذبية </h2>
        </Carousel.Caption>
        </div>
      </Carousel.Item>

    </Carousel>
 </CarouselDiv>
   </Row>
   </Grid>
    {console.log("filter " + Object.keys(this.state.filter))}
    {console.log("filter " + Object.values(this.state.filter))}
   <ProductList thisUserOnly={false} filter={this.state.filter}/>


	</div>

  );}}

  export default ProductsPage;
