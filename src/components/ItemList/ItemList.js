import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { base } from 'config/base';
import FirestoreServices from 'services/FirestoreServices';
import FirestorePaginator from 'services/FirestorePaginator';
import ProductBrief from 'components/ProductBrief';
import IdeaBrief from 'components/IdeaBrief';
import BannerBrief from 'components/BannerBrief';
import Loading from 'commons/Loading';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import Product from 'assets/img/AddingProduct.png';
import orderList from 'config/itemOrder';

const IconImg = styled.img`
width:20px;
 height:20px;
 margin-right:20px;
 @media only screen and (max-width: 767px) {
  width:15px;
  height:15px;
  margin-right:2px;
 }`;
const DoubleTag = styled.div`
// margin-left: ;
// @media only screen and (max-width: 1200px) {
//   margin-left: -50px;
// }
// @media only screen and (max-width: 990px) {
//   margin-left: 0px;
// }
`;
const MoreButton = styled.button`
 background-color:transparent;
 border:1px solid rgb(26, 156, 142);
 color:rgb(26, 156, 142);
   width:100px;
   height: 30px;
   @media only screen and (max-width: 767px) {
     height: 20px;
     width:40px;
     font-size:10px;
   `;
const Button = styled.button`
font-size:15px;
float:left;
width:180px;
height:40px;
@media only screen and (max-width: 767px) {
  font-size:12px;
  height: 35px;
  width:70%;}
@media only screen and (max-width: 500px) {
  font-size:10px;
  height: 30px;
  width:90%;}
  `;

const repeatCount = (deviceFlag, pCount, iCount, bCount) => {
  const unitCount = deviceFlag ? { product: 8, idea: 5, banner: 3 } : { product: 1, idea: 1, banner: 1 };
  const reapeatProduct = pCount !== 0
    ? (() => {
      const originCount = pCount / unitCount.product;
      return originCount > parseInt(parseFloat(originCount), 10) ? (parseInt(parseFloat(originCount), 10) + 1) : originCount;
    })()
    : 0;
  const reapeatIdea = iCount !== 0
    ? (() => {
      const originCount = iCount / unitCount.idea;
      return originCount > parseInt(parseFloat(originCount), 10) ? (parseInt(parseFloat(originCount), 10) + 1) : originCount;
    })()
    : 0;
  const reapeatBanner = bCount !== 0
    ? (() => {
      const originCount = bCount / unitCount.banner;
      return originCount > parseInt(parseFloat(originCount), 10) ? (parseInt(parseFloat(originCount), 10) + 1) : originCount;
    })()
    : 0;
  // const reapeatBanner = bCount !== 0
  //   ? (() => {
  //     const originCount = bCount / list.filter(item => item.type === 'banner').length;
  //     return originCount > parseInt(parseFloat(originCount), 10) ? (parseInt(parseFloat(originCount), 10) + 1) : originCount;
  //   })()
  //   : 0;

  return Math.max(reapeatProduct, reapeatIdea, reapeatBanner);
};

const getItemDatas = (data) => {
  try {
    return data.itemData;
  } catch (e) {
    return {};
  }
};

