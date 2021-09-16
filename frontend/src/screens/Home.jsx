import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
const Home = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const allCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  let filteredProducts = [];

  const handleFilter = (filterName) => {
    filteredProducts = products.filter(
      (product) => product.category === filterName
    );
    console.log(filteredProducts);
  };

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col className="d-flex justify-content-around" md={12}>
              {allCategories.map((cat, index) => (
                <Button
                  key={index}
                  variant="primary"
                  onClick={() => handleFilter("Cloth")}
                >
                  {cat}
                </Button>
              ))}
            </Col>
          </Row>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Home;
