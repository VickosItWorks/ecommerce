import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from './images/image1.jpeg';
import banner2 from './images/image2.jpeg';
import banner3 from './images/image3.jpeg';
import { styled } from "styled-components";

const BannerCarousel = () => {

  const BannerContainer = styled.div`
    width: 100%;
    max-width: 800px;
    maxHeight: '400px';
    margin: 0 auto;
  `
  const CarouselImg = styled.img`
    width: 100%;
    height: 400px;
  `
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the speed as needed
  };

  return (
    <BannerContainer className="carousel-container">
      <Slider {...settings}>
        <div>
          <CarouselImg src={banner1} alt="Banner 1" />
        </div>
        <div>
          <CarouselImg src={banner2} alt="Banner 2" />
        </div>
        <div>
          <CarouselImg src={banner3} alt="Banner 3" />
        </div>
      </Slider>
    </BannerContainer>
  );
};

export default BannerCarousel;
