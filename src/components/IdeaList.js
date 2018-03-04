import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import IdeaBrief from "./IdeaBrief";
import Loading from './Loading'
import {MdWeekend} from 'react-icons/lib/md';
import styled from 'styled-components'
import FirebasePaginator from './firebase-pag';
import InfiniteScroll from 'react-infinite-scroll-component';


const Button = styled.button`
width:180px;
@media only screen and (max-width: 767px) {
  height: 40px;
  width:100%;
`;
const PAGE_SIZE = 3;
var options = {
  pageSize: PAGE_SIZE,
  finite: true,
  retainLastPage: false
};
var paginator;

class IdeaList extends Component{
  constructor() {
    super();
    this.state = {
      ideas: {},
      extraIdeas: [],
      loading: true,
      firstTime: true,
      page: 0
    };
  }

  componentWillMount() {
    this.listToArray = this.listToArray.bind(this)
    this.FirebasePaginator = this.firebasePaginator.bind(this, ref)
    this.forward = this.forward.bind(this)
    this.firebasePaginatorFiltering1 = this.firebasePaginatorFiltering.bind(this, ref)
    this.forwardFiltring = this.forwardFiltring.bind(this)

    //FirebaseServices.indexingIdea();

    if (this.props.thisUserOnly){
      if(this.props.shortList){
      this.ideassRef = base.syncState(FirebaseServices.IDEAS_PATH, {
        context: this,
        state: "ideas",
        queries: {
          orderByChild: 'owner',
          limitToLast: 3,
          equalTo: this.props.currentUser.uid
        },
        then(data) {
          this.setState({loading: false})
        },
        onFailure(error) {
        this.setState({errorHandling: {showError: true, errorMsg: error}});
        }
      });
  } else {
      var owner = this.props.currentUser.uid
      var ref = FirebaseServices.ownerIdea.child(owner)
      paginator = new FirebasePaginator(ref, options)
      this.firebasePaginatorFiltering(ref)
  }
  } else {
    //     this.ideasRef = base.syncState(FirebaseServices.IDEAS_PATH, {
    //       context: this,
    //       state: "ideas",
    //       then(data) {
    //       this.setState({loading: false})
    //       },
    //       onFailure(error) {
    //       this.setState({errorHandling: {showError: true, errorMsg: error}});
    //       }
    // });
    var ref = FirebaseServices.ideas
    paginator = new FirebasePaginator(ref, options)

    this.firebasePaginator(ref)
  }

  }

  componentWillUnmount() {
    this.ideasRef && base.removeBinding(this.ideasRef);
    if (paginator) {
      paginator.off('value', () => {
      });
    }
  }

  firebasePaginator(ref) {
    var itemsList = [];
    var handler = (() => {
      this.setState({
        ideas: paginator.collection,
        loading: false,
        firstTime: false
      });
      this.listToArray()
    });
    paginator.on('value', handler);
  }

  listToArray() {
    const ideas = this.state.ideas
    const ideaIds = Object.keys(ideas);

    var arr = [];
    ideaIds.reverse().map(id => {
      const idea = ideas[id];
      arr.push(idea)
    });
    var list = [...this.state.extraIdeas, ...arr.slice()]
    this.setState({extraIdeas: list, loading: false})

  }

  firebasePaginatorFiltering(ref) {
    var itemsList = [];
    var handler = ( () => {
      if (this.state.firstTime){
        const ideaIds = Object.keys(paginator.collection);
        // array is sorted in assending order
        var last = ideaIds[ideaIds.length]

          this.productsRef = base.bindToState(FirebaseServices.IDEAS_PATH, {
            context: this,
            state: "ideas",
            queries: {
              orderByChild: 'owner',
              equalTo: this.props.currentUser.uid,
              limitToLast: PAGE_SIZE
            },
            then(data) {
              this.setState({loading: false, firstTime: false})
              this.listToArray();
            },
            onFailure(error) {
            this.setState({errorHandling: {showError: true, errorMsg: error}});
            }
          });

    }else {
      var newPage = this.state.page + 1;
      var ideaIds = (Object.keys(paginator.collection))
      console.log(ideaIds.length)
      if (ideaIds.length > 0){
        var newIdeas = {}
        const listPromises = ideaIds.map(id => {
          return FirebaseServices.ideas.child(id).once('value', snapshot => {
            snapshot.val()
            newIdeas = [...newIdeas, snapshot.val()]
          })
        });

        const results = Promise.all(listPromises)
        results.then((snapshot) => {
          this.setState({ideas: newIdeas, page: newPage, loading: false})
          this.listToArray();

        })//results.then
      } //newProductIds.length
    }//else
  }) //handler
    paginator.on('value', handler);
  }

  forward(){
    paginator.previous()
    .then(() => {
    });
  }

  forwardFiltring(){
    paginator.previous()
    .then(() => {
  });

  }

  render() {
    const ideas = this.state.ideas;
    const ideaIds = Object.keys(ideas);

      if (this.state.loading)
      return(
       <Loading />
      )
    else if (this.props.shortList){
      return (

        <Grid style={{backgroundColor:"white"}}>
         {this.props.group === 'prof'
        ?<Row   style={{display: 'flex', flexWrap: 'wrap'}}>
        <Col xs={12}  lg={12} >
        <hr style={{marginBottom: '30px'}}/>
        <Col xs={5} md={3} lg={2} >
        <Link to={`/newidea`}>
            <Button>إضافة فكرة<MdWeekend className="icons"/></Button>
          </Link>
          </Col>
          <Col xs={7} md={9} lg={10} >
          <Link to={`/myideas`}>
          <h2 style={{color:'rgb(26,156,142)'}}>أفكاري</h2>
          </Link>
          </Col>
          </Col>
      </Row>
         :<Row style={{display: 'flex', flexWrap: 'wrap'}}>
           <Link  to={`/favideas`}>
           <h2 style={{color:'rgb(26,156,142)',padding:"10px"}}>الأفكار المفضلة</h2>
           </Link >
            </Row>
          }
          <Row style={{display: 'flex', flexWrap: 'wrap'}}>
          <Col xs={12}  lg={12} >
          {ideaIds.length < 1
          ? <h4 style={{textAlign:'center'}}>لم تقم باضافة منتجات، إبدأ الان</h4>
          : null}
            {ideaIds.map(id => {
              const idea = ideas[id];
              return <IdeaBrief key={id} idea={idea} />;
            })}
            </Col>
          </Row>
        </Grid>

  );
  } else {
    var newIdeas = this.state.extraIdeas.slice()

    return (
       <div style={{paddingTop: "30px"}}>
      <Grid>
        <Row style={{display: 'flex', flexWrap: 'wrap'}}>
        
        <Col xs={12} md={12}>
        <InfiniteScroll style={{overflow:'none'}} 
          hasMore={!paginator.isLastPage}
          next={this.props.thisUserOnly? this.forwardFiltring : this.forward} 
        >
        {newIdeas.length < 1
        ? <h5 style={{textAlign:'center'}}>لم تقم باضافة أفكار، إبدأ الان</h5>
        : null}
          {newIdeas.map((idea, index) => {
            return <IdeaBrief key={idea.id} idea={idea} />;
          })}
           </InfiniteScroll>

          </Col>
        </Row>
      </Grid>
    </div>
  );
  }
  }
}

export default IdeaList;
