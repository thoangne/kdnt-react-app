import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SlideAuto.scss';
import kh1 from './../../assets/kh1.png'
import kh2 from './../../assets/kh2.png'
import kh3 from './../../assets/kh3.png'
import kh4 from './../../assets/kh4.png'
import kh5 from './../../assets/kh5.png'
import kh6 from './../../assets/kh6.png'

function ReviewCarousel() {
  const settings = {
    dots: false,         // No navigation dots
    infinite: true,      // Infinite scrolling
    speed: 2000,          // Transition speed (0.5 seconds)
    slidesToShow: 5,     // Show 5 cards per slide
    slidesToScroll: 1,   // Scroll 1 card at a time
    autoplay: true,      // Auto-slide
    autoplaySpeed: 500,  // Slide every 0.5 seconds
    pauseOnHover: true   // Pause on hover
  };

  return (
<Slider {...settings}>
      <div >
        <Card className="custom-card">
          <Card.Img variant="top" src={kh1} />
        </Card>
      </div>

      <div >
        <Card className="custom-card">
          <Card.Img variant="top" src={kh2} />
        </Card>
      </div>

      <div >
        <Card className="custom-card">
          <Card.Img variant="top" src={kh3} />
        </Card>
      </div>

      <div >
        <Card className="custom-card">
          <Card.Img variant="top" src={kh4} />
        </Card>
      </div>

      <div >
        <Card className="custom-card">
          <Card.Img variant="top" src={kh5} />
        </Card>
      </div>

      <div >
        <Card className="custom-card">
          <Card.Img variant="top" src={kh6} />
        </Card>
      </div>
    </Slider>  );
}

export default ReviewCarousel;
