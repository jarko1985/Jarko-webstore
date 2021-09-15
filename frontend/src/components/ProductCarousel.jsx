import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const topProductsList = useSelector((state) => state.ProductTopRated);
  const { loading, products, error } = topProductsList;
  useEffect(() => {
    dispatch(topProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel fade interval={2000} pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} {product.price}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
