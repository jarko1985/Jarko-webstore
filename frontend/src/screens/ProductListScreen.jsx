import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productContants";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const userLogin = useSelector((state) => state.userLogin);
  const productDelete = useSelector((state) => state.productDelete);
  const productCreate = useSelector((state) => state.productCreate);

  const { loading, products, error } = productList;
  const { userInfo } = userLogin;
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const {
    product: createdProduct,
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const handleAddProduct = () => {
    dispatch(createProduct());
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      dispatch(deleteProduct(id));
    }
  };
  return (
    <>
      <Row className="d-flex align-items-center">
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-end">
          <Button onClick={handleAddProduct} className="my-3">
            <i className="fas fa-plus"></i> Add new Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>

                <td>AED {product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td style={{ display: "flex", justifyContent: "space-around" }}>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-small">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    onClick={() => handleDelete(product._id)}
                    style={{ color: "white" }}
                    className="btn-small"
                  >
                    <i className="fas fa-trash" style={{ color: "white" }}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