const IteamArrange = (data) => {
  const { items, deviceFlag, adminViewFlag } = data;
  const itemKeys = Object.keys(items);
  const lastKey = [...itemKeys].pop();
  const unitCount = deviceFlag ? 16 : 3;
  const originCount = lastKey / unitCount;
  const orderArray = deviceFlag ? orderList.desktop : orderList.mobile;
  let repeatCounts = originCount > parseInt(parseFloat(originCount), 10) ? (parseInt(parseFloat(originCount), 10) + 1) : originCount;

  let productCount = 0; let ideaCount = 0; let bannerCount = 0;
  if (adminViewFlag) {
    repeatCounts = deviceFlag ? 3 : 16;
  }
  let indexCount = 0;
  return (
    Array.from({ length: repeatCounts }).map(
      () => orderArray.map((item, index) => {
        switch (item.type) {
          case 'product': {
            productCount++;
            indexCount++;
            return (
              <ProductBrief rowId={(indexCount - 1)} key={`product-${(productCount - 1)}-${index}`} product={getItemDatas(items[(indexCount - 1)])} styleWidth={item.width} adminViewFlag={adminViewFlag} />
            );
          }
          case 'idea': {
            ideaCount++;
            indexCount++;
            return (
              <IdeaBrief rowId={(indexCount - 1)} key={`idea-${(ideaCount - 1)}-${index}`} idea={getItemDatas(items[(indexCount - 1)])} styleWidth={item.width} adminViewFlag={adminViewFlag} />
            );
          }
          case 'banner': {
            switch (item.count) {
              case 1: {
                bannerCount++;
                indexCount++;
                return (
                  <BannerBrief rowId={(indexCount - 1)} key={`banner-${(bannerCount - 1)}-${index}`} banner={getItemDatas(items[(indexCount - 1)])} styleWidth={item.width} bannerType="right" adminViewFlag={adminViewFlag} />
                );
              }
              case 2: {
                bannerCount = 2 + bannerCount;
                indexCount += 2;
                return (
                  <DoubleTag className={`col-xs-12 col-sm-6 col-md-${item.width} wide-banner`}>
                    <BannerBrief rowId={(indexCount - 2)} key={`banner-${(bannerCount - 2)}-${index}`} banner={getItemDatas(items[(indexCount - 1)])} styleWidth={item.width} bannerType="top" adminViewFlag={adminViewFlag} />
                    <BannerBrief rowId={(indexCount - 1)} key={`banner-${(bannerCount - 1)}-${index}`} banner={getItemDatas(items[(indexCount - 1)])} styleWidth={item.width} bannerType="bottom" adminViewFlag={adminViewFlag} />
                  </DoubleTag>
                );
              }
              default:
                break;
            }
          }
          // eslint-disable-next-line no-fallthrough
          default:
            break;
        }
      }),
    )
  );
};

let paginator;
let hasMore = true;

class ItemList extends Component {
  constructor() {
    super();
    this.state = {
      products: {},
      extraProducts: [],
      ideas: {},
      extraIdeas: [],
      loading: true,
      firstTime: true,
      page: 0,
      filter: '',
      filterValue: '',
      owner: '',
      items: [],
    };
    this.businessProducts = this.businessProducts.bind(this);
    this.businessIdeas = this.businessIdeas.bind(this);
    this.getItems = this.getItems.bind(this);
  }

