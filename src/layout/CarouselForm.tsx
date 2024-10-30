import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.webp';
import slide3 from '../assets/slide3.webp';
import "./CarouselForm.scss"

function CarouselForm() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={slide1} />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
      <img src={slide2} />
      </Carousel.Item>
      <Carousel.Item>
      <img src={slide3} />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselForm;