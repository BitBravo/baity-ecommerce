import React, { Component } from "react";
import { Image } from "react-bootstrap";
import ProductList from './ProductList';
import livingroom from '../assets/img/livingroom.jpg';
import firebase from "firebase";
import { app, base, database, storage } from "../base";
import FirebaseServices from './FirebaseServices'

// function MyAccount(props) {
//     return (<ProductList thisUserOnly={true} currentUser={props.currentUser}/>);
// }

class MyAccount extends Component {

  constructor(props) {
    super(props);
    this.profId = this.props.match.params.id;

    this.state = {
      profile: {},
      loading: true,
      errorHandling: {
        showError: false,
        errorMsg: "error"
      },
      uploadProgress: {
        show: false,
        percentage: 0
      },
      submitStatus: {
        showSubmitModal: false,
        submitSuccessful: false,
        errorMsg: ''
      }
    };

  }

  componentWillMount() {
    FirebaseServices.getProfessionalUserBusinessId(this.props.currentUser.uid,
      (businessId) => {
        if (businessId === '') {
          this.setState({ errorHandling: { showError: true, errorMsg: {message:'خطأ داخلي: لم يتم العثور على الشركة '} } });
        } else {
          this.bussRef = base.syncState(`${FirebaseServices.BUSINESSES_PATH}/${businessId}`, {
            context: this,
            state: "profile",
            then(data) {
              this.setState({ loading: false });
            },
            onFailure(error) {
              this.setState({ errorHandling: { showError: true, errorMsg: error } });
            }
          })
        }//else
    }, (error) => {
      this.setState({ errorHandling: { showError: true, errorMsg: error } });
    });
  }

  componentWillUnmount() {
    this.bussRef && base.removeBinding(this.bussRef);
  }

  render() {
    return (
      <div>
        <MyAccountInfo />
        <ProductList thisUserOnly={true} currentUser={props.currentUser}/>
        <IdeasList />
      </div>
    );
  }
}


export default MyAccount;
