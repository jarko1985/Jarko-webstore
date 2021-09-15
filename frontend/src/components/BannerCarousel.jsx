import React from "react";
import { Carousel, Image } from "react-bootstrap";

const bannerImages = [
  "https://images.pexels.com/photos/2292953/pexels-photo-2292953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2519790/pexels-photo-2519790.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/5926239/pexels-photo-5926239.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

const BannerCarousel = () => {
  return (
    <Carousel interval={2000} pause="hover" className="bg-dark">
      {bannerImages.map((el) => (
        <Carousel.Item>
          <Image src={el} alt="custom" fluid />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default BannerCarousel;