  componentWillMount() {
    this.getItems();
    this.listToArray = this.listToArray.bind(this);
    this.forward = this.forward.bind(this);
    this.productFirePaginator = this.productFirePaginator.bind(this);
    this.ideaFirePaginator = this.ideaFirePaginator.bind(this);
    this.setRangeFilter = this.setRangeFilter.bind(this);
    this.productCreateQuery = this.productCreateQuery.bind(this);
    this.ideaCreateQuery = this.ideaCreateQuery.bind(this);

    hasMore = true;
    if (this.props.thisUserOnly) {
      this.businessProducts(this.props);
      this.businessIdeas(this.props);
    } else {
      const productRef = FirestoreServices.products.orderBy('timestamp', 'desc');
      this.productFirePaginator(productRef);
      const ideaRef = FirestoreServices.ideas.orderBy('timestamp', 'desc');
      this.ideaFirePaginator(ideaRef);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getItems();
    // filter options will be recived as props
    if (nextProps.filter) {
      if (nextProps.filter.length > 0) {
        this.setState({ loading: true }); // start loading indcator
        let filterValues = nextProps.filter;
        console.log(`filters: ${filterValues.length}`);
        //  var ref = FirestoreServices.products
        this.productCreateQuery(filterValues);
        this.ideaCreateQuery(filterValues);
      } else {
        // filter was reset => no filteration
        if (nextProps.filter.length < 1) {
          // reset the product list by deleting all from the extraProducts
          const productRef = FirestoreServices.products.orderBy('timestamp', 'desc');
          this.productFirePaginator(productRef);
          const ideaRef = FirestoreServices.products.orderBy('timestamp', 'desc');
          this.ideaFirePaginator(ideaRef);
        }
      }
    } else if (nextProps.thisUserOnly) {
      this.businessProducts(nextProps);
      this.businessIdeas(nextProps);
    }
  }

  componentWillUnmount() {
    this.productsRef && base.removeBinding(this.productsRef);
    this.ideasRef && base.removeBinding(this.ideasRef);
  }

  setRangeFilter(ref, filter) {
    let pf = false;
    if (filter.value.upper !== '') { ref = ref.where(filter.key, '<=', filter.value.upper); pf = true; }
    if (filter.value.lower !== '') { ref = ref.where(filter.key, '>=', filter.value.lower); pf = true; }
    if (pf) ref = ref.orderBy('price', 'asc');
    return ref;
  }

  ideaCreateQuery(filter) {
    let ref = FirestoreServices.products;
    if (filter[0].value) {
      console.log(`filter 0 ${filter[0].value}`);
      ref = ref.where(filter[0].key, '==', filter[0].value);
    }
    if (filter[1].value !== '') {
      console.log(`filter 1 ${filter[1].value}`);
      ref = ref.where(filter[1].key, '==', filter[1].value);
    }
    if (filter[2].value !== '') {
      console.log(`filter 2 ${filter[2].value}`);
      ref = ref.where(filter[2].key, '==', filter[2].value);
    }
    console.log(`filter 3${filter[3].value}`);
    ref = this.setRangeFilter(ref, filter[3]).orderBy('timestamp', 'desc');
    this.firePaginator(ref);
  }

  productCreateQuery(filter) {
    let ref = FirestoreServices.products;
    if (filter[0].value) {
      console.log(`filter 0 ${filter[0].value}`);
      ref = ref.where(filter[0].key, '===', filter[0].value);
    }
    if (filter[1].value !== '') {
      console.log(`filter 1 ${filter[1].value}`);
      ref = ref.where(filter[1].key, '===', filter[1].value);
    }
    if (filter[2].value !== '') {
      console.log(`filter 2 ${filter[2].value}`);
      ref = ref.where(filter[2].key, '===', filter[2].value);
    }
    console.log(`filter 3${filter[3].value}`);
    ref = this.setRangeFilter(ref, filter[3]).orderBy('timestamp', 'desc');
    this.firePaginator(ref);
  }

  businessProducts(props) {
    console.log('BusinessProducts');
    let owner;
    if (props.user) {
      owner = props.currentUser;
      this.setState({ owner });
    } else {
      owner = props.currentUser.uid;
      this.setState({ owner });
    }

    // Here in the profile page or the company page
    if (props.shortList) {
      this.productsRef = base.bindCollection(FirestoreServices.PRODUCTS_PATH, {
        context: this,
        state: 'products',
        query: (ref) => {
          return ref.where('owner', '==', owner)
            .orderBy('timestamp', 'desc')
            .limit(3);
        },
        then() {
          // eslint-disable-next-line react/no-unused-state
          this.setState({ loading: false, firstTime: false });
        },
        onFailure(error) {
          this.setState({ errorHandling: { showError: true, errorMsg: error } });
        },
      });
    } else { // All products by a company
      const ref = FirestoreServices.products.where('owner', '==', owner).orderBy('timestamp', 'desc');
      this.firePaginator(ref);
    }
  }

  getItems() {
    FirestoreServices.readDBRecord('admin', 'home-items').then((result) => {
      this.setState({ items: result, loading: false });
      console.log(result);
    })
      .catch(() => {});
  }
  businessIdeas(props) {
    console.log('BusinessIdeas');
    const { currentUser } = this.props;
    if (!currentUser) return;

    let owner;
    if (props.user) {
      owner = currentUser;
      this.setState({ owner });
    } else {
      owner = currentUser.uid;
      this.setState({ owner });
    }
    console.log(FirestoreServices.IDEAS_PATH);

    // Here in the profile page or the company page
    if (props.shortList) {
      this.ideasRef = base.bindCollection(FirestoreServices.IDEAS_PATH, {
        context: this,
        state: 'ideas',
        query: (ref) => {
          return ref.where('owner', '==', owner)
            .orderBy('timestamp', 'desc')
            .limit(3);
        },
        then(data) {
          console.log(data);
          this.setState({ loading: false, firstTime: false });
        },
        onFailure(error) {
          console.log(error);
          this.setState({ errorHandling: { showError: true, errorMsg: error } });
        },
      });
    } else { // All products by a company
      const ref = FirestoreServices.ideas.where('owner', '==', owner).orderBy('timestamp', 'desc');
      this.firePaginator(ref);
    }
  }

  listToArray() {
    // const products = this.state.products
    // const productIds = Object.keys(products);
    //
    // var arr = [];
    // productIds.reverse().map(id => {
    //   const product = products[id];
    //   console.log("copy product " + product.id)
    //   arr.push(product)
    // });
    // var list = [...this.state.extraProducts, ...arr.slice()]
    // //this.setState({extraProducts: arr.slice(), loading: false})
    // this.setState({extraProducts: list, loading: false})
  }

  productFirePaginator(ref) {
    paginator = new FirestorePaginator(ref, {})
    paginator.on()
      .then(docs => this.setState({
        products: docs,
        loading: false,
        firstTime: false,
      }),
      );
  }

  ideaFirePaginator(ref) {
    paginator = new FirestorePaginator(ref, {})
    paginator.on()
      .then(docs => this.setState({
        ideas: docs,
        loading: false,
        firstTime: false,
      }),
      );
  }

  forward() {
    console.log('calling next()');
    if (!paginator.hasMore) {
      hasMore = false;
      console.log('next() Has no more');
      return;
    }
    console.log('next() Has more');
    paginator.next()
      .then((docs) => {
        if (!paginator.hasMore) {
          hasMore = false;
          console.log('next() Has no more');
          return;
        }
        console.log(`hasMore = ${paginator.hasMore}`);
        const newProducts = this.state.products.concat(docs);
        this.setState({
          products: newProducts,
          loading: false,
          firstTime: false,
        });
      });
  }

  render() {
    let products = this.state.products;
    const { items } = this.state;
    const productIds = Object.keys(products);
    let ideas = this.state.ideas;
    // const ideasIds = Object.keys(ideas);

    products = products.length > 0 ? products.map(product => product.data()) : [];
    ideas = ideas.length > 0 ? ideas.map(idea => idea.data()) : [];
    const banners = [];
    const { deviceFlag, adminViewFlag } = this.props;

    let msg;
    let title;
    if (this.props.user) {
      msg = 'لا يوجد منتجات';
      title = 'المنتجات';
    } else {
      msg = 'لم تقم باضافة منتجات، إبدأ الان';
      title = 'منتجاتي';
    }

    if (this.state.loading) {
      return (
        <Loading />
      );
    } if (this.props.shortList) {
      return (
        <Grid style={{ backgroundColor: 'white' }}>
          {this.props.group === 'prof'
            ? (
              <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Col xs={12} lg={12}>
                  <Col xs={5} md={3} lg={2} style={{ padding: '0 15px 0 0' }}>
                    <Link to="/newproduct">
                      <Button>
                        إضافة منتج
                        <IconImg src={Product} />
                      </Button>
                    </Link>
                  </Col>
                  <Col xs={7} md={9} lg={10}>
                    <Link to="/myproducts">
                      <h3 style={{ color: 'rgb(26,156,142)', fontFamily: 'dinarm' }}>{title}</h3>
                    </Link>
                  </Col>
                </Col>
              </Row>
            )
            : (
              <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Col xs={9} md={9} lg={10}>
                  <Link to={`/${this.state.owner}/products`}>
                    <h3 style={{ color: 'rgb(26,156,142)', padding: '0 10px 0 0', fontFamily: 'dinarm' }}> المنتجات</h3>
                  </Link >
                </Col>
                <Col xs={3} md={3} lg={2} style={{ padding: '20px 10px 0 0' }} >
                  <Link to={`/${this.state.owner}/products`}>
                    <MoreButton>المزيد</MoreButton>
                  </Link>
                </Col>
              </Row>
            )
          }
          <Row style={{ display: 'flex', flexWrap: 'wrap', borderBottom: 'dotted 1px lightgray ' }}>
            <Col xs={12} lg={12} style={{ padding: '0 5px 0 5px' }}>
              {productIds.length < 1
                ? <h4 style={{ textAlign: 'center' }}>{msg}</h4>
                : null}
              {productIds.map((id) => {
                const product = products[id];
                return <ProductBrief key={id} product={product} />;
              })}
            </Col>
          </Row>
        </Grid>
      );
    }
    return (
      <div style={{ paddingTop: '0px', marginTop: '20px' }}>
        <Grid>
          <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Col xs={12} md={12} style={{ padding: '0 5px 0 5px' }}>
              <InfiniteScroll
                style={{ overflow: 'none' }}
                hasMore={hasMore}
                next={this.forward}
              >
                {
                  products.length < 1
                    ? this.props.thisUserOnly
                      ? <h4 style={{ textAlign: 'center' }}>لم تقم باضافة منتجات، إبدأ الان</h4>
                      : <h4 style={{ textAlign: 'center' }}>لا يوجد نتائج مطابقة</h4>
                    : <IteamArrange {...{ items, deviceFlag, adminViewFlag }} />
                }
              </InfiniteScroll>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ItemList;
