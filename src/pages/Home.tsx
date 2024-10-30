import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../layout/Header';
import BodyMenu from '../components/BodyMenu';
import ListItem from '../components/ListItem';
import Footer from '../layout/Footer';
import { Banner } from '../initialize/type';
import { SupportCard } from '../components/Card/SupportCard';
import CarouselForm from '../layout/CarouselForm';

function Home() {
  const bannerData: Banner = {
    name: "Menu chính",
 };
  return (
    <>
      <Header />
      <CarouselForm></CarouselForm>
      <BodyMenu bannerName={bannerData} />
      <ListItem />
      <SupportCard></SupportCard>
      <Footer />
    </>
  );
}

export default Home;
