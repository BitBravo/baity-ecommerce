import React from "react";
import ProductList from "views/ProductList";
import { MdWeekend } from 'react-icons/lib/md';
import { Grid, Row, Col } from "react-bootstrap";

function BusinessProducts(props) {
  return (
    <Grid Grid style={{ backgroundColor: "white" }}>
      <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Col sm={12} lg={12}>
          <div style={{ height: '100px' }}>
            <h1 style={{ color: 'rgb(26,156,142)' }}> <MdWeekend className="icons" style={{ color: 'rgb(26,156,142)' }} /> المنتجات</h1>
          </div>
          <hr style={{ marginBottom: '30px' }} />
          <ProductList thisUserOnly={true} user={true} currentUser={props.match.params.id} />
        </Col>
      </Row>
    </Grid>);
}
export default BusinessProducts;
