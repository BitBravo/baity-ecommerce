import React, { Component } from "react";
import { Modal, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { base } from "config/base";
import FirestoreServices from 'services/FirestoreServices'
import Loading from "commons/Loading";
import styled from 'styled-components'
import IdeaForm from "components/IdeaForm";

const StyledProductForm = styled.div`
margin-top: 10px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
margin-left: auto;
margin-right: auto;
border-radius: 5px;
width: 90%;
padding: 25px;
color: #3C3C3C;
background: rgb(255,255,255);
animation-name: slideDown;
-webkit-animation-name: slideDown;
animation-duration: 1s;
-webkit-animation-duration: 1s;
animation-timing-function: ease;
-webkit-animation-timing-function: ease;
visibility: visible !important;
`;

const ErrorMessage = (props) =>
  <div>
    <Modal show={true} style={{ top: 300 }}>
      <Modal.Header>حدث خطأ غير معروف</Modal.Header>
      <Modal.Body>

        <Alert bsStyle="danger">
          {props.message}
        </Alert>
        <Link to="/">
          <Button>العودة للصفحة الرئيسية</Button>
        </Link>
      </Modal.Body>
    </Modal>
  </div>

function getStateForNewIdea() {
  return {
    isNewIdea: true,
    idea: null,
    loading: false,
    errorHandling: {
      showError: false,
      errorMsg: "error"
    },
  }
}

function getStateForUpdateIdea() {
  return {
    idea: {},
    loading: true,
    errorHandling: {
      showError: false,
      errorMsg: "error"
    },
    isNewIdea: false,
    isUpdated: false
  };
}

class IdeaUpdater extends Component {
  constructor(props) {
    super(props);
    console.log(`${this.constructor.name}.constructor`);
    //if we updating an existing idea
    if (this.props.match.params.id) {
      this.ideaId = this.props.match.params.id;

      this.state = getStateForUpdateIdea();
    } else {
      this.state = getStateForNewIdea();
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateIdea = this.updateIdea.bind(this);
    // this.formPercentageViewer = this.formPercentageViewer.bind(this)
    // this.formSuccessHandler = this.formSuccessHandler.bind(this)
  }

  componentWillMount() {
    const { state: { currentUser } } = this.props;

    if (!this.state.isNewIdea) {
      this.ideasRef = base.bindDoc(`${FirestoreServices.IDEAS_PATH}/${this.ideaId}`, {
        context: this,
        state: "idea",
        then(data) {
          this.setState({ loading: false });
        },
        onFailure(error) {
          this.setState({ errorHandling: { showError: true, errorMsg: error } });
        }
      });
    }
    //add owner to product
    FirestoreServices.readDBRecord('profUser', currentUser.uid)
      .then(val => {
        console.log(val.name)
        this.name = val.name
      })
  }

  componentWillUnmount() {
    console.log(`${this.constructor.name}.componentWillUnmount`);
    !this.state.isNewIdea && this.ideasRef && base.removeBinding(this.ideasRef);
  }

  /**
   * This should be called if user clicked on 'add new idea' while viewing the form.
   * Not sure if there is another case where this method will be called
   */
  componentWillReceiveProps(nextProps) {
    console.log(`${this.constructor.name}.componentWillReceiveProps`);
    console.log('nextProps')
    console.log(nextProps)
    //if there is no id in the url (which means a new idea)
    if (!nextProps.match.params.id) {
      //since updating current idea was inturrupted,
      !this.state.isNewIdea && this.ideasRef && base.removeBinding(this.ideasRef);
      this.ideaId = undefined
      this.setState(getStateForNewIdea());
    }
  }

  componentWillUpdate() {
    console.log(`${this.constructor.name}.componentWillUpdate`);
  }


  addImages(ideaId, newImages, formPercentageViewer) {
    return FirestoreServices.addIdeaImages(ideaId, newImages, formPercentageViewer, this.props.currentUser.uid)
  }

  addIdea(idea) {
    //add owner to idea
    idea = { ...idea, owner: this.props.currentUser.uid, businessName: this.name };
    return FirestoreServices.insertIdea(idea);//returns a promise resolved with idea ID
  }

  updateIdea(newIdeaData) {
    return FirestoreServices.updateIdea(newIdeaData, this.ideaId);//returns a promise resolved with idea ID
  }

  handleSubmit(idea, newImages, formPercentageViewer) {
    if (this.state.isNewIdea) {
      return this.addIdea(idea)
        .then((ideaId) => this.addImages(ideaId, newImages, formPercentageViewer))
        .catch((error) => {
          console.log('could not insert idea or upload images');
          console.log(`ERROR: code: ${error.code}, message:${error.message}`);
          throw error
        })
    } else {
      return this.updateIdea(idea)
        .then(() => {
          this.setState({ isUpdated: true });
          return this.addImages(this.ideaId, newImages, formPercentageViewer)
        })
        .catch((error) => {
          console.log('could not update idea or upload images');
          console.log(`ERROR: code: ${error.code}, message:${error.message}`);
          throw error
        })
    }
  }

  deleteImageFromDB(imageUrl) {
    return FirestoreServices.deleteIdeaImage(imageUrl, this.ideaId)
  }

  render() {
    console.log(`${this.constructor.name}.render`);
    if (this.state.loading && !this.state.errorHandling.showError)
      return <Loading />;
    if (this.state.errorHandling.showError)
      return (
        <ErrorMessage message={this.state.errorHandling.errorMsg.message} />

      );
    if (!this.state.loading && !this.state.showError)
      return (
        <StyledProductForm>
          <IdeaForm
            isNewIdea={this.state.isNewIdea}
            idea={this.state.idea}
            onSubmit={this.handleSubmit.bind(this)}
            currentUser={this.props.currentUser}
            deleteImageFromDB={this.deleteImageFromDB.bind(this)}
            isUpdated={this.state.isUpdated}
          />
        </StyledProductForm>
      );
  }
}

export default IdeaUpdater;
